import React, { useState } from "react";

type ButtonOption = {
  label: string;
  active: boolean;
};

const FuelToggle: React.FC = () => {
  const [buttons, setButtons] = useState<ButtonOption[]>([
    { label: "Fuel Gas", active: true },
    { label: "Fuel Oil", active: false },
  ]);

  const toggleButton = (index: number) => {
    setButtons((prev) =>
      prev.map((btn, i) =>
        i === index ? { ...btn, active: !btn.active } : btn
      )
    );
  };

  return (
    <div className="flex gap-4">
      {buttons.map((btn, index) => (
        <button
          key={btn.label}
          onClick={() => toggleButton(index)}
          className={`relative px-6 py-2 rounded-md font-semibold text-sm transition-all duration-300 overflow-hidden
            ${
              btn.active
                ? "bg-blue-600 text-white border-2 border-blue-600 shadow-[0_0_0_4px_rgba(59,130,246,0.3)]"
                : "bg-gray-100 text-gray-400 border-2 border-gray-200"
            }
            ${
              !btn.active
                ? 'after:content-[""] after:absolute after:w-[150%] after:h-[2px] after:bg-gray-400 after:rotate-[-20deg] after:top-1/2 after:left-[-25%]'
                : ""
            }
          `}
        >
          {btn.label}
        </button>
      ))}
    </div>
  );
};

export default FuelToggle;
