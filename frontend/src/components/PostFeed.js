import React, { useState, useEffect } from "react";
import { List, Button, Avatar, Card, Pagination, Flex } from "antd";
import { HeartOutlined, HeartFilled, UserOutlined } from "@ant-design/icons";

import axios from "axios";
import { Header, Content } from "antd/es/layout/layout";
import { useNavigate } from "react-router-dom";
import CreatePost from "./CreatePost";

const { Meta } = Card;

const PostFeed = () => {
  const [posts, setPosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const user = JSON.parse(sessionStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/login");
    fetchPosts(currentPage);
  }, [currentPage]);

  const fetchPosts = (page = currentPage) => {
    const token = sessionStorage.getItem("token");
    axios
      .get(`http://localhost:5000/posts?page=${page}&limit=10`, {
        headers: { Authorization: token },
      })
      .then((response) => {
        setPosts(response.data.posts);
        setTotalPosts(response.data.totalCount);
      })
      .catch((error) => {
        console.error("Error fetching posts", error);
      });
  };

  const handleLike = (postId) => {
    const token = sessionStorage.getItem("token");
    axios
      .post(
        `http://localhost:5000/posts/${postId}/like`,
        { user: user.id },
        { headers: { Authorization: token } }
      )
      .then((response) => {
        fetchPosts(currentPage);
      })
      .catch((error) => {
        console.error("Error liking post", error);
      });
  };

  const handleFollow = (userId) => {
    const token = sessionStorage.getItem("token");
    axios
      .post(
        `http://localhost:5000/users/${userId}/follow`,
        { user: user.id },
        { headers: { Authorization: token } }
      )
      .then((response) => {
        fetchPosts(currentPage);

        console.log("User followed", response.data);
      })
      .catch((error) => {
        console.error("Error following user", error);
      });
  };

  return (
    <>
      <Header
        className="flex items-center justify-between"
        style={{
          paddingTop: 20,
          // background: colorBgContainer,
        }}
      >
        <Flex justify="end" gap={20} align="center">
          <Button
            onClick={() => setIsModalOpen(true)}
            className="text-[1.3rem] me-10 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-md py-0  px-4 hover:from-pink-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
            size="large"
            // icon={<ForwardFilled />}
            type="primary"
          >
            Create Post
          </Button>
          <Button
            onClick={() => {
              navigate("/login");
              sessionStorage.removeItem("user");
              sessionStorage.removeItem("token");
            }}
            className="text-[1.3rem] me-10 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-md py-0  px-4 hover:from-pink-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
            size="large"
            // icon={<ForwardFilled />}
            type="primary"
          >
            Log Out
          </Button>
          <Card size="small" type="default">
            <UserOutlined /> |{user?.username}
          </Card>
        </Flex>
      </Header>
      <Content>
        <Flex justify="center">
          <div>
            <List
              style={{ overflowY: "auto", height: "83vh", marginBottom: 10 }}
              size="small"
              dataSource={posts}
              renderItem={(post) => (
                <List.Item>
                  <Card
                    hoverable
                    bordered
                    size="small"
                    style={{
                      width: "600px",
                      padding: 5,
                    }}
                    cover={
                      <img
                        height={"150px"}
                        alt="example"
                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                      />
                    }
                    actions={[
                      <span>
                        {post.likes.includes(user.id) ? (
                          <HeartFilled
                            size={"24px"}
                            style={{ color: "red" }}
                            onClick={() => handleLike(post._id)}
                          />
                        ) : (
                          <HeartOutlined onClick={() => handleLike(post._id)} />
                        )}
                        {" " + post.likes.length + " Likes"}
                      </span>,
                      <Button
                        type={
                          post.user.followers.includes(user.id)
                            ? "primary"
                            : "default"
                        }
                        onClick={() => handleFollow(post.user_id)}
                      >
                        {post.user.followers.includes(user.id)
                          ? "Following"
                          : "Follow"}
                      </Button>,
                    ]}
                  >
                    <Meta
                      avatar={
                        <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />
                      }
                      title={post.user.username}
                      description={post.content}
                    />
                  </Card>
                </List.Item>
              )}
            />
            <Pagination
              current={currentPage}
              total={totalPosts}
              pageSize={10}
              onChange={(page) => setCurrentPage(page)}
            />
          </div>
        </Flex>

        <CreatePost
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          fetchPosts={fetchPosts}
        />
      </Content>
    </>
  );
};

export default PostFeed;
