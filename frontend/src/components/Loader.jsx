import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="relative">
        <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-blue-500 font-bold">
          A
        </span>
        <div className="rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid animate-spin"></div>
      </div>
    </div>
  );
};

export default Loader;
