import React from "react";
import SwitchBurner, { BurnerState } from "./SwitchBurner";

interface BurnerItem {
  id: number;
  number: number;
  state: BurnerState;
}

interface BurnerColumnProps {
  items: BurnerItem[];
  reversed?: boolean;
  onBurnerClick: (id: number, state: string) => void;
}

const BurnerColumn: React.FC<BurnerColumnProps> = ({
  items,
  reversed = false,
  onBurnerClick,
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
          <SwitchBurner
            state={item.state}
            onClick={(state) => onBurnerClick(item.id, state)}
          />
        </div>
      ))}
    </div>
  );
};

export default BurnerColumn;
