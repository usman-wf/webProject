import { useParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";
import useMessage from "../Message/useMessage";
// import socket from "../../../socket";

const useSocket = () => {
  const cookie = new Cookies();
  const { id: chatId } = useParams();
  const [socket, setSocket] = useState(null);
  const {
    addMessage,
    getChatMessages,
    chatDetailHandler,
    chatDetail,
    isLoading,
  } = useMessage();

  const createSocketConnection = () => {
    // Determine the Socket.IO server URL based on environment
    const isDev = process.env.NODE_ENV === "development";
    const socketUrl = isDev
      ? "http://localhost:3001" // Local socket server in development
      : process.env.NEXT_PUBLIC_SOCKET_URL ||
        "https://webproject-production-01a0.up.railway.app"; // Railway URL in production

    let newSocket = io(socketUrl, {
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
    });
    console.log("NEW SOCK", newSocket, "Connecting to:", socketUrl);
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("✅ Socket connected successfully!", newSocket.id);
    });

    newSocket.on("connect_error", (err) => {
      console.error("❌ Socket connection error:", err.message);
      console.error("Error details:", err);
      newSocket.disconnect();
      newSocket = null;
      setSocket(null);
      toast.error(
        `Error connecting to server: ${err.message}. Real time chat is disabled. Please refresh the page.`
      );
      return;
    });

    newSocket.on("disconnect", (reason) => {
      console.log("Socket disconnected:", reason);
    });

    // Wait for connection before joining
    if (newSocket.connected) {
      newSocket.emit("join", { chatId, username: cookie.get("username") });
    } else {
      newSocket.once("connect", () => {
        newSocket.emit("join", { chatId, username: cookie.get("username") });
      });
    }

    newSocket.on("receiveMessage", async (data) => {
      console.log("MESSAGE RECEIVED", data);

      const { chatId, message, sender } = data;
      if (sender !== cookie.get("username")) {
        // console.log("CHAT", chatDetail);
        // chatDetailHandler(message);
        getChatMessages(chatId);
      }
      // sender !== cookie.get("username") &&
      //   toast(`You have a new message from ${sender}:${message}`);
    });

    return newSocket;
  };

  useEffect(() => {
    const newSocket = createSocketConnection();
    return () => {
      newSocket.disconnect();
    };
  }, []);

  const sendMessage = async (id, message, username) => {
    if (message.trim() !== "") {
      await addMessage(id, message, username);
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });

      if (socket && socket.connected) {
        socket.emit("sendMessage", {
          chatId,
          message,
          username,
          sender: cookie.get("username"),
        });
      } else {
        console.warn(
          "Socket not connected, message sent to DB but not broadcasted"
        );
      }
    }
  };

  return {
    chatDetail,
    isLoading,
    getChatMessages,
    addMessage,
    sendMessage,
    createSocketConnection,
  };
};
export default useSocket;
