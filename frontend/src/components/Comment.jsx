import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { URL } from "../url";
import toast from "react-hot-toast";
import { useAuth } from "../context/UserContext";

const Comment = ({ c, postDetails, fetchPostComments }) => {
  const [user] = useAuth();
  const [updatePopupOpen, setUpdatePopupOpen] = useState(false);
  const [updatedComment, setUpdatedComment] = useState(c.comment);
  let isAuthor = false;

  if (postDetails?.userId === c?.userId) isAuthor = true;

  const popupRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setUpdatePopupOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleUpdate = async () => {
    try {
      const res = await axios.put(
        `${URL}/api/v1/comment/update/${c._id}`,
        {
          comment: updatedComment,
        },
        { withCredentials: true }
      );
      if (res?.data) {
        toast.success("Comment updated");
        setUpdatePopupOpen(false);
        await fetchPostComments();
      }
    } catch (error) {
      console.log(error);
    }
  };

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
        <h3 className="font-bold text-gray-600">
          @{c.author}{" "}
          {isAuthor && (
            <span
              className="border-2 text-sm border border-slate-300 rounded bg-slate-300 p-1"
              style={{ fontSize: "0.6rem", cursor: "pointer" }}
            >
              Author
            </span>
          )}
        </h3>
        <div className="flex flex-wrap justify-center items-center space-x-4">
          <p className="text-gray-500 text-sm">
            {new Date(c.updatedAt).toString().slice(3, 15)}
          </p>
          <p className="text-gray-500 text-sm">
            {new Date(c.updatedAt).toString().slice(16, 20)}
          </p>
          {user?._id === c?.userId && (
            <div className="flex items-center justify-center space-x-2">
              <p className="cursor-pointer">
                <BiEdit onClick={() => setUpdatePopupOpen(true)} size={20} />
              </p>
              <p className="cursor-pointer">
                <MdDelete onClick={handleDelete} size={20} />
              </p>
            </div>
          )}
        </div>
      </div>
      <p className="px-4 mt-2">{c.comment}</p>

      {/* Update Popup */}
      {updatePopupOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div
            ref={popupRef}
            className="bg-white p-4 rounded shadow-lg"
            role="dialog"
            aria-modal="true"
            aria-labelledby="update-comment-title"
          >
            <h2 id="update-comment-title" className="text-lg font-bold mb-2">
              Update Comment
            </h2>
            <textarea
              value={updatedComment}
              onChange={(e) => setUpdatedComment(e.target.value)}
              className="w-full h-20 p-2 border border-gray-300 rounded mb-2"
              aria-label="Comment"
            />
            <div className="flex">
              <button
                onClick={handleUpdate}
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
              >
                Update
              </button>
              <button
                onClick={() => setUpdatePopupOpen(false)}
                className="text-gray-500 border-2 p-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Comment;
