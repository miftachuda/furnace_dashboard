import React, { useState, useEffect } from "react";
import { supabase } from "../utils/supabase";

type ButtonOption = {
  FuelGas021F101B: boolean;
  FuelOil021F101B: boolean;
};

const FuelToggle1: React.FC = () => {
  const [buttonState, setButtonState] = useState<ButtonOption>({
    FuelGas021F101B: false,
    FuelOil021F101B: false,
  });

  useEffect(() => {
    const fetchState = async () => {
      const { data, error } = await supabase
        .from("burner")
        .select("FuelGas021F101B, FuelOil021F101B")
        .eq("id", 1)
        .single();

      if (error) {
        console.error("Error fetching state:", error);
      } else if (data) {
        setButtonState({
          FuelGas021F101B: data.FuelGas021F101B,
          FuelOil021F101B: data.FuelOil021F101B,
        });
      }
    };

    fetchState();
  }, []);

  const toggleFuel = async (fuelType: keyof ButtonOption) => {
    const newState = {
      ...buttonState,
      [fuelType]: !buttonState[fuelType],
    };

    setButtonState(newState);

    const { error } = await supabase
      .from("burner")
      .update(newState)
      .eq("id", 1);

    if (error) {
      console.error("Error updating state:", error);
    }
  };

  const buttonBaseStyle =
    "absolute px-2 py-2 rounded-md font-bold text-2xl transition-all duration-300 border-2 overflow-hidden";

  const stopMarkStyle = `after:content-[''] after:absolute after:w-[150%] after:h-[2px] after:bg-red-500 after:rotate-[-20deg] after:top-1/2 after:left-[-25%]`;

  return (
    <div className="absolute inset-0 z-10 p-6">
      {buttonState.FuelGas021F101B && (
        <div
          className="absolute w-64 h-64"
          style={{
            transform: "scale(0.76) translate(-50%, -50%) ",
            left: "20%",
            bottom: "90%",
          }}
        >
          <img
            src="/assets/fire_blue.gif"
            alt="Status animation"
            className="absolute object-contain pointer-events-none"
          />
        </div>
      )}
      {buttonState.FuelOil021F101B && (
        <div
          className="absolute w-64 h-64"
          style={{
            transform: "scale(0.76) translate(-50%, -50%) ",
            left: "77%",
            bottom: "90%",
          }}
        >
          <img
            src="/assets/fire_red.gif"
            alt="Status animation"
            className="absolute  object-contain pointer-events-none"
          />
        </div>
      )}
      <button
        onClick={() => toggleFuel("FuelGas021F101B")}
        className={`${buttonBaseStyle} ${
          buttonState.FuelGas021F101B
            ? "bg-blue-600 text-white border-blue-600 shadow-[0_0_0_4px_rgba(59,130,246,0.3)]"
            : `bg-gray-100 text-gray-400 border-gray-200 ${stopMarkStyle}`
        }`}
        style={{
          transform: "scale(1.06)",
          height: "50px",
          width: "120px",
          left: "0%",
          bottom: "60%",
        }}
      >
        Fuel Gas
      </button>

      <button
        onClick={() => toggleFuel("FuelOil021F101B")}
        className={`${buttonBaseStyle} ${
          buttonState.FuelOil021F101B
            ? "bg-blue-600 text-white border-blue-600 shadow-[0_0_0_4px_rgba(59,130,246,0.3)]"
            : `bg-gray-100 text-gray-400 border-gray-200 ${stopMarkStyle}`
        } `}
        style={{
          transform: "scale(1.06) ",
          height: "50px",
          width: "120px",
          left: "65%",
          bottom: "60%",
        }}
      >
        Fuel Oil
      </button>
      <div
        className="absolute text-white font-bold text-2xl"
        style={{
          left: "30%",
          top: "70%",
        }}
      >
        West Burner
      </div>
    </div>
  );
};

export default FuelToggle1;
