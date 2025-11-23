import axios from "axios";

export class AuthAdapter {
  instance;
  constructor(baseURL, token) {
    this.instance = axios.create({
      baseURL: baseURL,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      timeout: 15000,
      timeoutErrorMessage: "Request timed out",
    });
  }

  login = async (formData) => {
    try {
      const response = await this.instance.post(
        `${process.env.NEXT_PUBLIC_URL}/auth/login`,

        formData
      );
      return response;
    } catch (error) {
      console.log(error);
      return { ...error.response, error };
    }
  };

  signup = async (formData) => {
    try {
      const response = await this.instance.post(
        `${process.env.NEXT_PUBLIC_URL}/auth/signup`,

        formData
      );
      return response;
    } catch (error) {
      console.log(error);
      return { ...error.response, error };
    }
  };

  logout = async () => {
    try {
      const response = await this.instance.post(
        `${process.env.NEXT_PUBLIC_URL}/auth/logout`
      );
      return response;
    } catch (error) {
      console.log(error);
      return { ...error.response, error };
    }
  };
}
