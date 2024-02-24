import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { URL } from "../url";
import toast from "react-hot-toast";
import { useAuth } from "../context/UserContext";

const Register = () => {
  const [details, setDetails] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useAuth();

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear validation error on input change
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    // Validate username
    if (details.username.trim() === "") {
      newErrors.username = "Username is required";
      isValid = false;
    }

    // Validate email
    if (!details.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(details.email)) {
      newErrors.email = "Invalid email address";
      isValid = false;
    }

    // Validate password
    if (details.password.trim() === "") {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      // If form is not valid, do not proceed with submission
      return;
    }

    try {
      const { username, email, password } = details;
      const res = await axios.post(`${URL}/api/v1/auth/register`, {
        username,
        email,
        password,
      });

      if (res?.data) {
        toast.success("Register Successfully !");
        // Store user data in localStorage
        // localStorage.setItem("user", JSON.stringify(res?.data));
        // setUser(res?.data);

        navigate("/login");
      }
    } catch (error) {
      setError(true);
    }
  };

  return (
    <>
      <div
        className="flex flex-wrap gap-2 items-center justify-between px-6 md:px-[200px] py-4 bg-slate-100"
        style={{ position: "sticky", top: "0", zIndex: "65", opacity: "0.95" }}
      >
        <h1 className="text-xl font-extrabold">
          <Link to={"/"}>Blog Market</Link>
        </h1>
        <h3 className="btn nav-btn bg-slate-200 rounded-md p-1 font-semibold">
          <Link to="/login">Login</Link>
        </h3>
      </div>
      <div className="w-full flex justify-center items-center h-[70vh]">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[25%]"
        >
          <h1 className="text-xl font-bold text-left">Create an account</h1>
          <input
            type="text"
            className="w-full px-4 py-2 border-2 border-black outline-0"
            placeholder="Enter your username"
            name="username"
            value={details.username}
            onChange={handleChange}
            required
          />
          {errors.username && (
            <span className="text-red-600 text-md">{errors.username}</span>
          )}
          <input
            type="email"
            className="w-full px-4 py-2 border-2 border-black outline-0"
            placeholder="Enter your email"
            name="email"
            value={details.email}
            onChange={handleChange}
            required
          />
          {errors.email && (
            <span className="text-red-600 text-md">{errors.email}</span>
          )}
          <input
            type="password"
            className="w-full px-4 py-2 border-2 border-black outline-0"
            placeholder="Enter your password"
            name="password"
            value={details.password}
            onChange={handleChange}
            required
          />
          {errors.password && (
            <span className="text-red-600 text-md">{errors.password}</span>
          )}
          <button
            type="submit"
            className="w-full px-4 py-4 text-lg font-bold text-white bg-black rounded-lg hover:bg-gray-500 hover:text-black"
          >
            Register
          </button>
          {error && (
            <h3 className="text-red-600 text-md">Something went wrong</h3>
          )}

          <div className="flex justify-center items-center space-x-3">
            <p>Already have an account?</p>
            <p className="text-gray-500 hover:text-black">
              <Link to="/login">Login</Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
