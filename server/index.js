const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  socket.emit("msg", "Hello From Server");

  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);
  });
});

server.listen(3000, () => {
  console.log("Server Is Running");
});
