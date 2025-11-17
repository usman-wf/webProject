import { useState } from "react";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";
import { useRouter } from "next/navigation";

import { AuthAdapter } from "../../../adapters/auth.adapter";

const useSignup = () => {
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const cookie = new Cookies();
  const router = useRouter();

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.target);
    const formValues = Object.fromEntries(formData.entries());
    const { username, email, password, confirmPassword } = formValues;

    setUsernameError("");
    setEmailError("");
    setPasswordError("");

    let hasError = false;

    if (username.trim() === "") {
      toast.error("Username is empty");
      setUsernameError("Username cannot be empty");
      hasError = true;
    }
    if (!email.trim().includes("@")) {
      toast.error("Invalid email");
      setEmailError("Invalid email");
      hasError = true;
    }
    if (password.trim().length < 8) {
      toast.error("Password should be at least 8 characters long");
      setPasswordError("Password should be at least 8 characters long");
      hasError = true;
    }
    if (password.trim() !== confirmPassword.trim()) {
      toast.error("Passwords do not match");
      setPasswordError("Passwords do not match");
      hasError = true;
    }
    if (hasError) {
      setIsLoading(false);
      return;
    }

    const dataToSend = {
      username,
      email,
      password,
      first_name: "some",
      last_name: "some",
    };

    const authAdapter = new AuthAdapter(process.env.NEXT_PUBLIC_URL);
    const response = await authAdapter.signup(dataToSend);
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
    }
    router.push("/");

    setIsLoading(false);
    toast("Signup successful");
  };

  return {
    usernameError,
    emailError,
    passwordError,
    isLoading,
    formSubmitHandler,
  };
};

export default useSignup;
