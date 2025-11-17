import { toast } from "react-toastify";
import Cookies from "universal-cookie";
import { useRouter } from "next/navigation";

import { AuthAdapter } from "../../../adapters/auth.adapter";

const useLogout = () => {
  const cookie = new Cookies();
  const router = useRouter();
  const token = cookie.get("refresh_token");

  const logoutHandler = async () => {
    const authAdapter = new AuthAdapter(process.env.NEXT_PUBLIC_URL, token);
    const response = await authAdapter.logout();
    console.log("RES", response);
    if (response.error) {
      if (response.data) {
        toast.error(response.data.message);
      } else {
        toast.error(response.error.message);
      }
      return;
    }

    cookie.remove("token");
    cookie.remove("refresh_token");
    cookie.remove("username");
    cookie.remove("profile_picture");
    router.push("/login");

    toast("User logged out");
  };

  return {
    logoutHandler,
  };
};

export default useLogout;
