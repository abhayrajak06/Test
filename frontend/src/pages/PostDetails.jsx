import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import Footer from "../components/Footer";
import Comment from "../components/Comment";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { URL } from "../url";
import Loader from "../components/Loader";
import toast from "react-hot-toast";
import { FaLock, FaShare } from "react-icons/fa";
import { useAuth } from "../context/UserContext";

const PostDetails = () => {
  const [postDetails, setPostDetails] = useState({});
  const postId = useParams().id;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [user] = useAuth();

  const copyPostURL = () => {
    const postURL = window.location.href;
    navigator.clipboard.writeText(postURL);
    toast.success("Post URL copied to clipboard!");
  };

  // Function to post a comment
  const postComment = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        URL + "/api/v1/comment/create",
        {
          comment: comment,
          author: user?.username,
          postId: postId,
          userId: user?._id,
        },
        {
          headers: {
            Authorization: user?.token,
          },
        }
      );
      if (res?.data) {
        fetchPostComments();
        setComment("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Function to fetch comments for the post
  const fetchPostComments = async () => {
    try {
      const res = await axios.get(URL + "/api/v1/comment/comments/" + postId);
      setComments(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Function to get post details
  const getPostDetails = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${URL}/api/v1/post/${postId}`);
      if (res?.data) {
        setPostDetails(res.data);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // Function to delete the post
  const handleDeletePost = async () => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this post?"
      );
      if (confirmDelete) {
        const res = await axios.delete(`${URL}/api/v1/post/${postId}`, {
          headers: {
            Authorization: user?.token,
          },
        });
        if (res?.data) {
          toast.success("Post deleted successfully");
          navigate("/");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPostComments();
    getPostDetails();
  }, [postId]);

  return (
    <div>
      <Navbar />
      {loading ? (
        <Loader />
      ) : (
        <div className="px-8 mt-8 md:px-[200px] min-h-[76vh]">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-black md:text-3xl">
              {postDetails.title}
            </h1>
            {user?._id === postDetails?.userId && (
              <div className="flex items-center justify-center space-x-2">
                <p
                  className="cursor-pointer"
                  onClick={() => navigate("/posts/post/edit/" + postId)}
                >
                  <BiEdit />
                </p>
                <p className="cursor-pointer" onClick={handleDeletePost}>
                  <MdDelete />
                </p>
              </div>
            )}
          </div>
          <div className="flex items-center justify-between mt-2 md:mt-4">
            <p>@{postDetails.username}</p>
            <div className="flex space-x-2">
              <p>{new Date(postDetails.createdAt).toString().slice(4, 16)}</p>
              <p>{new Date(postDetails.createdAt).toString().slice(16, 21)}</p>
            </div>
          </div>
          <img src={postDetails.photo} alt="" className="w-full h-full" />
          <div className="flex mt-4 justify-end">
            <button
              title="Share Post"
              className="rounded bg-slate-400 p-2 mr-2"
              onClick={copyPostURL}
            >
              <FaShare className="cursor-pointer" size={20} />
            </button>
          </div>
          <p className="mx-auto mt-8">{postDetails.desc}</p>
          <div className="flex items-center mt-8 space-x-4 font-semibold">
            <p>Categories:</p>
            <div className="flex justify-center items-center space-x-2">
              {postDetails.categories?.map((cat) => (
                <div className="bg-gray-300 rounded-lg px-3 py-1" key={cat}>
                  {cat}
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col mt-4">
            <h3 className="mt-6 mb-4 font-semibold">Comments:</h3>
            {/* comment */}
            {comments?.map((c) => (
              <Comment
                key={c._id}
                c={c}
                postDetails={postDetails}
                fetchPostComments={fetchPostComments}
              />
            ))}
          </div>
          {/* write a comment  */}
          <form
            onSubmit={postComment}
            className="flex flex-col mt-4 md:flex-row justify-between"
          >
            <input
              type="text"
              onChange={(e) => setComment(e.target.value)}
              value={comment}
              className="md:w-[70%] outline-none px-4 mt-4 md:mt-0 py-2 rounded bg-sky-100"
              placeholder="Write a comment"
              onClick={() => {
                if (!user) {
                  navigate("/login");
                }
              }}
            />
            <button
              type="submit"
              className={`${
                comment.length > 0 ? "bg-black" : "bg-gray-500"
              } text-white px-2 py-2 mt-4 md:mt-0 md:w-[20%] flex items-center justify-center cursor-pointer`}
              onClick={(e) => {
                if (!user) {
                  e.preventDefault();
                  navigate("/login");
                }
              }}
              disabled={comment.length > 0 ? false : true}
            >
              {user ? (
                <h4>Add Comment</h4>
              ) : (
                <>
                  <FaLock style={{ marginRight: "0.5rem" }} />
                  <h6>Add Comment</h6>
                </>
              )}
            </button>
          </form>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default PostDetails;
