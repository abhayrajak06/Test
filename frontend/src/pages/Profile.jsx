import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Profile = () => {
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
              className="outline-none border-b-2 border-indigo-200 px-4 py-2 text-gray-500"
              placeholder="Your username"
            />
            <input
              type="email"
              className=" border-b-2 border-indigo-200 px-4 py-2 text-gray-500"
              placeholder="Your email"
              disabled
            />
            <input
              type="password"
              className=" border-b-2 border-indigo-200 px-4 py-2 text-gray-500"
              placeholder="Your password"
            />
            <div className="flex items-center space-x-4 mt-8">
              <button className="text-white font-semibold bg-black px-4 py-2 hover:text-black hover:bg-gray-400">
                Update
              </button>
              <button className="text-white font-semibold bg-black px-4 py-2 hover:text-black hover:bg-gray-400">
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
