import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../context/UserContext";
import axios from "axios";
import { URL } from "../url";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useAuth();
  const navigate = useNavigate();

  const getUserInfo = async () => {
    try {
      if (user?._id) {
        const res = await axios.get(`${URL}/api/v1/user/${user?._id}`);
        setName(res?.data.username);
        setEmail(res?.data.email);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserInfo();
  }, [user?._id]);

  const handleUpdate = async () => {
    try {
      const res = await axios.put(
        `${URL}/api/v1/user/${user?._id}`,
        {
          username: name,
          password: password,
        },
        { withCredentials: true }
      );
      if (res?.data) {
        toast.success("User info updated successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete your account?"
      );
      if (confirmDelete) {
        const res = await axios.delete(`${URL}/api/v1/user/${user?._id}`, {
          withCredentials: true,
        });
        if (res?.data) {
          toast.success("Your account has been deleted successfully");
          setUser(null);
          navigate("/");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar />
      <div
        className="flex mt-8 md:flex-row items-center justify-center"
        style={{ minHeight: "60vh" }}
      >
        <div className="md:sticky md:top-16 flex justify-center md:justify-end items-start mb-4 border-2 p-10 ">
          <div className="flex flex-col space-y-4 items-center justify-center">
            <h1 className="text-2xl font-bold mb-4">Profile</h1>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="outline-none border-b-2 border-indigo-200 px-4 py-2 text-black-100"
              placeholder="Your username"
            />
            <input
              type="email"
              value={email}
              className=" border-b-2 border-indigo-200 px-4 py-2 text-black-100"
              placeholder="Your email"
              disabled
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className=" border-b-2 border-indigo-200 px-4 py-2 text-black-100"
              placeholder="Your password"
            />
            <div className="flex items-center space-x-4 mt-8">
              <button
                onClick={handleUpdate}
                className="text-white font-semibold bg-black px-4 py-2 hover:text-black hover:bg-gray-400"
              >
                Update
              </button>
              <button
                onClick={handleDelete}
                className="text-white font-semibold bg-black px-4 py-2 hover:text-black hover:bg-gray-400"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
