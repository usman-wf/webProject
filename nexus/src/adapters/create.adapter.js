import axios from "axios";

export class CreateAdapter {
  instance;
  constructor(baseURL, token) {
    this.instance = axios.create({
      baseURL: baseURL,
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      timeout: 15000,
      timeoutErrorMessage: "Request timed out",
    });
  }

  create = async (formData, mode) => {
    try {
      let path = `${process.env.NEXT_PUBLIC_URL}/posts/create-post`;
      if (mode === "story")
        path = `${process.env.NEXT_PUBLIC_URL}/story/create-story`;
      const response = await this.instance.post(path, formData);
      return response;
    } catch (error) {
      console.log(error);
      return { ...error.response, error };
    }
  };
}
