import axios from "axios";

export class SupportAdapter {
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

  getSupportInfo = async () => {
    try {
      const response = await this.instance.get(
        `${process.env.NEXT_PUBLIC_URL}/support/support-info`
      );
      return response;
    } catch (error) {
      console.log(error);
      return { ...error.response, error };
    }
  };
}

