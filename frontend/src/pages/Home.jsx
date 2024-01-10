import React, { useEffect, useState } from "react";
import HomePosts from "../components/HomePosts";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { URL } from "../url";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [noResults, setNoResults] = useState(false);
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
      <Navbar
        setPosts={setPosts}
        getAllPosts={getAllPosts}
        setNoResults={setNoResults}
      />

      <div className="px-8 min-h-[76vh]">
        {!noResults ? (
          posts?.map((p) => <HomePosts key={p._id} post={p} />)
        ) : (
          <h3 className="text-center font-bold flex justify-center items-center h-[200px]">
            No Results Found
          </h3>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Home;
