import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import "../assets/css/login.css";
// import Head from 'next/head';
import axios from 'axios';
import { Login } from 'Redux/adminSlice';
import { Card, CardHeader, CardBody, Row, Col, Input, Label, FormGroup, Form, Button, Badge } from "reactstrap";
import Select from 'react-select';
import { useDispatch } from "react-redux";
import img00 from "../assets/img/back00.jpg"
export default function LoginPage() {
  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [formChecked, setFormChecked] = useState(false);
  const dispatch = useDispatch()
  // const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({
    identifier: "",
    password: "",
  });
  const formValidation = () => {
    if (!form.identifier || !form.password) {
      setFormChecked(false);
    } else {
      setFormChecked(true);
    }
  };

  const handleChangeIdentifier = (content) => {
    setForm({
      ...form,
      identifier: content.trim(),
    });
  };

  const handleChangePassword = (content) => {
    setForm({
      ...form,
      password: content,
    });
  };

  const identifierValidation = (identifier) => {
    // Regular expression for email
    const emailPattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,7}\b/;

    // Regular expression for phone number (this example assumes a simple format)
    const phonePattern = /^[\d\+\-]+$/;

    if (emailPattern.test(identifier)) {
      return "email";
    } else if (phonePattern.test(identifier)) {
      return "phoneNumber";
    }
  };
  const handleLogin = async () => {
    try {
      let checkedIdentifier = null;
      let endPoint = null;
      if (identifierValidation(form.identifier) === "email") {
        checkedIdentifier = "email";
        endPoint = "emailLogin";
      } else if (identifierValidation(form.identifier) === "phoneNumber") {
        checkedIdentifier = "phoneNumber";
        endPoint = "phoneLogin";
      } else {
        return setError("please provide an email or a phone number");
      }
      console.log(endPoint);
      console.log(endPoint, { checkedIdentifier: checkedIdentifier, password: form.password, identifier: form.identifier });
      dispatch(Login({ endPoint, checkedIdentifier: checkedIdentifier, password: form.password, identifier: form.identifier }));
      setError(null);
      // router.push('/DashBoard');
      // dispatch(fetchUser(response.data));
    } catch (err) {
      console.log(err);
      // if (err.response.status == "404") {
      //   setError("user does not exist");
      // } else if (err.response.status == "401") {
      //   setError("incorrect password");
      // } else {
      console.error(err.message);
      // }
    }
  };

  const openForm = () => {
    setIsOpen(true);
  };

  const closeForm = () => {
    setIsOpen(false);
  };

  const checkInput = (input) => {
    if (input.value.length > 0) {
      input.className = 'active';
    } else {
      input.className = '';
    }
  };
  useEffect(() => {
    formValidation()
  }, []);

  return (
    <>
      <div className="content" >
        <Row >
          <Col className='ctr_02' md="12">
            <img src={img00} alt='no img available' style={{
              position: 'absolute', width: '100%', height: '100%',
              backgroundRepeat: "no-repeat",
              objectFit: "cover"
            }} />
            <Card className='ctr_03' style={{
              backgroundColor: 'rgba(0, 0, 0, 0.3 )',
              width: "45%",
              height: "85vh",
              position: 'relative'
            }}>

              <CardHeader className='header_login_cr'>
              </CardHeader>
              <CardBody className="all-icons">
                <Form style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%"
                  // width: '100%'
                }}>
                  <h1 >
                    Fill the Credentials Below
                  </h1>
                  {/* <Badge> */}
                  {/* </Badge> */}
                  <FormGroup className='input_cr_01'>
                    <Label className='input_title_log' for="email">Your Email Address</Label>
                    <Input className='input_input_log' type="email" name="email" id="email" placeholder="Enter your registered email here" />
                  </FormGroup>
                  <FormGroup className='input_cr_01'>
                    <Label className='input_title_log' for="password">Your Secure Password</Label>
                    <Input className='input_input_log' type="password" name="password" id="password" placeholder="Enter your secure password here" />
                  </FormGroup>
                  <Button color="primary">Login</Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div >
    </>
  );
}
