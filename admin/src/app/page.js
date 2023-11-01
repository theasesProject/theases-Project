"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import "../styles/login/page.css";
import Head from 'next/head';
import axios from 'axios';
import { Login } from '@/Redux/adminSlice';
import { useSelector, useDispatch } from "react-redux";
export default function LoginPage() {
  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');
  // const [error, setError] = useState(null);
  const [formChecked, setFormChecked] = useState(false);
  const dispatch = useDispatch()
  const router = useRouter();
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
      dispatch(Login(endPoint, checkedIdentifier, form.identifier))
      setError(null);
      router.push('/DashBoard');
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

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const res = await fetch('/api/login', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ username, password }),
  //     });

  //     if (res.status === 200) {
  //       router.push('/dashboard');
  //     } else {
  //       throw new Error(await res.text());
  //     }
  //   } catch (error) {
  //     console.error('An unexpected error happened:', error);
  //     setError(error.message);
  //   }
  // };
  useEffect(() => {
    formValidation()
    const handleKeyUp = (e) => {
      if (e.keyCode === 27 || e.keyCode === 13) {
        closeForm();
      }
    };
    document.addEventListener("keyup", handleKeyUp);
    return () => document.removeEventListener("keyup", handleKeyUp);
  }, []);

  return (
    <div className='Admin_Sign_Up'>
      <Head>
        <link href='https://fonts.googleapis.com/css?family=Raleway:400,500,300' rel='stylesheet' />
      </Head>
      <div id="mainButton" className={isOpen ? 'active' : ''}>

        <div className="btn-text" onClick={openForm}>Sign In</div>
        {isOpen && (
          <div className="modal">
            <div className="close-button" onClick={closeForm}>x</div>
            <div className="form-title">Sign In</div>
            <div className="input-group">
              <input type="text" id="name" onChange={(e) => {
                handleChangeIdentifier(e.target.value)
              }} onBlur={(e) => checkInput(e.target)} />
              <label htmlFor="name">Username</label>
            </div>
            <div className="input-group">
              <input type="password" id="password" onChange={(e) => {
                handleChangePassword(e.target.value)
              }} onBlur={(e) => checkInput(e.target)} />
              <label htmlFor="password">Password</label>
            </div>
            <div className="form-button" style={{ pointerEvents: formChecked ? 'none' : 'auto' }} onClick={handleLogin}>Go</div>
            <div className="codepen-by">PLEASE LEAVE IF YOU ARE NOT AN ADMIN!!</div>
          </div>
        )}
      </div>
      <div className="codepen-by">THIS PAGE IS ONLY FOR OUR ADMINS,LEAVE IF YOU ARE A USER!</div>
    </div>
  );
}
