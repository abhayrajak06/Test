import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ImCross } from "react-icons/im";
import { useParams } from "react-router-dom";
import axios from "axios";
import { URL } from "../url";

const EditPost = () => {
  const [cat, setCat] = useState("");
  const [cats, setCats] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const postId = useParams().id;

  const fetchPost = async () => {
    try {
      const res = await axios.get(URL + "/api/v1/post/" + postId);
      setTitle(res?.data?.title);
      setDesc(res?.data?.desc);
      setFile(res?.data?.photo);
      setCats(res?.data?.categories);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchPost();
  }, [postId]);

  const addCategory = () => {
    let updatedCats = new Set([...cats]);
    if (cat.trim().length > 0) {
      updatedCats.add(cat);
      setCat("");
    }
    setCats([...updatedCats]);
  };
  const deleteCategory = (cat) => {
    let updatedCats = [...cats];
    updatedCats = updatedCats.filter((c) => c !== cat);
    setCats(updatedCats);
  };
  const handleEdit = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <Navbar />
      <div className="px-6 mt-8 md:px-[200px]">
        <h1 className="font-bold text-xl  md:text-2xl">Update post</h1>
        <form
          onSubmit={handleEdit}
          className="w-full flex flex-col space-y-4 md:space-y-8 mt-5"
        >
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            placeholder="Enter post title"
            className="px-4 py-2 outline-none"
          />
          <input type="file" className="px-4 py-2 outline-none" />
          <div className="flex flex-col">
            <div className="flex items-center space-x-4 md:space-x-8">
              <input
                type="text"
                placeholder="Enter post category"
                className="px-4 py-2 outline-none"
                value={cat}
                onChange={(e) => setCat(e.target.value)}
              />
              <div
                onClick={addCategory}
                className="bg-black text-white px-4 py-2 font-semibold cursor-pointer"
              >
                Add
              </div>
            </div>
            {/* categories  */}

            <div className="flex flex-wrap px-4 mt-3">
              {cats?.map((cat) => (
                <div
                  key={cat}
                  className="flex justify-center mb-3 items-center space-x-2 mr-4 bg-gray-200 px-2 py-1 rounded-md"
                >
                  <p>{cat}</p>
                  <p
                    onClick={() => deleteCategory(cat)}
                    className="text-white bg-black rounded-full cursor-pointer p-1 text-sm"
                  >
                    <ImCross />
                  </p>
                </div>
              ))}
            </div>
          </div>
          <textarea
            name=""
            id=""
            onChange={(e) => setDesc(e.target.value)}
            value={desc}
            className="px-4 py-2"
            placeholder="Enter post description"
            cols="30"
            rows="10"
          ></textarea>
          <button className="bg-black w-full md:w-[20%] mx-auto text-white font-semibold px-4 py-2 md:text-xl text-lg">
            Update
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default EditPost;
