from functools import lru_cache
from typing import Any

from backend.shared.config import get_settings
from backend.shared.logging import get_logger

logger = get_logger(__name__)


class YOLOModelLoader:
    def __init__(self) -> None:
        self.settings = get_settings()
        self.model: Any | None = None

    def load(self) -> Any | None:
        if not self.settings.enable_real_model:
            logger.info("vehicle_detection.mock_model_enabled")
            return None
        if self.model is None:
            from ultralytics import YOLO

            logger.info("vehicle_detection.loading_yolo", model=self.settings.yolo_model)
            self.model = YOLO(self.settings.yolo_model)
        return self.model


@lru_cache
def get_model_loader() -> YOLOModelLoader:
    return YOLOModelLoader()
