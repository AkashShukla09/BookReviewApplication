import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Input, Button, message } from 'antd';

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = (values) => {
    const { name, email, password } = values;

    // Client-side validation: Check if password length is less than 6 characters
    if (password.length < 6) {
      message.error('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);
    axios.post('http://localhost:5001/api/auth/signup', { name, email, password })
      .then(response => {
        setLoading(false);
        message.success('Signup successful! Please login.');
        navigate('/login'); // Redirect to the login page after successful signup
      })
      .catch(error => {
        setLoading(false);
        message.error('Signup failed! Please try again.');
        console.error('Signup error:', error);
      });
  };

  return (
    <div style={{ maxWidth: 300, margin: '0 auto', padding: '50px' }}>
      <h2>Signup</h2>
      <Form onFinish={onFinish}>
        <Form.Item
          name="name"
          rules={[{ required: true, message: 'Please input your name!' }]}
        >
          <Input placeholder="Name" />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Signup
          </Button>
        </Form.Item>
      </Form>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <p>Already have an account?</p>
        <Button type="link" onClick={() => navigate('/login')}>
          Login
        </Button>
      </div>
    </div>
  );
};

export default Signup;
