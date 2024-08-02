// Register.js
import React from "react";
import { Form, Input, Button, Card, Flex, notification } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const Register = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/register",
        values
      );
      navigate("/login");
    } catch (error) {
      const errorMessage =
        error.response?.data?.error ||
        error.message ||
        "An unexpected error occurred";

      notification.error({
        message: "Login Failed",
        description: errorMessage,
      });
      console.error("Error registering user", error);
    }
  };

  return (
    <div
      className="bg-black h-screen flex justify-center items-center sm:p-2"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
      }}
    >
      <Card bordered>
        <Form
          size="large"
          style={{
            width: "30rem",
          }}
          name="normal_login"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white">Sign Up!</h2>
            <p className="text-gray-400">Create new account</p>
          </div>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please enter user name!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="user name"
              className="rounded-md px-4 py-3 w-full bg-gray-600  placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please enter email!",
                type: "email",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="email"
              className="rounded-md px-4 py-3 w-full bg-gray-600  placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please enter your password!",
              },
              // {
              //   validator: validatePassword,
              // },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
              className="rounded-md px-4 py-3 w-full bg-gray-600  placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </Form.Item>

          <Form.Item>
            <Flex justify="space-between">
              <Button
                type="default"
                htmlType="submit"
                className="w-full text-[1.3rem] bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-md py-0  px-4 hover:from-pink-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
              >
                Register
              </Button>
              <p style={{ cursor: "pointer" }}>
                A Member?
                <span
                  style={{ color: "blue" }}
                  onClick={() => navigate("/login")}
                >
                  Login
                </span>
              </p>
            </Flex>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Register;
