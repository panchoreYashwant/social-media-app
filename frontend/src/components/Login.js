import React from "react";
import {
  Form,
  Input,
  Button,
  Checkbox,
  ConfigProvider,
  Card,
  Flex,
  notification,
} from "antd";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate, useNavigation } from "react-router-dom";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const validatePassword = (_, value) => {
  // Password should contain at least 8 characters, including at least one letter and one number
  // const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  // if (!value || passwordRegex.test(value)) {
  //   return Promise.resolve();
  // }
  // return Promise.reject(
  //   new Error(
  //     "Password must be at least 8 characters long and include at least one letter and one number."
  //   )
  // );
};

const getUserFromToken = (token) => {
  if (!token) return null;

  try {
    const decodedToken = jwtDecode(token);
    return decodedToken;
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};

const Login = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = (values) => {
    axios
      .post("http://localhost:5000/login", values)
      .then((response) => {
        const decodeToken = getUserFromToken(response.data.token);
        sessionStorage.setItem("user", JSON.stringify(decodeToken));
        sessionStorage.setItem("token", response.data.token);
        navigate("/");
      })
      .catch((error) => {
        notification.error({
          message: "Login Failed",
          description: error.response.data,
        });
        console.error("Error logging in", error);
      });
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
            <h2 className="text-3xl font-bold text-white">Welcome Back!</h2>
            <p className="text-gray-400">Login to your account</p>
          </div>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please enter email!",
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
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox className="text-white ">Remember me</Checkbox>
            </Form.Item>

            <a className="text-white text-sm" href="">
              Forgot password?
            </a>
          </Form.Item>

          <Form.Item>
            <Flex justify="space-between">
              <Button
                type="default"
                htmlType="submit"
                className="w-full text-[1.3rem] bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-md py-0  px-4 hover:from-pink-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
              >
                Log in
              </Button>
              <p style={{ cursor: "pointer" }}>
                Not a Member?
                <span
                  style={{ color: "blue" }}
                  onClick={() => navigate("/register")}
                >
                  Signup
                </span>
              </p>
            </Flex>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
