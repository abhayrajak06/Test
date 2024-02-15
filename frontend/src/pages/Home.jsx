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
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const [maxPageIndices] = useState(3);

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

  // Logic to paginate posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total number of pages
  const totalPages = Math.ceil(posts.length / postsPerPage);

  // Generate page indices
  const pageIndices = [];
  const startPage = Math.max(1, currentPage - Math.floor(maxPageIndices / 2));
  const endPage = Math.min(startPage + maxPageIndices - 1, totalPages);

  for (let i = startPage; i <= endPage; i++) {
    pageIndices.push(i);
  }

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
        ) : currentPosts.length === 0 ? (
          <h3 className="text-center font-bold flex justify-center items-center h-[200px]">
            No Posts Available
          </h3>
        ) : (
          currentPosts.map((p) => (
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
      {/* Pagination UI */}
      <div className="flex justify-center items-center mt-4">
        <ul className="flex space-x-4">
          {currentPage >= 2 && (
            <li className="cursor-pointer">
              <button
                onClick={() => {
                  paginate(currentPage - 1);
                  window.scrollTo(0, 0);
                }}
                className="px-3 py-1 rounded bg-gray-200 text-gray-800"
              >
                Previous
              </button>
            </li>
          )}

          {pageIndices.map((page) => (
            <li key={page} className="cursor-pointer">
              <button
                onClick={() => {
                  paginate(page);
                  window.scrollTo(0, 0);
                }}
                className={`px-3 py-1 rounded ${
                  currentPage === page
                    ? "bg-gray-800 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {page}
              </button>
            </li>
          ))}
          {currentPage !== totalPages && (
            <li className="cursor-pointer">
              <button
                onClick={() => {
                  paginate(currentPage + 1);
                  window.scrollTo(0, 0);
                }}
                className="px-3 py-1 rounded bg-gray-200 text-gray-800"
              >
                Next
              </button>
            </li>
          )}
        </ul>
      </div>
      <Footer />
    </>
  );
};

export default Home;
