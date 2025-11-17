import { useState, useEffect } from "react";
import { SupportAdapter } from "../../../adapters/support.adapter";
import Cookies from "universal-cookie";

const useSupport = () => {
  const [supportInfo, setSupportInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const cookie = new Cookies();

  const getSupportInfo = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const token = cookie.get("token");
      const adapter = new SupportAdapter(
        process.env.NEXT_PUBLIC_URL,
        token || ""
      );
      const response = await adapter.getSupportInfo();
      if (response.status === 200) {
        setSupportInfo(response.data);
      } else {
        setError(response.data?.error || "Failed to load support information");
      }
    } catch (err) {
      setError("Failed to load support information");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getSupportInfo();
  }, []);

  return {
    supportInfo,
    isLoading,
    error,
    refetch: getSupportInfo,
  };
};

export default useSupport;

