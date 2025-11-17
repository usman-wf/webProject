const ButtonLoader = () => {
  return (
    <div className="flex items-center space-x-1">
      <div
        className="w-2.5 h-2.5 bg-current rounded-full animate-bounce"
        role="status"
        aria-label="loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
      <div
        className="w-2.5 h-2.5 bg-current rounded-full animate-bounce delay-150"
        role="status"
        aria-label="loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
      <span>Processing</span>
    </div>
  );
};

export default ButtonLoader;
