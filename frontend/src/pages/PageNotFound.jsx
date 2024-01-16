import React from "react";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="bg-slate-300" style={{ minHeight: "100vh" }}>
      <div
        className="flex flex-col items-center justify-center"
        style={{ height: "100vh" }}
      >
        <h1 className="text-9xl font-bold">404</h1>
        <h2 className="text-2xl m-2">Page Not Found!</h2>
        <button onClick={goBack} className="btn bg-slate-600 p-2 mt-1 rounded">
          Go Back
        </button>
      </div>
    </div>
  );
};

export default PageNotFound;
