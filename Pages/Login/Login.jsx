import "./Login.css";
import React from "react";
import { Button, Form, Input, Col, Row } from "antd";
import { NavLink } from "react-router-dom";
import {
  initializeApp,
  app,
  auth,
  collection,
  addDoc,
  db,
  signInWithEmailAndPassword,
  getDocs
} from "../../Components/Firebase/Firebase";
import Swal from 'sweetalert2'
const successMsg = () => {

  Swal.fire({
    position: "top-end",
    icon: "success",
    title: "Login Successfully!..",
    showConfirmButton: false,
    timer: 1500,
  });

};
const errorMsg = () => {

  Swal.fire({
    position: "top-end",
    icon: "error",
    title: "Login Failed!..",
    showConfirmButton: false,
    timer: 1500,
  });

};



const loginFunctionality = async (values , form) => {
  let userEmail = values.Email;
  let userPassword = values.password;
try{
  const userCredential = await signInWithEmailAndPassword(auth, userEmail, userPassword)
  const PostsQuerySnapshot = await getDocs(collection(db, "Users"));
  PostsQuerySnapshot.forEach((val) => {
    if (val.data().userEmail === userEmail){
      console.log("LatestUserID ->", val.data().userID);
      localStorage.setItem("latestUser", JSON.stringify({ id: val.data().userID, name: val.data().userName }));

    } 
  });
 
  const user = userCredential.user;

  setTimeout(async () => {
    form.resetFields();
    successMsg()
    }, 1000);
  
}

catch(error){
  console.log(error.code);
  console.log(error.message);
  errorMsg();
}
}

const Login = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    loginFunctionality(values , form)
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Row>
        <h1 className="w-100 text-center loginHead">Login Here</h1>
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
                className="margin-0"
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button type="primary" htmlType="submit" className="loginBtn">
                  Login
                </Button>
              </Form.Item>
            </div>

            <div className="text-center">
              Create another Account? <NavLink className="signUpLink" to = '/Signup'><span >Sign Up</span></NavLink> 
            </div>
          </Form>
          </div>
          
        </Col>
      </Row>
    </>
  );
};

export default Login;
