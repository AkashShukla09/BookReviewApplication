import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Input, Button, message } from 'antd';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = (values) => {
    setLoading(true);
    axios.post('http://localhost:5001/api/auth/login', values)
      .then(response => {
        setLoading(false);
        const { token } = response.data; 
        if (token) {
          localStorage.setItem('token', token); // Save the token in local storage
          message.success('Login successful!');
          navigate('/books'); // Redirect to the books page
        } else {
          message.error('Login failed! Token not received.');
        }
      })
      .catch(error => {
        setLoading(false);
        message.error('Login failed! Please check your credentials.');
        console.error('Login error:', error);
      });
  };

  return (
    <div style={{ maxWidth: 300, margin: '0 auto', padding: '50px' }}>
      <h2>Login</h2>
      <Form onFinish={onFinish}>
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
            Login
          </Button>
        </Form.Item>
      </Form>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <p>Using for the first time?</p>
        <Button type="link" onClick={() => navigate('/signup')}>
          Signup
        </Button>
      </div>
    </div>
  );
};

export default Login;
