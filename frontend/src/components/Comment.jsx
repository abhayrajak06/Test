import axios from "axios";
import React from "react";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { URL } from "../url";
import toast from "react-hot-toast";
import { useAuth } from "../context/UserContext";

const Comment = ({ c }) => {
  const [user] = useAuth();
  const handleDelete = async () => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this comment?"
      );
      if (confirmDelete) {
        const res = await axios.delete(
          `${URL}/api/v1/comment/delete/${c._id}`,
          {
            withCredentials: true,
          }
        );
        if (res?.data) {
          toast.success("Comment deleted");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

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
          {user?._id === c?.userId && (
            <div className="flex items-center justify-center space-x-2">
              <p className="cursor-pointer">
                <BiEdit size={20} />
              </p>
              <p className="cursor-pointer">
                <MdDelete onClick={handleDelete} size={20} />
              </p>
            </div>
          )}
        </div>
      </div>
      <p className="px-4 mt-2">{c.comment}</p>
    </div>
  );
};

export default Comment;
