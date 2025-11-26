"use client";

import { useState } from "react";

import PrimaryButton from "../../../components/Button/PrimaryButton";
import TextInput from "../../../components/Input/TextInput";
import SwitchButton from "../../../components/Button/SwitchButton";
import usePost from "../../../components/hooks/Post/usePost";
import useUpload from "../../../components/hooks/Upload/useUpload";

const SwitchButtons = [
  { text: "post", isActive: false },
  { text: "story", isActive: false },
];

const Page = () => {
  const { selectedModeHandler, handleSubmit, isLoading, selectedMode } =
    useUpload();

  SwitchButtons.map((item) => {
    if (item.text === selectedMode) {
      item.isActive = true;
    } else {
      item.isActive = false;
    }
  });

  return (
    <div className="w-full flex flex-col items-center justify-center h-full py-10">
      <div className="flex gap-x-5 mb-20">
        {SwitchButtons.map((item) => {
          return (
            <SwitchButton
              key={item.text}
              onClick={selectedModeHandler}
              text={item.text}
              isActive={item.isActive}
            />
          );
        })}
      </div>
      <form
        onSubmit={handleSubmit}
        className="p-8 rounded-lg w-fit mx-auto flex flex-col gap-y-5"
      >
        <div>
          <label htmlFor="file" className="block text-sm mb-2">
            Upload Picture:
          </label>
          <input
            name="image"
            type="file"
            id="file"
            accept="image/*"
            className="mt-2 block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:text-indigo-700 hover:file:bg-indigo-100 hover:file:cursor-pointer"
            required
          />
        </div>

        <div className="my-6">
          <TextInput
            label="Caption"
            placeholder="Enter Caption"
            type="text"
            name="caption"
            isTextArea={true}
            errorText=""
          />
        </div>

        <PrimaryButton isLoading={isLoading} type="submit" isGray={true}>
          Create
        </PrimaryButton>
      </form>
    </div>
  );
};

export default Page;
