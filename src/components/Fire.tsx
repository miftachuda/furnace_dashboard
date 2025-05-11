import React from "react";

export default function FireAnimation() {
  return (
    <div className="flex justify-center items-center h-screen bg-transparent">
      <div className="relative w-20 h-32">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-gradient-to-t from-yellow-400 via-orange-500 to-red-600 animate-flicker"></div>
        <div className="absolute top-5 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-gradient-to-t from-yellow-300 via-orange-400 to-red-500 animate-flicker delay-100"></div>
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-t from-yellow-200 via-orange-300 to-red-400 animate-flicker delay-200"></div>
      </div>
    </div>
  );
}
