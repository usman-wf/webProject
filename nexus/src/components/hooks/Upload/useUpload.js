import { useState } from "react";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";

import { CreateAdapter } from "../../../adapters/create.adapter";

const useUpload = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMode, setSelectedMode] = useState("post");

  const cookie = new Cookies();
  const token = cookie.get("token");

  const selectedModeHandler = (value) => {
    setSelectedMode(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.target);

    const formDataToSend = new FormData();
    formDataToSend.append("caption", formData.get("caption"));
    formDataToSend.append("post_image", formData.get("image"));
    for (let pair of formDataToSend.entries()) {
      console.log(pair[0], pair[1]);
    }

    const createAdapter = new CreateAdapter(process.env.NEXT_PUBLIC_URL, token);
    const response = await createAdapter.create(formDataToSend, selectedMode);
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
    toast("Created successfully");
    setIsLoading(false);
  };

  return { selectedModeHandler, handleSubmit, isLoading, selectedMode };
};
export default useUpload;
