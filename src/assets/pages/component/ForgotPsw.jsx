import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { backendUrl } from '../../../../config';

const ForgotPsw = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const response = await axios.post(`${backendUrl}/api/users/forgotPsw`, {
        email,
      });
      setMessage(response.data.message);
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <div
      className='forgot-password-container'
      style={{ width: '400px', margin: 'auto', padding: '20px' }}
    >
      <Form onSubmit={handleSubmit}>
        <h3 className='mb-3'>Forgot Password?</h3>
        <Form.Group controlId='formBasicEmail'>
          <Form.Label>Email:</Form.Label>
          <Form.Control
            className='mb-3'
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Form.Text className='text-muted'>
            We'll send a link to reset your password.
          </Form.Text>
        </Form.Group>

        <Button variant='primary' type='submit' className='mt-2'>
          Send Reset Link
        </Button>
      </Form>
      {message && <Alert variant='success'>{message}</Alert>}
      {error && <Alert variant='danger'>{error}</Alert>}
    </div>
  );
};

export default ForgotPsw;
