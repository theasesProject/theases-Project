"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import "../../styles/login/page.css";
import Head from 'next/head';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyUp = (e) => {
      if (e.keyCode === 27 || e.keyCode === 13) {
        closeForm();
      }
    };
    document.addEventListener("keyup", handleKeyUp);
    return () => document.removeEventListener("keyup", handleKeyUp);
  }, []);

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

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (res.status === 200) {
        router.push('/dashboard');
      } else {
        throw new Error(await res.text());
      }
    } catch (error) {
      console.error('An unexpected error happened:', error);
      setError(error.message);
    }
  };

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
              <input type="text" id="name" onBlur={(e) => checkInput(e.target)} />
              <label htmlFor="name">Username</label>
            </div>
            <div className="input-group">
              <input type="password" id="password" onBlur={(e) => checkInput(e.target)} />
              <label htmlFor="password">Password</label>
            </div>
            <div className="form-button" onClick={handleLogin}>Go</div>
            <div className="codepen-by">PLEASE LEAVE IF YOU ARE NOT AN ADMIN!!</div>
          </div>
        )}
      </div>
      <div className="codepen-by">THIS PAGE IS ONLY FOR OUR ADMINS,LEAVE IF YOU ARE A USER!</div>
    </div>
  );
}
