import { useState } from "react";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";
import { useRouter } from "next/navigation";

import { AuthAdapter } from "../../../adapters/auth.adapter";

const useLogin = () => {
  const [usernameError, setUsernameError] = useState("");

  const [passwordError, setPasswordError] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const cookie = new Cookies();
  const router = useRouter();

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.target);
    const formValues = Object.fromEntries(formData.entries());
    const { username, password } = formValues;

    setUsernameError("");
    setPasswordError("");

    let hasError = false;

    if (username.trim() === "") {
      setUsernameError("Invalid username");
      hasError = true;
    }
    if (password.trim().length < 8) {
      setPasswordError("Invalid password");
      hasError = true;
    }

    if (hasError) {
      toast.error("Invalid username or password");
      setIsLoading(false);
      return;
    }

    const dataToSend = { username_or_email: username, password };

    console.log("SEND", dataToSend);

    const authAdapter = new AuthAdapter(process.env.NEXT_PUBLIC_URL);
    const response = await authAdapter.login(dataToSend);
    console.log("RES", response);
    if (response.error) {
      if (response.data) {
        toast.error(response.data.message);
      } else {
        toast.error(response.error.message);
      }
      setIsLoading(false);
      return;
    }

    if (response.data) {
      cookie.set("token", response.data.access);
      cookie.set("refresh_token", response.data.refresh);
      cookie.set("username", response.data.username);
      // cookie.set("profile_picture", response.data.profile_picture);
    }
    toast("Login successful");
    setIsLoading(false);
    router.push("/");
  };

  return {
    usernameError,
    passwordError,
    isLoading,
    formSubmitHandler,
  };
};

export default useLogin;
