import Image from "next/image";
import { useState } from "react";

import TextInput from "../Input/TextInput";
import SearchLogo from "../../assets/search.svg";

const SearchUser = (props) => {
  const [inputIsFocused, setInputIsFocused] = useState(false);

  const inputFocusHandler = (isFocus) => {
    setIsFocused(isFocus);
  };
  return (
    <div
      className={`flex ${
        inputIsFocused ? "w-full" : "w-[50%]"
      } items-center mb-10 transition-all duration-100 ease-in-out`}
    >
      <div
        className={`flex border text-[#bdbfd4] transition-all duration-100 ease-in-out items-center ${
          inputIsFocused ? "border-[#e6f85e]" : "border-[#2e2f45]"
        }  bg-transparent rounded-lg w-full px-2`}
      >
        <Image src={SearchLogo} className="w-6 h-6" alt="search" />
        <input
          className={`appearance-none bg-transparent border-none focus:outline-none text-md w-full py-4 px-2`}
          placeholder={`Search users`}
          onFocus={() => {
            setInputIsFocused(true);
          }}
          onBlur={() => {
            setInputIsFocused(false);
          }}
          onChange={(event) => {
            props.onChange(event.target.value);
          }}
          type="text"
          name="search"
        />
      </div>
    </div>
  );
};

export default SearchUser;
