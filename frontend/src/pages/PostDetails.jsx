import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import Footer from "../components/Footer";
import Comment from "../components/Comment";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { URL } from "../url";
import { useAuth } from "../context/UserContext";
import Loader from "../components/Loader";
import toast from "react-hot-toast";

const PostDetails = () => {
  const [postDetails, setPostDetails] = useState({});
  const postId = useParams().id;
  const [user] = useAuth();
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const navigate = useNavigate();
  // console.log(postId);

  const postComment = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        URL + "/api/v1/comment/create",
        {
          comment: comment,
          author: user.username,
          postId: postId,
          userId: user._id,
        },
        { withCredentials: true }
      );
      if (res?.data) {
        fetchPostComments();
        setComment("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPostComments = async () => {
    try {
      const res = await axios.get(URL + "/api/v1/comment/comments/" + postId);
      setComments(res?.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchPostComments();
  }, [postId]);
  const getPostDetails = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${URL}/api/v1/post/${postId}`);
      if (res?.data) {
        setPostDetails(res.data);
      }
      setLoading(false);
      // console.log(postDetails);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const handleDeletePost = async () => {
    try {
      const res = await axios.delete(`${URL}/api/v1/post/${postId}`);
      if (res?.data) {
        toast.success("Post deleted successfully");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getPostDetails();
  }, [postId]);
  return (
    <div>
      <Navbar />
      {loading ? (
        <Loader />
      ) : (
        <div className="px-8 mt-8 md:px-[200px]">
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
          <p className="mx-auto mt-8">{postDetails.desc}</p>
          <div className="flex items-center mt-8 space-x-4 font-semibold">
            <p>Categories:</p>
            <div className="flex justify-center items-center space-x-2">
              {postDetails.categories?.map((cat) => (
                <div className="bg-gray-300 rounded-lg px-3 py-1" key={cat}>
                  {cat}
                </div>
              ))}

              {/* <div className="bg-gray-300 rounded-lg px-3 py-1">Ai</div> */}
            </div>
          </div>
          <div className="flex flex-col mt-4">
            <h3 className="mt-6 mb-4 font-semibold">Comments:</h3>
            {/* comment */}
            {comments?.map((c) => (
              <Comment key={c._id} c={c} />
            ))}
            {/* <Comment />
            <Comment />
            <Comment /> */}
          </div>
          {/* write a comment  */}
          <div className="flex flex-col mt-4 md:flex-row">
            <input
              type="text"
              onChange={(e) => setComment(e.target.value)}
              value={comment}
              className="md:w-[80%] outline-none px-4 mt-4 md:mt-0 py-2"
              placeholder="Write a comment"
            />
            <button
              onClick={postComment}
              className="bg-black  text-white px-2 py-2 mt-4 md:mt-0 md:w-[20%]"
            >
              Add Comment
            </button>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default PostDetails;
