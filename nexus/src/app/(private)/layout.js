"use client";

import { useEffect } from "react";
import Cookies from "universal-cookie";
import { useRouter } from "next/navigation";

import Sidebar from "../../components/Layout/Sidebar";

const HomeLayout = (props) => {
  const cookie = new Cookies();
  const router = useRouter();

  useEffect(() => {
    const token = cookie.get("token");
    if (!token || token === "") {
      router.push("/login");
    }
  }, [cookie, router]);

  return (
    <div className="w-full flex text-gray-200">
      <Sidebar />

      <div className="ml-auto w-full lg:w-[80%] min-h-screen">
        {props.children}
      </div>
    </div>
  );
};

export default HomeLayout;
