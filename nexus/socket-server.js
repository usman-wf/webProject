import { createServer } from "node:http";
import { Server } from "socket.io";

const hostname = process.env.HOSTNAME || process.env.HOST || "0.0.0.0";
const port = parseInt(process.env.PORT || "3001", 10);

const httpServer = createServer();

// Initialize Socket.IO with CORS configuration
const io = new Server(httpServer, {
  cors: {
    origin: process.env.ALLOWED_ORIGINS
      ? process.env.ALLOWED_ORIGINS.split(",").map((origin) => origin.trim())
      : [
          "https://www.nexuswebsite.me",
          "https://nexuswebsite.me",
          "http://www.nexuswebsite.me",
          "http://nexuswebsite.me",
        ],
    methods: ["GET", "POST"],
    credentials: true,
  },
  transports: ["websocket", "polling"],
});

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("join", (data) => {
    console.log("JOIN CALLED", data);
    const { chatId, username } = data;
    socket.join(chatId);
    console.log(`User ${username} joined chat: ${chatId}`);
  });

  socket.on("sendMessage", (data) => {
    console.log("SEND", data);
    const { chatId, message, username, sender } = data;
    io.to(chatId).emit("receiveMessage", {
      chatId,
      username,
      message,
      sender,
    });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Start the server
httpServer.listen(port, hostname, () => {
  console.log(`Socket.IO server ready on http://${hostname}:${port}`);
  console.log(
    `Allowed origins: ${
      process.env.ALLOWED_ORIGINS || "default (nexuswebsite.me)"
    }`
  );
});
