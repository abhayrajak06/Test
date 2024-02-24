import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { GiCrossedBones } from "react-icons/gi";
import { IoReorderThreeSharp } from "react-icons/io5";
import toast from "react-hot-toast";
import axios from "axios";
import { URL } from "../url";
import { useAuth } from "../context/UserContext";

const Navbar = ({ setPosts, getAllPosts, setNoResults, setLoading }) => {
  const [toggle, setToggle] = useState(false);
  const [user, setUser] = useAuth();
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();
  const path = useLocation().pathname;
  const [keyword, setKeyword] = useState("");

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    toast.success("Logout Successfully");
    setUser(null);
    navigate("/login");
  };

  const handleSearchToggle = () => {
    setSearchOpen(!searchOpen);
  };

  const getAllSearchPosts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${URL}/api/v1/post/search/${keyword}`);
      if (res?.data) {
        setPosts(res?.data);
      }
      if (res?.data.length === 0) {
        setNoResults(true);
      } else {
        setNoResults(false);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (setPosts && getAllPosts) {
      if (keyword.length) getAllSearchPosts();
      else getAllPosts();
    }
  }, [keyword]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    if (mediaQuery.matches) {
      setToggle(true);
    }

    const handleResize = () => {
      setToggle(mediaQuery.matches);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className="flex flex-wrap gap-2 items-center justify-around px-6 md:px-[200px] py-4 bg-slate-100"
      style={{ position: "sticky", top: "0", zIndex: "65", opacity: "0.95" }}
    >
      <div id="nav-wrap" className="flex mt-2 md:gap-5 gap-2">
        <h1 className="text-xl font-extrabold">
          <NavLink onClick={() => window.scrollTo(0, 0)} to={"/"}>
            Blog Bazaar
          </NavLink>
        </h1>
        {path === "/" && (
          <div className="flex gap-2 justify-center items-center space-x-0">
            <p className="p-2">
              <BsSearch onClick={handleSearchToggle} />
            </p>
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className={`search-bar mt-1 outline-none px-5 rounded w-[15rem] h-[2rem] ${
                searchOpen ? "" : "hidden"
              }`}
              placeholder="Search"
            />
          </div>
        )}
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
                <NavLink to={`/profile/${user._id}`}>Profile</NavLink>
              </h3>
              <h3 className="btn nav-btn bg-slate-200 rounded-md p-1 font-semibold">
                <NavLink to="/write">Write</NavLink>
              </h3>
              <h3 className="btn nav-btn bg-slate-200 rounded-md p-1 font-semibold">
                <NavLink to="/my-blogs">My Blogs</NavLink>
              </h3>
              <h3
                onClick={handleLogout}
                className="btn nav-btn bg-slate-200 rounded-md p-1 font-semibold cursor-pointer"
              >
                Logout
              </h3>
            </>
          ) : (
            <>
              <h3 className="btn nav-btn bg-slate-200 rounded-md p-1 font-semibold">
                <NavLink to="/login">Login</NavLink>
              </h3>
              <h3 className="btn nav-btn bg-slate-200 rounded-md p-1 font-semibold">
                <NavLink to="/register">Register</NavLink>
              </h3>
            </>
          )}
        </div>
      </div>
      <div
        className={`md:hidden fixed top-3 right-3 ${toggle ? "hidden" : ""}`}
      >
        <span onClick={handleToggle}>
          <GiCrossedBones />{" "}
        </span>
      </div>
      <div
        className={`md:hidden fixed top-3 right-3 ${toggle ? "" : "hidden"}`}
      >
        <span onClick={handleToggle}>
          <IoReorderThreeSharp size={30} />{" "}
        </span>
      </div>
    </div>
  );
};

export default Navbar;
