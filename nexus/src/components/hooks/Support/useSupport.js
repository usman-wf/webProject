import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";

import { SupportAdapter } from "../../../adapters/support.adapter";

const useSupport = () => {
  const [supportInfo, setSupportInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const cookie = new Cookies();
  const token = cookie.get("token");

  const getSupportInfo = async () => {
    setIsLoading(true);
    setError(null);
    
    const supportAdapter = new SupportAdapter(process.env.NEXT_PUBLIC_URL, token);
    const response = await supportAdapter.getSupportInfo();
    
    if (response.error) {
      const errorMessage = response.data?.message || response.error?.message || "Failed to load support information";
      setError(errorMessage);
      toast.error(errorMessage);
      setIsLoading(false);
      return;
    }

    if (response.data) {
      setSupportInfo(response.data);
    } else {
      setError("Failed to load support information");
      setIsLoading(false);
      return;
    }
    
    setIsLoading(false);
  };

  // Automatically fetch support info on mount
  useEffect(() => {
    getSupportInfo();
  }, []);

  return {
    supportInfo,
    isLoading,
    error,
  };
};

export default useSupport;

