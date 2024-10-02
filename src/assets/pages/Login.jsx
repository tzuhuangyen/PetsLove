import axios from 'axios';
import React, {
  useState,
  useRef,
  forwardRef,
  useEffect,
  useContext,
} from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom'; // 假設你使用了 React Router
import { FaEye } from 'react-icons/fa';
import { PiEyeClosedBold } from 'react-icons/pi';
import { useAuth } from '../pages/Context/AuthContext';
import { useCart } from '../pages/Context/CartContext';

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

  // useEffect(() => {
  //   console.log('authState.isAuthenticated:', authState.isAuthenticated);
  //   console.log('cartItems:', cartItems);
  //   console.log('token:', token);
  //   // 1.用户登录后获取服务器上的购物车：

  // }, [authState.isAuthenticated, cartItems, token]);
  // const syncUserCartWithServer = async () => {
  //   const token = localStorage.getItem('token');
  //   if (!token) {
  //     console.warn('User not authenticated.');
  //     return;
  //   }
  //   const localCart = JSON.parse(localStorage.getItem('cartItems')) || [];
  //   console.log('Local cart:', localCart);
  //   let serverCart = await fetchUserCartFromServer(token);
  //   console.log('Server cart:', serverCart);

  //   if (!serverCart) {
  //     await createServerCart(token, localCart);
  //     serverCart = await fetchUserCartFromServer(token);
  //   }

  //   const mergedCart = mergeCarts(serverCart, localCart);
  //   await updateServerCart(token, mergedCart);
  //   setCartItems(mergedCart);
  //   console.log('Merged cart:', mergedCart);
  // };

  // 1.用户登录后获取服务器上的购物车：
  // const fetchUserCartFromServer = async (token) => {
  //   try {
  //     const response = await axios.get(`${backendUrl}/api/users/member/cart`, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     return response.data; // 返回服务器上的购物车数据
  //   } catch (error) {
  //     console.error('Error fetching user cart from server:', error);
  //     return null; // Return an empty array in case of error
  //   }
  // };
  // 1-2如果用户没有购物车记录，则返回创建一个新的购物车。
  // const createServerCart = async (token, cartItems) => {
  //   try {
  //     const response = await axios.post(
  //       `${backendUrl}/api/users/member/cart`,
  //       { userId: authState.userId, items: cartItems },
  //       {
  //         headers: { Authorization: `Bearer ${token}` },
  //       }
  //     );
  //     return response.data; // 返回创建的新购物车数据
  //     console.log('Server cart created successfully:', response.data);
  //   } catch (error) {
  //     console.error('Error updating cart on server:', error);
  //   }
  // };

  const onSubmit = async (data) => {
    console.log('Submitting form with from data:', data);
    try {
      await login(data); // Wait for the login to complete
      console.log('Login successful data:', data);
    } catch (error) {
      setError('Login failed, please check your credentials.');
      console.error(
        'Login failed:',
        error.response ? error.response.data : error.message
      );
    }
  };
  // Simplified toggleVisibility function
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
