import axios from "axios";

export class EditAdapter {
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

  edit = async (formData) => {
    try {
      const response = await this.instance.post(
        `${process.env.NEXT_PUBLIC_URL}/user/edit-profile`,
        formData
      );
      return response;
    } catch (error) {
      console.log(error);
      return { ...error.response, error };
    }
  };
}
