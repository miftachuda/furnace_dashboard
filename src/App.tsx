import React from "react";
import { ZoomableCanvas, CanvasElement } from "./components/ZoomableCanvas";
import { Map, Pin } from "lucide-react";
import Headers from "./components/Header";

// Sample background image URL (replace with your own 1920x1080 image)
const BACKGROUND_IMAGE = "src/assets/proj.jpg";

function App() {
  // Sample elements to place on the canvas
  const elements = [
    { id: 1, x: 25, y: 30, label: "Point A" },
    { id: 2, x: 75, y: 40, label: "Point B" },
    { id: 3, x: 50, y: 70, label: "Point C" },
  ];

  return (
    <div className="w-full h-screen overflow-hidden">
      <Headers></Headers>
      <ZoomableCanvas backgroundImage={BACKGROUND_IMAGE}>
        {/* Place elements on the canvas */}
        {elements.map((element) => (
          <CanvasElement key={element.id} x={element.x} y={element.y}>
            <div className="flex flex-col items-center">
              <div className="bg-red-500 p-2 rounded-full text-white shadow-lg animate-pulse">
                <Pin size={24} />
              </div>
              <div className="mt-2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg shadow-md text-sm font-medium">
                {element.label}
              </div>
            </div>
          </CanvasElement>
        ))}
      </ZoomableCanvas>
    </div>
  );
}

export default App;
