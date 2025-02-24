import { motion } from "framer-motion";
import FileInput from "./file-input";

interface FileInputModalProps {
  onClose: () => void;
}

const FileInputModal = ({ onClose }: FileInputModalProps) => {
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden"
      >
        <FileInput />
        <div className="p-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-[#6FBDF5] text-white hover:bg-[#5CA8E0] transition-colors"
          >
            بستن
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};
export default FileInputModal;
