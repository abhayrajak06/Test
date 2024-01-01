import React from "react";

const Footer = () => {
  return (
    <div className="flex gap-5 flex-wrap justify-around bg-black px-8 md:flex-row flex-col space-y-6 md:space-y-0 mt-10  text-sm md:text-md py-8">
      <div
        className="flex flex-col text-white gap-2 py-3"
        style={{ borderBottom: "1px solid orange" }}
      >
        <a href="#">Featured Blogs</a>
        <a href="#">Most Viewed</a>
        <a href="#">Readers Choice</a>
      </div>
      <div
        className="flex flex-col text-white gap-2 py-3"
        style={{ borderBottom: "1px solid orange" }}
      >
        <a href="#">Forum</a>
        <a href="#">Support</a>
        <a href="#">Recent Posts</a>
      </div>
      <div className="flex flex-col text-white gap-2">
        <a href="#">Privacy Policy</a>
        <a href="#">About Us</a>
        <a href="#">Terms of Service</a>
      </div>
    </div>
  );
};

export default Footer;
