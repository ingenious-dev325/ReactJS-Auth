// import avatar from "./profileimg.png";
import React, { useState, useEffect, Component } from "react";
import { Link, Navigate, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
// import Constants from "../utils/Constants";
import { Button, Card, Checkbox, Col, Form, Input, Row } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { routes, apis } from "../../util/constants";
import "./Login.css";
// import loginsideimg from "../../assests/img/driver-login.jpg";
import loginsideimg from "../../assests/img/tracking-png.jpeg";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      logged: false
    };
  }
  onFinish = (values) => {
    console.log("Success:", values);
  };

  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  handleSubmit = () => {
    const url1 =
      "https://0xi83ut1mc.execute-api.ap-south-1.amazonaws.com/dev/auth/login";
    axios
      .post(url1, {
        email: this.state.email,
        password: this.state.password,
      })
      .then((response) => {
        // console.log("response===>", response.data.body );
        // return;
        const data = response.data;
        console.log("Response====>", data);
        if (data.statusCode == 200) {
          const userData = {
            // token: response.data.token,
            user: data.body.id,
            role: data.body.role,
            name: data.body.name,
          };

          this.setState({ logged: true })
          localStorage.setItem("userData", JSON.stringify(userData));
        } else {
          alert(data.message);
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
              src={loginsideimg}
              alt="Login"
              style={{ height: "450px" }}
            />
          </div>
          {this.state.logged ? <Navigate to={routes.ADMIN_DASHBOARD} /> : null}
          <Form
            name="login-form"
            initialValues={{ remember: true }}
            onFinish={this.onFinish}
            onFinishFailed={this.onFinishFailed}
          >
            <p className="form-title">Welcome back</p>
            <p>Login to the Dashboard</p>
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input
                placeholder="Email"
                name="email"
                prefix={<UserOutlined />}
                onChange={(e) => this.setState({ email: e.target.value })}
              // style={{height: "48px"}}
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                placeholder="Password"
                name="password"
                prefix={<LockOutlined />}
                type="password"
                onChange={(e) => this.setState({ password: e.target.value })}
              />
            </Form.Item>
            {/* 
            <Form.Item name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item> */}

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                onClick={this.handleSubmit}
              >
                LOGIN
              </Button>
            </Form.Item>
            <a>
              Need an account? &nbsp;
              <NavLink
                // className="auth-link-register" 
                to={routes.USER_REGISTER}
              >
                Register
              </NavLink>
            </a>
          </Form>
        </div>
      </div>
    );
  }


  // const Login = () => {
  //   const onFinish = values => {
  //     console.log('Success:', values);
  //   };

  //   const onFinishFailed = errorInfo => {
  //     console.log('Failed:', errorInfo);
  //   };

  //   return (
  //     <div className="login-page">
  //       <div className="login-box">
  //         <div className="illustration-wrapper">
  //           <img src="https://mixkit.imgix.net/art/preview/mixkit-left-handed-man-sitting-at-a-table-writing-in-a-notebook-27-original-large.png?q=80&auto=format%2Ccompress&h=700" alt="Login"/>
  //         </div>
  //         <antd.Form
  //           name="login-form"
  //           initialValues={{ remember: true }}
  //           onFinish={onFinish}
  //           onFinishFailed={onFinishFailed}
  //         >
  //           <p className="form-title">Welcome back</p>
  //           <p>Login to the Dashboard</p>
  //           <antd.Form.Item
  //             name="email"
  //             rules={[{ required: true, message: 'Please input your username!' }]}
  //           >
  //             <antd.Input
  //               placeholder="Username"
  //               name="email"
  //                 // prefix={<UserOutlined />}
  //                 onChange={handleChange}
  //             />
  //           </antd.Form.Item>

  //           <antd.Form.Item
  //             name="password"
  //             rules={[{ required: true, message: 'Please input your password!' }]}
  //           >
  //             <antd.Input.Password
  //               placeholder="Password"
  //               name="password"
  //               // prefix={<LockOutlined />}
  //               type="password"
  //               onChange={handleChange}
  //             />
  //           </antd.Form.Item>

  //           <antd.Form.Item name="remember" valuePropName="checked">
  //             <antd.Checkbox>Remember me</antd.Checkbox>
  //           </antd.Form.Item>

  //           <antd.Form.Item>
  //             <antd.Button type="primary" htmlType="submit" className="login-form-button" onClick={handleSubmit}>
  //               LOGIN
  //             </antd.Button>
  //           </antd.Form.Item>
  //         </antd.Form>
  //       </div>
  //     </div>
  //   );
  // };
}
