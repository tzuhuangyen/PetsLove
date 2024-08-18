import { backendUrl } from '../../../config.js';
import { AuthContext } from '../pages/Context/AuthContext';
import { CartContext } from '../pages/Context/CartContext';

import axios from 'axios';
// import { jwtDecode } from 'jwt-decode';
import React, {
  useState,
  useRef,
  forwardRef,
  useEffect,
  createContext,
  useContext,
} from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom'; // 假設你使用了 React Router
import { FaEye } from 'react-icons/fa';
import { PiEyeClosedBold } from 'react-icons/pi';
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
  // const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false); // State for password visibility
  const passwordInputRef = useRef(null);
  const { authState } = useContext(AuthContext);
  const UserContext = createContext({});
  const { username, setUsername } = useContext(UserContext);
  const [error, setError] = useState('');
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({ mode: 'onTouched' });

  const { login } = useContext(AuthContext);
  const { cartItems, setCartItems } = useContext(CartContext);
  const [token, setToken] = useState(null);

  // useEffect(() => {
  //   console.log('authState.isAuthenticated:', authState.isAuthenticated);
  //   console.log('cartItems:', cartItems);
  //   console.log('token:', token);
  //   // 1.用户登录后获取服务器上的购物车：

  // }, [authState.isAuthenticated, cartItems, token]);
  const syncUserCartWithServer = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.warn('User not authenticated.');
      return;
    }
    const localCart = JSON.parse(localStorage.getItem('cartItems')) || [];
    console.log('Local cart:', localCart);

    let serverCart = await fetchUserCartFromServer(token);
    console.log('Server cart:', serverCart);

    if (!serverCart) {
      await createServerCart(token, localCart);
      serverCart = await fetchUserCartFromServer(token);
    }

    const mergedCart = mergeCarts(serverCart, localCart);
    console.log('Merged cart:', mergedCart);

    await updateServerCart(token, mergedCart);
    // Update local storage
    localStorage.setItem('cart', JSON.stringify([]));
    setCartItems(mergedCart);
  };

  // 1.用户登录后获取服务器上的购物车：
  const fetchUserCartFromServer = async (token) => {
    try {
      const response = await axios.get(`${backendUrl}/api/users/member/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data; // 返回服务器上的购物车数据
    } catch (error) {
      console.error('Error fetching user cart from server:', error);
      return null; // Return an empty array in case of error
    }
  };
  // 1-2如果用户没有购物车记录，则返回创建一个新的购物车。
  const createServerCart = async (token, cartItems) => {
    try {
      await axios.post(
        `${backendUrl}/api/users/member/cart`,
        { userId: authState.userId, items: cartItems },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log('Server cart created successfully:', response.data);
      return response.data; // 返回创建的新购物车数据
    } catch (error) {
      console.error('Error updating cart on server:', error);
    }
  };
  //合并购物车数据
  const mergeCarts = (serverCart, localCart) => {
    const mergedCart = new Map();
    // 合并服务器购物车
    serverCart.items.forEach((item) => {
      mergedCart.set(item.productId.toString(), item);
    });
    // 合并本地购物车
    localCart.forEach((item) => {
      if (mergedCart.has(item.productId.toString())) {
        const existingItem = mergedCart.get(item.productId.toString());
        existingItem.quantity += item.quantity;
      } else {
        mergedCart.set(item.productId.toString(), { ...item });
      }
    });
    return Array.from(mergedCart.values());
  };
  //更新服务器上的购物车
  const updateServerCart = async (token, cartItems) => {
    try {
      const response = await axios.put(
        `${backendUrl}/api/users/member/cart`,
        { userId: authState.userId, items: cartItems },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log('Server cart updated successfully.', response.data);
    } catch (error) {
      console.error('Error updating server cart:', error);
    }
  };

  const handleLogIn = async (formData) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/users/login`,
        formData
      );
      console.log('Login successful:', response);
      // The server should send back a response containing the token
      const { token, userId } = response.data;
      if (token) {
        await localStorage.setItem('token', token);
        console.log('User logged in &token:', token);
        setToken(token); // 将 token 设置到状态中

        login({ token }); // 登入成功，將令牌儲存至 localStorage，並更新 AuthContext

        // Assuming AuthContext sets userId correctly
        if (authState.userId) {
          await syncUserCartWithServer();
        } else {
          console.error('User ID is null or undefined.');
        }
        // Fetch cart from localStorage
        // After login, sync the user's cart with the server
        await syncUserCartWithServer();
        showLoginAlert(formData.username);
      } else if (!token) {
        console.error('Token is missing from server response.');
        setError('Login failed. Token is missing.');
        showLoginErrorAlert();
      } else if (!userId) {
        console.error('User ID is missing from server response.');
        setError('Login failed. User ID is missing.');
        showLoginErrorAlert();
      } else {
        throw new Error('Login failed. User ID or Token is missing.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      if (error.response) {
        if (error.response.status === 401) {
          setError('Invalid credentials');
          // 在這裡處理登入失敗的情況，例如顯示錯誤訊息
          showLoginErrorAlert();
        } else if (error.response.status === 400) {
          setError('Username not found');
          showLoginUsernameErrorAlert();
        } else {
          // Handle cases where error.response is undefined
          console.error('Error:', error);
          setError('An unexpected error occurred. Please try again later.');
          showLoginErrorAlert();
        }
      }
    }
  };

  const onSubmit = async (data) => {
    console.log('user data:', data);
    await handleLogIn(data); // Wait for the login to complete
  };

  // Simplified toggleVisibility function
  const togglePasswordVisibility = () => {
    setPasswordVisible((visible) => !visible);
    // Safely attempt to focus back on the password input after toggling visibility
    if (passwordInputRef && passwordInputRef.current) {
      passwordInputRef.current.focus();
    }
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
            <label htmlFor='username'>username</label>

            <Input
              value={username}
              onchange={(e) => setUsername(e.target.value)}
              {...register('username', { required: true })}
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
            {errors.username && <p>Username is required.</p>}
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
            {togglePasswordVisibility && (
              <span
                onClick={() => {
                  setPasswordVisible(!passwordVisible);
                  const currentValue = getValues('password');
                  setValue('password', currentValue, { shouldValidate: true }); // Ensure the value is retained
                  passwordInputRef.current.focus();
                }}
                style={{
                  position: 'absolute',
                  top: '45px',
                  right: '40px',
                  transform: 'translateY(-50%)',
                  cursor: 'pointer',
                }}
              >
                {passwordVisible ? <FaEye /> : <PiEyeClosedBold />}
              </span>
            )}
            {errors.password && <p>Password is required.</p>}
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
