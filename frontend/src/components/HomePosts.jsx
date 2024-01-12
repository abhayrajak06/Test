import React from "react";

const HomePosts = ({ post }) => {
  return (
    <div
      className="w-full flex flex-wrap justify-center gap-10 mt-8  mb-10  cursor-pointer border-r-2 border-l-2 border-indigo-500"
      id="homePost"
    >
      <div className="flex justify-center items-center w-[30%] h-[200px]">
        <img
          src={post.photo}
          alt=""
          className="h-full w-full object-cover rounded"
          style={{ minWidth: "12rem" }}
        />
      </div>
      <div className="flex flex-col w-[60%]">
        <h1 className="text-xl font-bold md:mb-2 mb-1 md:text-2xl">
          {post.title}
        </h1>
        <div className="flex flex-wrap mb-2 text-sm font-semibold text-gray-500 items-center justify-between md:mb-4">
          <p>@{post.username}</p>
          <div className="flex space-x-2">
            <p>{new Date(post.updatedAt).toString().slice(4, 15)}</p>
            <p>{new Date(post.updatedAt).toString().slice(16, 21)}</p>
          </div>
        </div>
        <p className="text-sm md:text-lg">
          {post.desc.slice(0, 250)}{" "}
          <span className="text-sm">...Read more</span>
        </p>
      </div>
    </div>
  );
};

export default HomePosts;
