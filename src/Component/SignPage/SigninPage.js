import React, { useState } from 'react';
import { Button, Form, Label, Input } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

export default function SigninPage() {
  const [user, setUser] = useState({ email: "1@1", password: "1" });

  const navigate = useNavigate(); // Move useNavigate to the top level

  const sign_in = async (e) => {
    try {
      // 發送 post 請求到後端 API
      const response = await axios.post('http://localhost:3001/api/sign_in ', user);
      console.log('提交的資料:', user);
      console.log('後端回應:', user);
        localStorage.setItem('user', JSON.stringify(response));
      navigate("/IndexPage");
    } catch (error) {
      console.error('登入使用者時發生錯誤:', error);
    }
  };


  const sign_up = () => {
    navigate('/SignupPage'); // Use the navigate function here
  };

  const handleOnChange = (event) => {
    const { id, value } = event.target;
    setUser(prevUser => ({
      ...prevUser,
      [id]: value
    }));
  };

  const uniKeyCode = (event) => {
    const key = event.keyCode;
    if (key === 13) {
      sign_in();
    }
  };

  return (
    <div className="text-center">
      <Form
        id='form'
        className="form-signin"
        onKeyDown={uniKeyCode}
      >
        <img
          className="mb-4"
          src="./src/images/MTLOGO.png"
          alt=""
          width="150"
          height="150"
        />
        <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
        <Label for="inputEmail" className="sr-only">Email</Label>
        <Input
          type="id"
          id='email'
          className="form-control"
          placeholder="email"
          required
          autoFocus
          onChange={handleOnChange}
        />
        <Label for="inputPassword" className="sr-only">password</Label>
        <Input
          type="password"
          id="password"
          className="form-control"
          placeholder="Password"
          required
          onChange={handleOnChange}
        />
        <div className="checkbox mb-3">
          <Label>
            <Input type="checkbox" value="remember-me" /> Remember me
          </Label>
        </div>
        <Button color='success' onClick={sign_in} outline>Sign In</Button>
        <p className="mt-5 mb-3 text-muted">not yet sign up?</p>
        <Button color='danger' onClick={sign_up} outline>Sign Up</Button>
        <p className="mt-5 mb-3 text-muted">©2025</p>
      </Form>
    </div>
  );
}

