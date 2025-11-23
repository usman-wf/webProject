import Loader from "../components/Loader/Loader";

export default function Loading() {
  return (
    <div className="w-full flex justify-between items-center h-[100vh]">
      <Loader />
    </div>
  );
}
