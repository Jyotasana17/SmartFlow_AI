import asyncio
from dataclasses import dataclass, field
from datetime import datetime
from typing import Any

from tenacity import retry, stop_after_attempt, wait_exponential

from backend.shared.logging import get_logger

logger = get_logger(__name__)


@dataclass
class CameraStream:
    camera_id: str
    junction_id: str
    rtsp_url: str
    healthy: bool = False
    last_frame_at: datetime | None = None
    buffer: asyncio.Queue[Any] = field(default_factory=lambda: asyncio.Queue(maxsize=8))


class CameraManager:
    def __init__(self) -> None:
        self.cameras: dict[str, CameraStream] = {}
        self.tasks: dict[str, asyncio.Task] = {}

    def register_camera(self, camera_id: str, junction_id: str, rtsp_url: str) -> CameraStream:
        stream = CameraStream(camera_id=camera_id, junction_id=junction_id, rtsp_url=rtsp_url)
        self.cameras[camera_id] = stream
        return stream

    async def start_all(self) -> None:
        for camera_id in self.cameras:
            self.tasks[camera_id] = asyncio.create_task(self._capture_loop(self.cameras[camera_id]))

    async def stop_all(self) -> None:
        for task in self.tasks.values():
            task.cancel()
        await asyncio.gather(*self.tasks.values(), return_exceptions=True)

    @retry(stop=stop_after_attempt(5), wait=wait_exponential(multiplier=1, min=1, max=20))
    async def _capture_loop(self, stream: CameraStream) -> None:
        import cv2

        logger.info("camera.connecting", camera_id=stream.camera_id)
        cap = cv2.VideoCapture(stream.rtsp_url)
        if not cap.isOpened():
            stream.healthy = False
            raise ConnectionError(f"Camera {stream.camera_id} could not be opened")
        stream.healthy = True
        while True:
            ok, frame = await asyncio.to_thread(cap.read)
            if not ok:
                stream.healthy = False
                cap.release()
                raise ConnectionError(f"Camera {stream.camera_id} frame read failed")
            stream.last_frame_at = datetime.utcnow()
            if stream.buffer.full():
                _ = stream.buffer.get_nowait()
            await stream.buffer.put(frame)
            await asyncio.sleep(0)

    async def latest_frame(self, camera_id: str) -> Any | None:
        stream = self.cameras[camera_id]
        if stream.buffer.empty():
            return None
        return await stream.buffer.get()
