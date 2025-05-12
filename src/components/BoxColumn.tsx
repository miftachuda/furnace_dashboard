import React from "react";
import SwitchBox, { BoxState } from "./SwitchBox";

interface BoxItem {
  id: number;
  number: number;
  state: BoxState;
}

interface BoxColumnProps {
  items: BoxItem[];
  reversed?: boolean;
  onBoxClick: (id: number) => void;
}

const BoxColumn: React.FC<BoxColumnProps> = ({
  items,
  reversed = false,
  onBoxClick,
}) => {
  return (
    <div className="flex flex-col gap-4 items-start relative">
      {items.map((item) => (
        <div
          key={item.id}
          className={`flex items-center ${
            reversed ? "flex-row-reverse" : "flex-row"
          } gap-4`}
        >
          <span className="text-2xl font-bold text-cyan-300">
            {item.number}
          </span>
          <SwitchBox state={item.state} onClick={() => onBoxClick(item.id)} />
        </div>
      ))}
    </div>
  );
};

export default BoxColumn;
