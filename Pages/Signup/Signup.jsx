import React, { useState } from "react";
import { Button, Form, Input, Col, Row } from "antd";
import "./Signup.css";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import {
  doc,
  auth,
  collection,
  addDoc,
  createUserWithEmailAndPassword,
  db,
  updateDoc,
} from "../../Components/Firebase/Firebase";
import Spinner from 'react-bootstrap/Spinner';

import Swal from "sweetalert2";
const successMsg = () => {
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: "Signup Successfully!..",
    showConfirmButton: false,
    timer: 1500,
  });
};
const errorMsg = () => {
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: "Sign Up Failed",
    showConfirmButton: false,
    timer: 1500,
  });
};

const SignupCal = async (values, form) => {
  let userName = values.username;
  let userEmail = values.Email;
  let userPassword = values.password;

  console.log("form submited Successfully!..");

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      userEmail,
      userPassword
    );
    const user = userCredential.user;

    const docRef = await addDoc(collection(db, "Users"), {
      userName,
      userEmail,
      userPassword,
    });

    const userID = doc(db, "Users", docRef.id);

    await updateDoc(userID, {
      userID: docRef.id,
    });
    localStorage.setItem("latestUser" , JSON.stringify({ id: docRef.id, name: userName}))

    setTimeout(async () => {
      form.resetFields();
      <Navigate to={"/dashboard"} />;
    },3000);

  } catch (error) {
    console.log(error.code);
    console.log(error.message);
    errorMsg()
  }
};

const Signup = () => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    SignupCal(values, form, successMsg());
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Row>
        <h1 className="text-center w-100 signUpHead">Sign Up Here</h1>
        <Col span={24} className="colomn">
          <div className="formContainer">
            <Form
              form={form}
              className="FormClass"
              name="basic"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              style={{
                maxWidth: 600,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Email"
                name="Email"
                rules={[
                  {
                    required: true,
                    message: "Please input your Email!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <div>
                <Form.Item
                  wrapperCol={{
                    offset: 8,
                    span: 16,
                  }}
                >
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="signUpBtn"
                    >
                      Sign Up
                    </Button>
                  
                  
                </Form.Item>

              </div>
              <div className="text-center">
                Already Have An Account?{" "}
                <NavLink className="signUpLink" to="/">
                  <span>Login</span>
                </NavLink>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Signup;
