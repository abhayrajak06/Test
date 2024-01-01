import React from "react";

const PageNotFound = () => {
  return (
    <div className="bg-slate-600" style={{ minHeight: "74vh" }}>
      <div
        className="flex flex-col items-center justify-center"
        style={{ height: "60vh" }}
      >
        <h1 className="text-9xl font-bold ">404</h1>
        <h2 className="text-2xl m-2">Page Not Found !</h2>
      </div>
    </div>
  );
};

export default PageNotFound;
