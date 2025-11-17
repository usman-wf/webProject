import ButtonLoader from "./ButtonLoader";

const PrimaryButton = ({
  isLoading,
  type,
  classes,
  isGray,
  children,
  ...rest
}) => {
  return (
    <button
      disabled={isLoading}
      type={type}
      className={
        "w-full cursor-pointer py-3 px-2 lg:px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold bg-slate-900 rounded-lg text-white disabled:opacity-70 disabled:pointer-events-none dark:focus:outline-none hover:shadow-primary hover:shadow-md ripple-button " +
        classes +
        `${isGray ? " bg-gray-700" : ""}`
      }
      {...rest} // spreading the rest of the props
    >
      {isLoading ? <ButtonLoader /> : children}
    </button>
  );
};

export default PrimaryButton;
