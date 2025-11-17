import { useEffect } from "react";

const ConfirmationModal = ({ onCancel, onContinue }) => {
  useEffect(() => {
    // Prevent background scroll when modal is open
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-5000 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-fit max-w-md mx-auto z-6000 p-6 bg-[#0F172A] text-white rounded shadow-lg opacity-0 animate-slide-in-top">
        <h2 className="text-lg font-semibold text-gray-400 text-center mb-4">
          Are you sure you want to continue? This action cannot be undone
        </h2>
        <div className="flex justify-center space-x-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 text-[#333333] rounded hover:bg-gray-400 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onContinue}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
