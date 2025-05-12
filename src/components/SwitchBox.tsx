import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type BoxState = "O" | "G" | "D" | "Off";

interface SwitchBoxProps {
  state: BoxState;
  onClick: () => void;
  className?: string;
}

const StateDialog: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  currentState: BoxState;
  onSelect: (newState: BoxState) => void;
}> = ({ isOpen, onClose, currentState, onSelect }) => {
  const states: BoxState[] = ["O", "G", "D", "Off"];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-50 w-72">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-lg p-6 shadow-xl"
      >
        <h3 className="text-lg font-bold mb-4">Select New State</h3>
        <div className="grid grid-cols-2 gap-3 mb-4">
          {states.map((stateOption) => (
            <button
              key={stateOption}
              onClick={() => {
                onSelect(stateOption);
                onClose();
              }}
              className={`
                p-3 rounded-md font-bold text-white transition-colors
                ${
                  stateOption === currentState
                    ? "ring-2 ring-offset-2 ring-blue-500"
                    : ""
                }
                ${
                  stateOption === "O" ? "bg-orange-500 hover:bg-orange-600" : ""
                }
                ${stateOption === "G" ? "bg-blue-500 hover:bg-blue-600" : ""}
                ${
                  stateOption === "D" ? "bg-yellow-500 hover:bg-yellow-600" : ""
                }
                ${stateOption === "Off" ? "bg-gray-400 hover:bg-gray-500" : ""}
              `}
            >
              {stateOption}
            </button>
          ))}
        </div>
        <button
          onClick={onClose}
          className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
        >
          Cancel
        </button>
      </motion.div>
    </div>
  );
};

const SwitchBox: React.FC<SwitchBoxProps> = ({
  state,
  onClick,
  className = "",
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const getBackgroundColor = () => {
    switch (state) {
      case "O":
        return "bg-orange-500";
      case "G":
        return "bg-blue-500";
      case "D":
        return "bg-yellow-500";
      case "Off":
        return "bg-gray-300";
    }
  };

  const handleStateChange = (newState: BoxState) => {
    if (newState !== state) {
      onClick();
    }
  };

  return (
    <>
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsDialogOpen(true)}
        className={`
          w-12 h-12 rounded-md flex items-center justify-center 
          font-bold text-lg border-2 border-gray-800
          ${getBackgroundColor()} ${className}
          transition-colors duration-200 ease-in-out
          text-white shadow-md
        `}
        aria-label={`Switch box - current state: ${state}`}
      >
        {state !== "Off" ? state : ""}
      </motion.button>

      <AnimatePresence>
        {isDialogOpen && (
          <StateDialog
            isOpen={isDialogOpen}
            onClose={() => setIsDialogOpen(false)}
            currentState={state}
            onSelect={handleStateChange}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default SwitchBox;
