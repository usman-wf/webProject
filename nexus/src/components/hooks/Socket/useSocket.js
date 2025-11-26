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
    let newSocket = io();
    console.log("NEW SOCK", newSocket);
    setSocket(newSocket);

    newSocket.on("connect_error", (err) => {
      console.log(`connect_error due to ${err.message}`);
      newSocket.disconnect();
      newSocket = null;
      setSocket(null);
      toast.error(
        "Error connecting to server. Real time chat is disabled. Please refresh the page."
      );
      return;
    });

    newSocket.emit("join", { chatId, username: cookie.get("username") });

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

      console.log("J#NDHUO");
      socket.emit("sendMessage", {
        chatId,
        message,
        username,
        sender: cookie.get("username"),
      });
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
