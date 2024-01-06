import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { GiCrossedBones } from "react-icons/gi";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const user = false;

  return (
    <div
      className="flex flex-wrap gap-2 items-center justify-around px-6 md:px-[200px] py-4 bg-slate-100"
      style={{ position: "sticky", top: "0", zIndex: "65", opacity: "0.95" }}
    >
      <div id="nav-wrap" className="flex md:gap-5 gap-2">
        <h1 className="text-xl font-extrabold">
          <Link to={"/"}>Blog Market</Link>
        </h1>
        <div className="flex justify-center items-center space-x-0 ">
          <p className="p-2" onClick={handleToggle}>
            <BsSearch />
          </p>
          <input
            type="text"
            className={`mt-1 outline-none px-5 rounded w-[15rem] h-[2rem] ${
              toggle ? "hidden" : ""
            }`}
            placeholder="Search"
          />
        </div>
      </div>
      <div className="flex gap-5">
        <div
          className={`flex items-center justify-center space-x-2 md:space-x-4 ${
            toggle ? "hidden" : ""
          }`}
        >
          {user ? (
            <>
              <h3
                className="btn bg-slate-300 rounded-md p-1 font-semibold"
                style={{
                  boxShadow:
                    "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
                }}
              >
                <Link to="/profile">Profile</Link>
              </h3>
              <h3
                className="btn bg-slate-300 rounded-md p-1 font-semibold"
                style={{
                  boxShadow:
                    "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
                }}
              >
                <Link to="/write">Write</Link>
              </h3>
              <h3
                className="btn bg-slate-300 rounded-md p-1 font-semibold"
                style={{
                  boxShadow:
                    "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
                }}
              >
                <Link to="/my-blogs">My Blogs</Link>
              </h3>
              <h3
                className="btn bg-slate-300 rounded-md p-1 font-semibold"
                style={{
                  boxShadow:
                    "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
                }}
              >
                <Link to="/logout">Logout</Link>
              </h3>
            </>
          ) : (
            <>
              <h3
                className="btn bg-slate-300 rounded-md p-1 font-semibold"
                style={{
                  boxShadow:
                    "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
                }}
              >
                <Link to="/login">Login</Link>
              </h3>
              <h3
                className="btn bg-slate-300 rounded-md p-1 font-semibold"
                style={{
                  boxShadow:
                    "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
                }}
              >
                <Link to="/register">Register</Link>
              </h3>
            </>
          )}
        </div>
      </div>
      <div
        onClick={handleToggle}
        className={`md:hidden fixed top-3 right-3 ${toggle ? "hidden" : ""}`}
      >
        <p>
          <GiCrossedBones />{" "}
        </p>
      </div>
    </div>
  );
};

export default Navbar;
