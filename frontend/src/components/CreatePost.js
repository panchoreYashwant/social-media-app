// CreatePost.js
import React from "react";
import { Form, Input, Button, Modal } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreatePost = ({ isModalOpen, setIsModalOpen, fetchPosts }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = (values) => {
    const token = sessionStorage.getItem("token");
    axios
      .post("http://localhost:5000/posts", values, {
        headers: { Authorization: token },
      })
      .then((response) => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Error creating post", error);
      });
    setIsModalOpen(false);
    fetchPosts();
    form.resetFields();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal
      title="New Post"
      open={isModalOpen}
      onOk={form.submit}
      onCancel={handleCancel}
      okText="Create Post"
    >
      <Form form={form} onFinish={onFinish}>
        <Form.Item
          name="content"
          rules={[
            { required: true, message: "Please input your post content!" },
          ]}
        >
          <Input.TextArea placeholder="What's on your mind?" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreatePost;
