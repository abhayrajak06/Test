import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PostDetails from "./pages/PostDetails";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import Profile from "./pages/Profile";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <BrowserRouter>
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/write" element={<CreatePost />} />
          <Route path="/posts/post/:id" element={<PostDetails />} />
          <Route path="/posts/post/edit/:id" element={<EditPost />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
      <Toaster />
    </>
  );
};

export default App;
