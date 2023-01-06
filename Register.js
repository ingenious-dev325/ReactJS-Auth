// import avatar from "./profileimg.png";
import React, { useState, useEffect, Component } from "react";
import {
  Link,
  useNavigation,
  NavLink,
  useNavigate,
  Navigate,
} from "react-router-dom";
import axios from "axios";
// import Constants from "../utils/Constants";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Select,
  notification,
  Checkbox,
} from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { routes, apis } from "../../util/constants";
import { Option } from "antd/lib/mentions";
import loginsideimg from "../../assests/img/tracking-png.jpeg";

const prefixSelector = (
  <Form.Item name="prefix" noStyle>
    <Select
      style={{
        width: 80,
      }}
    >
      <Option value="91">+91</Option>
    </Select>
  </Form.Item>
);

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      role: "",
      mobile: "",
      created: false,
    };
  }

  onFinish = (values) => {
    console.log("Success:", values);
  };

  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  onChange = (e) => {
    // console.log("======Event=======", e);
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = () => {
    const url =
      "https://0xi83ut1mc.execute-api.ap-south-1.amazonaws.com/dev/auth/registration";
    axios
      .post(url, {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        role: this.state.role,
        mobile: this.state.mobile,
      })
      .then((response) => {
        const data = response;
        // console.log("Response====>", JSON.parse(response.data.body));
        if (data.status == 200) {
          this.setState({ created: true });
          notification.open({
            message: "Great to have you with us!",
            description: "You have been successfully registered!!",
            onClick: () => {
              console.log("Notification Clicked!");
            },
          });
          // const userData = {
          //   // token: response.data.token,
          //   user: data.body.id,
          //   role: data.body.role,
          // };
          // console.log("UserData====>", userData);
          // localStorage.setItem("userData", JSON.stringify(userData));
        } else {
          alert(data.body);
        }
      })
      .catch((error) => {
        console.log("Error====>", error);
        if (error.response.data.message) {
          alert(error.response.data.message);
        } else {
          alert("Something went wrong!");
        }
      });
  };

  render() {
    return (
      <div className="login-page">
        <div className="login-box">
          <div className="illustration-wrapper">
            <img
              // src="https://mixkit.imgix.net/art/preview/mixkit-left-handed-man-sitting-at-a-table-writing-in-a-notebook-27-original-large.png?q=80&auto=format%2Ccompress&h=700"
              style={{ height: "450px" }}
              src={loginsideimg}
              alt="register"
            />
          </div>
          {this.state.created ? <Navigate to={routes.USER_LOGIN} /> : null}
          <Form
            name="login-form"
            initialValues={{ remember: true }}
            onFinish={this.onFinish}
            onFinishFailed={this.onFinishFailed}
            onSubmit={this.onSubmit}
          >
            <p className="form-title">Welcome back</p>
            <p>Sign Up to the Dashboard</p>
            <Form.Item
              name="name"
              tooltip="What do you want others to call you?"
              rules={[
                {
                  required: true,
                  message: "Please input your Name!",
                  whitespace: true,
                },
              ]}
            >
              <Input
                name="name"
                // prefix={<UserOutlined />}
                // style={{height: "48px"}}
                tooltip="What do you want others to call you?"
                rules={[
                  {
                    required: true,
                    message: "Please input your Name!",
                    whitespace: true,
                  },
                ]}
                placeholder="Name"
                onChange={this.onChange}
              />
            </Form.Item>

            <Form.Item
              name="email"
              tooltip="What do you want others to call you?"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                  whitespace: true,
                },
              ]}
            >
              <Input
                name="email"
                rules={[
                  {
                    type: "email",
                    message: "The input is not valid E-mail!",
                  },
                  {
                    required: true,
                    message: "Please input your E-mail!",
                  },
                ]}
                // prefix={<UserOutlined />}
                placeholder=" Email"
                onChange={this.onChange}
              />
            </Form.Item>

            <Form.Item
              name="first_password"
              placeholder="Enter Password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
              hasFeedback
              value={this.state.password}
              onChange={(e) => this.setState({ password: e.target.value })}
            >
              <Input.Password
                placeholder="Password"
                name="password"
                // prefix={<LockOutlined />}
                type="password"
                onChange={(e) => this.setState({ password: e.target.value })}
              />
            </Form.Item>

            <Form.Item
              name="confirm"
              placeholder="Confirm Password"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The two passwords that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                placeholder="Confirm Password"
                name="confirm"
                // prefix={<LockOutlined />}
                type="password"
              />
            </Form.Item>

            <Form.Item
              name="mobile"
              rules={[
                { required: true, message: "Please input your phone number!" },
              ]}
            >
              <Input
                placeholder="Phone Number"
                name="mobile"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
                ]}
                onChange={this.onChange}
              // addonBefore={prefixSelector}
              />
            </Form.Item>

            <Form.Item
              name="role"
              placeholder="Choose a Role"
              rules={[{ required: true, message: "Please select your role!" }]}
            >
              <Select
                name="role"
                placeholder="Select a Role"
                onSelect={this.state.role}
                onChange={(event) => this.setState({ role: event })}
              >
                <Select.Option value="Admin" disabled>
                  Admin
                </Select.Option>
                <Select.Option value="driver">Driver</Select.Option>
                <Select.Option value="cleaner">Cleaner</Select.Option>
              </Select>
            </Form.Item>

            {/* <Form.Item name="remember" valuePropName="checked">
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item> */}

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                onClick={this.onSubmit}
              >
                Register
              </Button>
            </Form.Item>
            <a>
              Already have an account? &nbsp;
              <NavLink
                // className="auth-link-register"
                to={routes.USER_LOGIN}
              >
                Log in
              </NavLink>
            </a>
          </Form>

        </div>
      </div>
    );
  }
}
export default Register;
