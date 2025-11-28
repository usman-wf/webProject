import Image from "next/image";
import { toImageSrc } from "../../utils/image";
import { Fragment, useEffect, useState } from "react";

import ChevronRight from "../../assets/chevronRight.png";
import ChevronLeft from "../../assets/chevronLeft.png";
import Loader from "../Loader/Loader";
import Slideup from "../Layout/Slideup";

const StoryDetail = (props) => {
  const [isSlideupOpen, setIsSlideupOpen] = useState(false);
  const [heading, setHeading] = useState("");
  const [mode, setMode] = useState();

  useEffect(() => {
    // const timer = setTimeout(() => {
    //   props.storyHandler(props.currentIndex + 1);
    // }, 5000);
    props.updateViewersList(props.id);
    // return () => clearTimeout(timer);
  }, [props.image]);

  const slideupHandler = (value) => {
    setIsSlideupOpen(value);
  };

  return (
    <Fragment>
      <span
        className="absolute top-[10%] right-[10%] inline-flex items-center justify-center w-6 h-6 bg-gray-500 text-white rounded-full cursor-pointer"
        onClick={() => {
          const newUrl = ``;
          window.history.pushState(null, "", newUrl);
          props.viewHandler(false);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </span>
      {props.isOwner && (
        <button
          className="absolute top-[30%] left-[1%] bg-[#333333] hover:bg-[#333444] p-2 rounded-md"
          onClick={() => {
            setHeading("Story viewers");
            setMode("story-viewers");
            slideupHandler(true);
          }}
        >
          Viewed By: {props.viewedBy}
        </button>
      )}
      {props.isOwner && (
        <div className="flex flex-col absolute top-[10%] left-[1%] gap-y-3 ">
          <button
            className="bg-[#333333] p-2 rounded-md hover:opacity-[0.5]"
            onClick={() => {
              setHeading("Story settings");
              setMode("story-edit");
              slideupHandler(true);
            }}
          >
            Options
          </button>
          <button
            className="bg-red-400 hover:opacity[0.5] p-2 rounded-md"
            onClick={props.onDeleteClick}
          >
            {" "}
            Delete
          </button>
        </div>
      )}
      <div
        className="w-full h-full flex items-center justify-between px-4"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <Image
          src={ChevronLeft}
          className="w-7 md:w-16 h-7 md:h-16 bg-black rounded-full p-1 md:p-3 cursor-pointer hover:bg-gray-800 transition-all duration-300"
          onClick={() => {
            if (!props.isLoading) props.storyHandler(props.currentIndex - 1);
          }}
          alt="chev-left"
        />
        {props.isLoading ? (
          <Loader />
        ) : (
          <Image
            src={toImageSrc(props.image)}
            alt="mountain"
            width={500}
            height={500}
            className="w-[80%] md:max-w-[500px] rounded-lg max-h-[60%] aspect-square md:object-contain"
          />
        )}

        <Image
          src={ChevronRight}
          className="w-7 md:w-16 h-7 md:h-16 bg-black rounded-full p-1 md:p-3 cursor-pointer hover:bg-gray-800 transition-all duration-300"
          onClick={() => {
            if (!props.isLoading) props.storyHandler(props.currentIndex + 1);
          }}
          alt="chev-right"
        />
      </div>
      <div className="absolute bottom-[10%] lg:bottom-[5%] py-5 w-full h-fit text-center ">
        <span className="w-full lg:max-w-[700px] border-b border-b-gray-500 p-4">
          {props.caption}
        </span>
      </div>
      {isSlideupOpen && (
        <Slideup
          id={props.id}
          slideupHandler={slideupHandler}
          mode={mode}
          heading={heading}
        />
      )}
    </Fragment>
  );
};

export default StoryDetail;
