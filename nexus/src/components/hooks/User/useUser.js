import { useState, useRef } from "react";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";
import { useRouter } from "next/navigation";

import { HomeAdapter } from "../../../adapters/home.adapter";
import { EditAdapter } from "../../../adapters/edit.adapter";

const useUser = () => {
  const [currentUser, setCurrentuser] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [allSearchedUsers, setAllSearchedUsers] = useState([]);
  const [allNotifications, setAllNotifications] = useState([]);

  const router = useRouter();

  const debounceTimer = useRef(null);

  const cookie = new Cookies();
  const token = cookie.get("token");
  const getUserProfile = async (username) => {
    setIsLoading(true);
    const homeAdapter = new HomeAdapter(process.env.NEXT_PUBLIC_URL, token);
    const response = await homeAdapter.getUserProfile(username);
    console.log("RES", response);
    if (response.error) {
      // console.log("IN", response);
      if (response.data) {
        toast.error(response.data.message);
      } else {
        toast.error(response.error.message);
      }
      setIsLoading(false);
      return;
    }
    setCurrentuser(response.data.user_profile);
    setIsLoading(false);
  };

  const saveChangesHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formValues = Object.fromEntries(formData.entries());
    console.log("VALS", formValues);
    // const { username, firstName, lastName, bio, oldPassword, newPassword } =
    //   formValues;

    const editAdapter = new EditAdapter(process.env.NEXT_PUBLIC_URL, token);
    const response = await editAdapter.edit(formValues);
    console.log("RES", response);
    if (response.data.error === "Username is already taken") {
      // console.log("IN", response);
      toast.error(response.data.error);
      setIsLoading(false);
      return;
    }

    if (formValues.username && formValues.username !== "") {
      cookie.remove("username");
      cookie.set("username", formValues.username);
      router.push(`/profile/${cookie.get("username")}`);
    }
    await getUserProfile(cookie.get("username"));
  };

  const searchUsers = async (username) => {
    setIsLoading(true);
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    debounceTimer.current = setTimeout(async () => {
      console.log("RUNN", username);
      const homeAdapter = new HomeAdapter(process.env.NEXT_PUBLIC_URL, token);
      const response = await homeAdapter.getSearchedUser(username);
      // console.log("RES", response);
      if (response.error) {
        // console.log("IN", response);
        if (response.data) {
          toast.error(response.data.message);
        } else {
          toast.error(response.error.message);
        }
        setIsLoading(false);
        return;
      }
      setAllSearchedUsers(response.data.users);
      setIsLoading(false);
    }, 2000);
  };

  const searchFollowedUsers = async (username, stringToSearch) => {
    setIsLoading(true);
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    debounceTimer.current = setTimeout(async () => {
      console.log("RUNN", username);
      const homeAdapter = new HomeAdapter(process.env.NEXT_PUBLIC_URL, token);
      const response = await homeAdapter.getFollowingSearchedUsers(
        username,
        stringToSearch
      );
      // console.log("RES", response);
      if (response.error) {
        // console.log("IN", response);
        if (response.data) {
          toast.error(response.data.message);
        } else {
          toast.error(response.error.message);
        }
        setIsLoading(false);
        return;
      }
      setAllSearchedUsers(response.data.following);
      setIsLoading(false);
    }, 2000);
  };

  const searchFollowers = async (username, stringToSearch) => {
    setIsLoading(true);
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    debounceTimer.current = setTimeout(async () => {
      console.log("RUNN", username);
      const homeAdapter = new HomeAdapter(process.env.NEXT_PUBLIC_URL, token);
      const response = await homeAdapter.getSearchedFollowers(
        username,
        stringToSearch
      );
      // console.log("RES", response);
      if (response.error) {
        // console.log("IN", response);
        if (response.data) {
          toast.error(response.data.message);
        } else {
          toast.error(response.error.message);
        }
        setIsLoading(false);
        return;
      }
      setAllSearchedUsers(response.data.followers);
      setIsLoading(false);
    }, 2000);
  };

  const followStatusHandler = async (username) => {
    setIsLoading(true);
    const homeAdapter = new HomeAdapter(process.env.NEXT_PUBLIC_URL, token);
    const response = await homeAdapter.followStatus(username);
    console.log("RES", response);
    if (response.error) {
      // console.log("IN", response);
      if (response.data) {
        toast.error(response.data.message);
      } else {
        toast.error(response.error.message);
      }
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
    await getUserProfile(username);
  };

  const unfollowUserHandler = async (username) => {
    setIsLoading(true);
    const homeAdapter = new HomeAdapter(process.env.NEXT_PUBLIC_URL, token);
    const response = await homeAdapter.unfollowUser(username);
    console.log("RES", response);
    if (response.error) {
      // console.log("IN", response);
      if (response.data) {
        toast.error(response.data.message);
      } else {
        toast.error(response.error.message);
      }
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
    await getUserProfile(username);
  };

  const removeFollowerHandler = async (username) => {
    setIsLoading(true);
    const homeAdapter = new HomeAdapter(process.env.NEXT_PUBLIC_URL, token);
    const response = await homeAdapter.removeFollower(username);
    console.log("RES", response);
    if (response.error) {
      // console.log("IN", response);
      if (response.data) {
        toast.error(response.data.message);
      } else {
        toast.error(response.error.message);
      }
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
    await getUserProfile(username);
  };

  const getAllNotifications = async () => {
    setIsLoading(true);
    const homeAdapter = new HomeAdapter(process.env.NEXT_PUBLIC_URL, token);
    const response = await homeAdapter.allNotifications();
    console.log("RES", response);
    if (response.error) {
      // console.log("IN", response);
      if (response.data) {
        toast.error(response.data.message);
      } else {
        toast.error(response.error.message);
      }
      setIsLoading(false);
      return;
    }

    setAllNotifications(response.data);
    setIsLoading(false);
  };

  const acceptRequestHandler = async (username) => {
    setIsLoading(true);
    const homeAdapter = new HomeAdapter(process.env.NEXT_PUBLIC_URL, token);
    const response = await homeAdapter.acceptRequest(username);
    console.log("RES", response);
    if (response.error) {
      // console.log("IN", response);
      if (response.data) {
        toast.error(response.data.message);
      } else {
        toast.error(response.error.message);
      }
      setIsLoading(false);
      return;
    }
    await getAllNotifications();
    setIsLoading(false);
  };

  const cancelRequestHandler = async (username) => {
    setIsLoading(true);
    const homeAdapter = new HomeAdapter(process.env.NEXT_PUBLIC_URL, token);
    const response = await homeAdapter.cancelRequest(username);
    console.log("RES", response);
    if (response.error) {
      // console.log("IN", response);
      if (response.data) {
        toast.error(response.data.message);
      } else {
        toast.error(response.error.message);
      }
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
    await getAllNotifications();
  };

  const viewFollowingOfUser = async (username) => {
    setIsLoading(true);
    const homeAdapter = new HomeAdapter(process.env.NEXT_PUBLIC_URL, token);
    const response = await homeAdapter.cancelRequest(username);
    console.log("RES", response);
    if (response.error) {
      // console.log("IN", response);
      if (response.data) {
        toast.error(response.data.message);
      } else {
        toast.error(response.error.message);
      }
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
    setAllSearchedUsers(response.data);
  };

  return {
    currentUser,
    isLoading,
    allSearchedUsers,
    allNotifications,
    getUserProfile,
    saveChangesHandler,
    searchUsers,
    followStatusHandler,
    getAllNotifications,
    acceptRequestHandler,
    unfollowUserHandler,
    cancelRequestHandler,
    searchFollowedUsers,
    removeFollowerHandler,
    searchFollowers,
  };
};

export default useUser;
