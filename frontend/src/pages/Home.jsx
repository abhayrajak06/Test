import React, { useEffect, useState } from "react";
import HomePosts from "../components/HomePosts";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { URL } from "../url";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [loading, setLoading] = useState(false);

  const getAllPosts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${URL}/api/v1/post/`);
      if (res?.data) {
        setPosts(res.data);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllPosts();
  }, []);
  return (
    <>
      <Navbar
        setPosts={setPosts}
        getAllPosts={getAllPosts}
        setNoResults={setNoResults}
        setLoading={setLoading}
      />

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
    </>
  );
};

export default Home;
