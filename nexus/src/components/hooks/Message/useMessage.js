import { useState } from "react";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";

import { ChatAdapter } from "../../../adapters/chat.adapter";

const useMessage = () => {
  const [chatPreviews, setChatPreviews] = useState([]);
  const [chatDetail, setChatDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const cookie = new Cookies();
  const token = cookie.get("token");

  const getChatPreviews = async () => {
    setIsLoading(true);
    const chatAdapter = new ChatAdapter(process.env.NEXT_PUBLIC_URL, token);
    const response = await chatAdapter.chatPreviews();
    console.log("RES", response);
    if (response.error) {
      // console.log("IN", response);
      if (response.data) {
        toast.error(response.data.message);
      } else {
        toast.error(response.error.message);
      }
      setIsLoading(false);
      return;
    }
    setChatPreviews(response.data);
    setIsLoading(false);
  };

  const getChatMessages = async (id) => {
    setIsLoading(true);
    const chatAdapter = new ChatAdapter(process.env.NEXT_PUBLIC_URL, token);
    const response = await chatAdapter.chatMessages(id);
    console.log("RES", response);
    if (response.error) {
      // console.log("IN", response);
      if (response.data) {
        toast.error(response.data.message);
      } else {
        toast.error(response.error.message);
      }
      setIsLoading(false);
      return;
    }
    setChatDetail(response.data);
    setIsLoading(false);
    // window.scrollTo({
    //   top: document.body.scrollHeight,
    //   behavior: "smooth",
    // });
  };

  const chatDetailHandler = (content) => {
    const previousDetail = { ...chatDetail };
    console.log("jn kh", chatDetail);
    previousDetail.messages.push({
      content,
      is_owner: false,
    });
    setChatDetail(previousDetail);
  };

  const addMessage = async (id, content, username) => {
    const previousDetail = { ...chatDetail };
    previousDetail.messages.push({
      content,
      is_owner: true,
    });
    setChatDetail(previousDetail);
    setIsLoading(true);
    const chatAdapter = new ChatAdapter(process.env.NEXT_PUBLIC_URL, token);
    const response = await chatAdapter.addMessages(id, content, username);
    console.log("RES", response);
    if (response.error) {
      // console.log("IN", response);
      if (response.data) {
        toast.error(response.data.message);
      } else {
        toast.error(response.error.message);
      }
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
  };

  return {
    chatPreviews,
    chatDetail,
    isLoading,
    getChatPreviews,
    getChatMessages,
    addMessage,
    chatDetailHandler,
  };
};

export default useMessage;
