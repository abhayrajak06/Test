import React from "react";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";

const Comment = ({ c }) => {
  return (
    <div className="px-2 py-2 bg-gray-200 rounded-lg my-2">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-gray-600">@{c.author}</h3>
        <div className="flex flex-wrap justify-center items-center space-x-4">
          <p className="text-gray-500 text-sm">
            {new Date(c.updatedAt).toString().slice(0, 15)}
          </p>
          <p className="text-gray-500 text-sm">
            {new Date(c.updatedAt).toString().slice(16, 20)}
          </p>
          <div className="flex items-center justify-center space-x-2">
            <p>
              <BiEdit />
            </p>
            <p>
              <MdDelete />
            </p>
          </div>
        </div>
      </div>
      <p className="px-4 mt-2">{c.comment}</p>
    </div>
  );
};

export default Comment;
