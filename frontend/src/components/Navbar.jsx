import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { GiCrossedBones } from "react-icons/gi";
import { useAuth } from "../context/UserContext";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle(!toggle);
  };
  const navigate = useNavigate();

  const [user, setUser] = useAuth();

  const handleLogout = () => {
    Cookies.remove("token");
    toast.success("Logout Successfully");
    setUser(null);
    navigate("/login");
  };

  return (
    <div
      className="flex flex-wrap gap-2 items-center justify-around px-6 md:px-[200px] py-4 bg-slate-100"
      style={{ position: "sticky", top: "0", zIndex: "65", opacity: "0.95" }}
    >
      <div id="nav-wrap" className="flex md:gap-5 gap-2">
        <h1 className="text-xl font-extrabold">
          <Link to={"/"}>Blog Market</Link>
        </h1>
        <div className="flex gap-2  justify-center items-center space-x-0 ">
          <p className="p-2" onClick={handleToggle}>
            <BsSearch />
          </p>
          <input
            type="text"
            className={`search-bar mt-1 outline-none px-5 rounded w-[15rem] h-[2rem] ${
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
              <h3 className="btn nav-btn bg-slate-200 rounded-md p-1 font-semibold">
                <Link to="/profile">Profile</Link>
              </h3>
              <h3 className="btn nav-btn bg-slate-200 rounded-md p-1 font-semibold">
                <Link to="/write">Write</Link>
              </h3>
              <h3 className="btn nav-btn bg-slate-200 rounded-md p-1 font-semibold">
                <Link to="/my-blogs">My Blogs</Link>
              </h3>
              <h3
                onClick={handleLogout}
                className="btn nav-btn bg-slate-200 rounded-md p-1 font-semibold"
              >
                <Link to="/login">Logout</Link>
              </h3>
            </>
          ) : (
            <>
              <h3 className="btn nav-btn bg-slate-200 rounded-md p-1 font-semibold">
                <Link to="/login">Login</Link>
              </h3>
              <h3 className="btn nav-btn bg-slate-200 rounded-md p-1 font-semibold">
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
