const TemperatureDisplay = ({ temperature = 30 }) => {
  return (
    <div className="relative w-40 h-40 flex items-center justify-center">
      <div
        className="absolute"
        style={{
          transform: "scale(0.30)",
          transformOrigin: "top left",
          top: "0%",
          left: "0%",
        }}
      >
        {/* <img
          src="/assets/arrow.gif"
          alt="Status animation"
          className="w-full h-full pointer-events-none object-contain"
        /> */}
      </div>
      <div
        className="absolute text-6xl font-extrabold bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400 text-transparent bg-clip-text bottom-2"
        style={{
          transformOrigin: "top left",
          top: "0%",
          left: "25%",
        }}
      >
        +{temperature.toFixed(2)}°C
      </div>
    </div>
  );
};

export default TemperatureDisplay;
