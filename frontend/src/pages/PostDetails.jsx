import React from "react";
import Navbar from "../components/Navbar";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import Footer from "../components/Footer";
import Comment from "../components/Comment";

const PostDetails = () => {
  return (
    <div>
      <Navbar />
      <div className="px-8 mt-8 md:px-[200px]">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-black md:text-3xl">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Perferendis, perspiciatis!
          </h1>
          <div className="flex items-center justify-center space-x-2">
            <p>
              <BiEdit />
            </p>
            <p>
              <MdDelete />
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between mt-2 md:mt-4">
          <p>@wowhowowowow</p>
          <div className="flex space-x-2">
            <p>31/12/2023</p>
            <p>05:36</p>
          </div>
        </div>
        <img
          src="https://img.freepik.com/free-photo/ai-technology-microchip-background-digital-transformation-concept_53876-124669.jpg?w=900&t=st=1703947991~exp=1703948591~hmac=5770d52bab6fea01d4019e3298127ae259ac0697c56b51ed74c889c5437f4bcf"
          alt=""
          className="w-full h-full"
        />
        <p className="mx-auto mt-8">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio ad
          praesentium quia laboriosam facilis dolores aliquid iure laudantium
          totam laborum?
        </p>
        <div className="flex items-center mt-8 space-x-4 font-semibold">
          <p>Categories:</p>
          <div className="flex justify-center items-center space-x-2">
            <div className="bg-gray-300 rounded-lg px-3 py-1">Tech</div>
            <div className="bg-gray-300 rounded-lg px-3 py-1">Ai</div>
          </div>
        </div>
        <div className="flex flex-col mt-4">
          <h3 className="mt-6 mb-4 font-semibold">Comments:</h3>
          {/* comment */}
          <Comment />
          <Comment />
          <Comment />
        </div>
        {/* write a comment  */}
        <div className="flex flex-col mt-4 md:flex-row">
          <input
            type="text"
            className="md:w-[80%] outline-none px-4 mt-4 md:mt-0 py-2"
            placeholder="Write a comment"
          />
          <button className="bg-black  text-white px-2 py-2 mt-4 md:mt-0 md:w-[20%]">
            Add Comment
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PostDetails;
