import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import CreatePost from "./components/CreatePost";
import PostFeed from "./components/PostFeed";
import UserProfile from "./components/UserProfile";
import { ConfigProvider } from "antd";

const App = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "linear-gradient(135deg, #FF1493, #800080)",
        },
        components: {
          Button: {
            colorPrimary: "linear-gradient(135deg, #FF1493, #800080)",
          },

          Form: {
            colorPrimary: "linear-gradient(135deg, #FF1493, #800080)",
          },
        },
      }}
    >
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/" element={<PostFeed />} />
          <Route path="/user/:userId" element={<UserProfile />} />
        </Routes>
      </Router>
    </ConfigProvider>
  );
};

export default App;
