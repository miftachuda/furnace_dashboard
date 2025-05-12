import React, { useState } from "react";
import BoxColumn from "./BoxColumn";
import { BoxState } from "./SwitchBox";

interface BoxItem {
  id: number;
  number: number;
  state: BoxState;
}

const generateInitialBoxes = (): BoxItem[] => {
  // Left column (11-20)
  const leftBoxes = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    number: i + 11,
    state: "Off" as BoxState,
  }));

  // Right column (1-10)
  const rightBoxes = Array.from({ length: 10 }, (_, i) => ({
    id: i + 10,
    number: 10 - i,
    state: "Off" as BoxState,
  }));

  return [...leftBoxes, ...rightBoxes];
};

const BoxPanel: React.FC = () => {
  const [boxes, setBoxes] = useState<BoxItem[]>(generateInitialBoxes());

  const handleBoxClick = (id: number) => {
    setBoxes((prevBoxes) =>
      prevBoxes.map((box) => {
        if (box.id === id) {
          // Cycle through states: Off -> O -> G -> D -> Off
          const nextState = (): BoxState => {
            switch (box.state) {
              case "Off":
                return "O";
              case "O":
                return "G";
              case "G":
                return "D";
              case "D":
                return "Off";
              default:
                return "Off";
            }
          };
          return { ...box, state: nextState() };
        }
        return box;
      })
    );
  };

  // Split boxes into left and right columns
  const leftBoxes = boxes.filter((box) => box.id < 10);
  const rightBoxes = boxes.filter((box) => box.id >= 10);

  return (
    <div className="w-full max-w-16 mx-auto">
      <div className="flex justify-between gap-16 md:gap-24">
        <div className="rounded-3xl border-4 border-emerald-400 p-4 md:p-6">
          <BoxColumn items={leftBoxes} onBoxClick={handleBoxClick} />
        </div>

        <div className="rounded-3xl border-4 border-emerald-400 p-4 md:p-6">
          <BoxColumn
            items={rightBoxes}
            reversed={true}
            onBoxClick={handleBoxClick}
          />
        </div>
      </div>

      <div className="mt-8 text-center">
        <h2 className="text-4xl font-bold">12 Gas</h2>
        <h3 className="text-3xl font-bold">7 Dual</h3>
      </div>
    </div>
  );
};

export default BoxPanel;
