import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { URL } from "../url";
import toast from "react-hot-toast";
import { useAuth } from "../context/UserContext";

const Login = () => {
  const [details, setDetails] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const [, setUser] = useAuth();
  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { email, password } = details;
      const res = await axios.post(
        `${URL}/api/v1/auth/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      if (res?.data) {
        toast.success("Login Successfully");
        setUser(res?.data);
        navigate("/");
      }
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };
  return (
    <>
      <div
        className="flex flex-wrap gap-2 items-center justify-between px-6 md:px-[200px] py-4 bg-slate-100"
        style={{ position: "sticky", top: "0", zIndex: "65", opacity: "0.95" }}
      >
        <h1 className="text-xl  font-extrabold">
          <Link to={"/"}>Blog Market</Link>
        </h1>
        <h3 className="btn nav-btn bg-slate-200 rounded-md p-1 font-semibold">
          <Link to="/register">Register</Link>
        </h3>
      </div>
      <div className="w-full flex justify-center items-center h-[70vh]">
        <form
          onSubmit={handleLogin}
          className="flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[25%]"
        >
          <h1 className="text-xl font-bold text-left">Login to your account</h1>
          <input
            type="email"
            required
            className="w-full px-4 py-2 border-2 border-black outline-0"
            placeholder="Enter your email"
            name="email"
            value={details.email}
            onChange={handleChange}
          />
          <input
            type="password"
            required
            className="w-full px-4 py-2 border-2 border-black outline-0"
            placeholder="Enter your password"
            name="password"
            value={details.password}
            onChange={handleChange}
          />
          <button
            onClick={handleLogin}
            className="w-full px-4 py-4 text-lg font-bold text-white bg-black rounded-lg hover:bg-gray-500 hover:text-black"
          >
            Login
          </button>
          {error && (
            <h3 className="text-red-600 text-md">Something went wrong</h3>
          )}
          <div className="flex justify-center items-center space-x-3">
            <p>New here?</p>
            <p className="text-gray-500 hover:text-black">
              <Link to="/register">Register</Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
