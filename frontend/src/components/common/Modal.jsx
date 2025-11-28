import { X } from "lucide-react";

const Modal = ({ children, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-2xl p-6 w-[90%] max-w-md relative shadow-xl border border-gray-700">
        
        {/* CLOSE BUTTON */}
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-white"
          onClick={onClose}
        >
          <X className="w-6 h-6" />
        </button>

        {children}
      </div>
    </div>
  );
};

export default Modal;
