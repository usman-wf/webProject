import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;

const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  console.log("HTTP", httpServer);

  // Initialize Socket.IO without a custom path
  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    console.log("Client connected");

    socket.on("join", (data) => {
      console.log("JOIN CALLED");
      const { chatId, username } = data;
      socket.join(chatId);
      console.log("User joined chat:", chatId);
    });

    socket.on("sendMessage", (data) => {
      console.log("SNED", data);
      const { chatId, message, username, sender } = data;
      io.to(chatId).emit("receiveMessage", {
        chatId,
        username,
        message,
        sender,
      });
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });

  // Start the server and handle requests
  httpServer.listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});
