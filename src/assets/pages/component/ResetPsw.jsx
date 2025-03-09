import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { backendUrl } from '../../../../config.js';

const ResetPsw = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const { token } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const response = await axios.post(
        `${backendUrl}/api/users/resetPsw/${token}`,
        {
          password,
        }
      );
      setMessage(response.data.message);
      // Optionally redirect the user to the login page after successful reset
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <div
      className='reset-password-container'
      style={{ width: '400px', margin: 'auto', padding: '20px' }}
    >
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId='formBasicPassword'>
          <Form.Label>New Password</Form.Label>
          <Form.Control
            className='mb-3'
            type='password'
            placeholder='New Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId='formBasicConfirmPassword'>
          <Form.Label>Confirm New Password</Form.Label>
          <Form.Control
            className='mb-3'
            type='password'
            placeholder='Confirm New Password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant='primary' type='submit'>
          Reset Password
        </Button>
      </Form>
      {message && <Alert variant='success'>{message}</Alert>}
      {error && <Alert variant='danger'>{error}</Alert>}
    </div>
  );
};

export default ResetPsw;
