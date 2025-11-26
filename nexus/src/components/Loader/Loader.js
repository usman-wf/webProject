const Loader = () => {
  return (
    <div className="flex items-center justify-center my-2">
      <div className="flex items-center justify-center w-fit mx-auto h-full rounded-xl p-4">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
        {/* <Lottie options={defaultOptions} height={400} width={400} /> */}
      </div>
    </div>
  );
};

export default Loader;
