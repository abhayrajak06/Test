import React, { useEffect, useState } from "react";
import HomePosts from "../components/HomePosts";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { URL } from "../url";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const getAllPosts = async () => {
    try {
      const res = await axios.get(`${URL}/api/v1/post/`);
      if (res?.data) {
        setPosts(res.data);
        // console.log(res);
        // console.log(posts);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllPosts();
  }, []);
  return (
    <>
      <Navbar />

      <div className="px-8">
        {posts?.map((p) => (
          <HomePosts key={p._id} post={p} />
        ))}
      </div>
      <Footer />
    </>
  );
};

export default Home;
