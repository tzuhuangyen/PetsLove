import axios from 'axios';
import React, { useState, useRef, forwardRef } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom'; // 假設你使用了 React Router
import { FaEye } from 'react-icons/fa';
import { PiEyeClosedBold } from 'react-icons/pi';
import { useAuth } from '../pages/Context/AuthContext';
import { useCart } from './Context/CartContext.jsx';

import {
  showLoginAlert,
  showLoginErrorAlert,
  showLoginUsernameErrorAlert,
} from '../../swal.js';
//Input component
const Input = forwardRef(
  ({ register, errors, id, labelText, type, rules }, ref) => {
    return (
      <div className='mb-4'>
        <label className='form-label' htmlFor={id}>
          {labelText}
        </label>
        <div>
          <input
            id={id}
            type={type}
            {...register(id, rules)}
            ref={ref} // Now using the forwarded ref
            className={`form-control  ${errors[id] && 'is-invalid'}`}
          />
        </div>

        {errors[id] && (
          <div className='invalid-feedback mb-4'>{errors?.[id]?.message}</div>
        )}
      </div>
    );
  }
);

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onTouched' });
  const [passwordVisible, setPasswordVisible] = useState(false); // State for password visibility
  const passwordInputRef = useRef(null);
  const { login, authState } = useAuth();
  const [error, setError] = useState('');
  const { cartItems, setCartItems } = useCart();

  const onSubmit = async (data) => {
    console.log('Submitting form with from data:', data);
    try {
      await login(data); // Wait for the login to complete
      console.log('Login successful data:', data);
      showLoginAlert();
    } catch (error) {
      setError('Login failed, please check your credentials.');
      showLoginErrorAlert();
      console.error(
        'Login failed:',
        error.response ? error.response.data : error.message
      );
    }
  };
  //  toggleVisibility function
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
    passwordInputRef.current.focus(); // 切换后重新聚焦到密码输入框
  };

  return (
    <div
      className='form-container'
      style={{ height: '100vh', backgroundColor: '#faf0fd' }}
    >
      <div className='login-form'>
        <form id='form' onSubmit={handleSubmit(onSubmit)}>
          <h2 className='text-center mb-5'>Log in</h2>
          <div>
            <label htmlFor='username'></label>

            <Input
              onchange={(e) => setUsername(e.target.value)}
              {...register('username')}
              register={register}
              errors={errors}
              id='username'
              labelText='Username:'
              type='text'
              rules={{
                required: {
                  value: true,
                  message: 'Please enter your email',
                },
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'incorrect format',
                },
              }}
            />
            {errors.username && (
              <div className='invalid-feedback'>{errors.username.message}</div>
            )}
          </div>

          <div className='position-relative'>
            <Input
              ref={passwordInputRef}
              type={passwordVisible ? 'text' : 'password'}
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              {...register('password', { required: true })}
              register={register}
              errors={errors}
              id='password'
              labelText='Password:'
              rules={{
                required: {
                  value: true,
                  message: 'Please enter your password',
                },
                minLength: { value: 8, message: 'at least 8 characters' },
                pattern: {
                  value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/,
                  message:
                    'include a capital letter,a lowercase letter,a number',
                },
              }}
            />
            {errors.password && (
              <div className='invalid-feedback'>{errors.password.message}</div>
            )}

            <span
              onClick={togglePasswordVisibility}
              style={{
                position: 'absolute',
                top: '45px',
                right: '40px',
                cursor: 'pointer',
              }}
            >
              {passwordVisible ? <FaEye /> : <PiEyeClosedBold />}
            </span>
          </div>

          <button type='submit' value='Log in' className='form--submit'>
            Log In
          </button>
        </form>

        <p className='para'>
          Don't have an account? <Link to='/users/signup'>Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
export default Login;
