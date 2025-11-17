import Sidebar from "../Layout/Sidebar";

const TextInput = (props) => {
  const classes = `py-3 px-4 block w-full rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none bg-slate-900 dark:text-gray-400 ${
    props.errorText !== "" ? "border border-red-500" : ""
  } focus:outline-none ${
    props.classes
  } border border-[#2e2f45] focus:border-[#333] transition-all duration-300`;
  return (
    <div className="w-full">
      {props.label !== "" && (
        <label
          htmlFor={props.label}
          className="block text-sm mb-2 dark:text-white"
        >
          {props.label}
        </label>
      )}

      <div className="relative">
        {props.isTextArea ? (
          <textarea
            defaultValue={props.value}
            placeholder={props.placeholder}
            className={classes}
            name={props.name}
          ></textarea>
        ) : (
          <input
            defaultValue={props.value || ""}
            placeholder={props.placeholder}
            type={props.type}
            name={props.name}
            className={classes}
            required={props.isRequired}
          />
        )}
        {props.errorText !== "" && (
          <span className="text-xs text-red-500 ml-1">{props.errorText}</span>
        )}{" "}
      </div>
    </div>
  );
};

export default TextInput;
