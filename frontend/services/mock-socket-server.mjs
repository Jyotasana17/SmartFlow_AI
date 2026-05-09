import { createServer } from "node:http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

const alertTemplates = [
  ["Junction overload", "Market Road density crossed adaptive limit.", "warning"],
  ["Ambulance approaching", "Blue corridor pre-clear request received.", "info"],
  ["Accident detected", "Vision AI found a two-lane obstruction.", "critical"],
  ["Camera offline", "Radar fallback activated for Tech Park Loop.", "warning"],
];

io.on("connection", (socket) => {
  console.log(`SmartFlow mock client connected: ${socket.id}`);
});

setInterval(() => {
  io.emit("traffic:update", { timestamp: Date.now() });
}, 1000);

setInterval(() => {
  const [title, detail, severity] = alertTemplates[Math.floor(Math.random() * alertTemplates.length)];
  io.emit("alert:new", {
    id: `mock-${Date.now()}`,
    title,
    detail,
    severity,
    source: "Mock Realtime Mesh",
    timestamp: "Now",
  });
}, 9000);

httpServer.listen(4001, () => {
  console.log("SmartFlow mock Socket.IO server running on http://localhost:4001");
});
