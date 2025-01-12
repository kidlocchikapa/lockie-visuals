import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Alert = ({ type, message, onClose }) => {
  const bgColor = type === "error" ? "bg-red-100" : "bg-green-100";
  const textColor = type === "error" ? "text-red-800" : "text-green-800";
  const borderColor = type === "error" ? "border-red-200" : "border-green-200";

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose(); // Call the provided onClose function to clear the notification
      }, 2000);

      return () => clearTimeout(timer); // Cleanup the timer on unmount
    }
  }, [message, onClose]);

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`${bgColor} ${textColor} px-4 py-3 rounded-lg border ${borderColor} mb-4`}
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Alert;
