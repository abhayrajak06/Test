import React from "react";
import HomePosts from "../components/HomePosts";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <Navbar />

      <div className="px-8">
        <HomePosts />
        <HomePosts />
        <HomePosts />
        <HomePosts />
      </div>
      <Footer />
    </>
  );
};

export default Home;
