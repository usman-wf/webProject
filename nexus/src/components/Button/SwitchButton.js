const SwitchButton = (props) => {
  return (
    <span
      className={` hover:cursor-pointer text-3xl p-4 rounded-lg font-thin ${
        props.isActive
          ? "bg-gray-600 transition-all duration-300"
          : "underline-expand"
      }`}
      onClick={() => {
        props.onClick(props.text);
      }}
    >
      {props.text.toUpperCase()}
    </span>
  );
};

export default SwitchButton;
