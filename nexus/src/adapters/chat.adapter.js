import axios from "axios";

export class ChatAdapter {
  instance;
  constructor(baseURL, token) {
    this.instance = axios.create({
      baseURL: baseURL,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      timeout: 30000,
      timeoutErrorMessage: "Request timed out",
    });
  }

  chatPreviews = async () => {
    try {
      const response = await this.instance.get(
        `${process.env.NEXT_PUBLIC_URL}/chat/chats-preview`
      );
      return response;
    } catch (error) {
      console.log(error);
      return { ...error.response, error };
    }
  };

  chatMessages = async (convo_id) => {
    try {
      const response = await this.instance.post(
        `${process.env.NEXT_PUBLIC_URL}/chat/chat-messages`,
        { convo_id }
      );
      return response;
    } catch (error) {
      console.log(error);
      return { ...error.response, error };
    }
  };

  addMessages = async (convo_id, content, receiver_username) => {
    try {
      const response = await this.instance.post(
        `${process.env.NEXT_PUBLIC_URL}/chat/add-message`,
        { convo_id, content, receiver_username }
      );
      return response;
    } catch (error) {
      console.log(error);
      return { ...error.response, error };
    }
  };
}
