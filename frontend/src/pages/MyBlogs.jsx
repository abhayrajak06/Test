import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { URL } from "../url";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import HomePosts from "../components/HomePosts";
import { useAuth } from "../context/UserContext";

const MyBlogs = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [user] = useAuth();
  useEffect(() => {
    if (user && user._id) {
      getMyPosts(user?._id);
    }
  }, []);

  const getMyPosts = async (userId) => {
    try {
      setLoading(true);
      const res = await axios.get(`${URL}/api/v1/post/user/${userId}`, {
        headers: {
          Authorization: user?.token,
        },
      });
      if (res?.data) {
        setPosts(res?.data);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="px-8 min-h-[76vh]">
        {loading ? (
          <Loader />
        ) : posts.length === 0 ? (
          <h3 className="text-center font-bold flex justify-center items-center h-[200px]">
            No Posts Available
          </h3>
        ) : (
          posts.map((p) => (
            <Link
              onClick={() => window.scrollTo(0, 0)}
              to={`/posts/post/${p._id}`}
              key={p._id}
            >
              <HomePosts post={p} />
            </Link>
          ))
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MyBlogs;
