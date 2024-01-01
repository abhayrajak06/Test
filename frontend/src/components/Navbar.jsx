import React from "react";
import { Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";

const Navbar = () => {
  const user = false;
  return (
    <div
      className="flex flex-wrap gap-2 items-center justify-between px-6 md:px-[200px] py-4 bg-slate-100"
      style={{ position: "sticky", top: "0", zIndex: "65", opacity: "0.95" }}
    >
      <h1 className="text-xl  font-extrabold">
        <Link to={"/"}>Blog Market</Link>
      </h1>
      <div className="flex  justify-center items-center space-x-0 ">
        <p className="p-2">
          <BsSearch />
        </p>
        <input
          type="text"
          className="outline-none px-5 rounded w-[15rem] h-[2rem]"
          placeholder="Search"
        />
      </div>
      <div className="flex  items-center justify-center space-x-2 md:space-x-4">
        {user ? (
          <h3>
            <Link to="/write">Write</Link>
          </h3>
        ) : (
          <h3>
            <Link to="/login">Login</Link>
          </h3>
        )}

        {user ? (
          <h3>
            <Link to="/profile">Profile</Link>
          </h3>
        ) : (
          <h3>
            <Link to="/register">Register</Link>
          </h3>
        )}
      </div>
    </div>
  );
};

export default Navbar;
