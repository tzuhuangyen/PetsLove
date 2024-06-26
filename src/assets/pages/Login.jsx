import { backendUrl } from '../../../config.js';
import { AuthContext } from '../pages/Context/AuthContext';
import { CartContext } from '../pages/Context/CartContext';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import React, {
  useState,
  useRef,
  forwardRef,
  createContext,
  useContext,
  useEffect,
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
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false); // State for password visibility
  const passwordInputRef = useRef(null);
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState('');
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({ mode: 'onTouched' });

  const { login } = useContext(AuthContext);
  const { setCart } = useContext(CartContext);
  const [token, setToken] = useState(localStorage.getItem('token'));

  // This function fetches the user's cart from the server using the token
  const fetchUserCartFromServer = async (token) => {
    try {
      const response = await axios.get(`${backendUrl}/api/users/member/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Assuming the server responds with the cart items in the body
      return response.data.cart; // Adjust this according to the actual response structure
    } catch (error) {
      console.error('Error fetching user cart from server:', error);
      return []; // Return an empty array in case of error
    }
  };
  // This function updates the server with the merged cart
  const updateServerCart = async (token, mergedCart) => {
    // Implement this function based on how your server expects to receive the updated cart
    // This is a placeholder showing a generic implementation
    try {
      await axios.post(
        `${backendUrl}/api/users/member/updateCart`,
        mergedCart,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } catch (error) {
      console.error('Error updating cart on server:', error);
    }
  };
  // Simplified merge function (you'll need to implement actual merging logic based on your needs)
  const mergeCarts = (localCart, userCartFromServer) => {
    // Placeholder for merge logic. You need to implement this based on your application's requirements.
    return [...localCart, ...userCartFromServer]; // Simple example, might lead to duplicates
  };

  const handleLogIn = async (formData) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/users/login`,
        formData
      );
      console.log('Login successful:', response);
      // The server should send back a response containing the token
      const { token } = response.data;
      if (token) {
        localStorage.setItem('token', token);
        console.log('User logged in & token:', token);
        login({ token }); // 登入成功，將令牌儲存至 localStorage，並更新 AuthContext

        // After login, fetch the user's cart items from the server
        const userCartFromServer = await fetchUserCartFromServer(userData);

        // Fetch cart from localStorage
        const localCart = JSON.parse(localStorage.getItem('cart')) || [];
        // Merge the carts
        const mergedCart = mergeCarts(localCart, userCartFromServer);

        // Update the server with the merged cart (if necessary)
        await updateServerCart(token, mergedCart);

        setCart(mergedCart);
        // Clear localStorage cart as it's now merged
        localStorage.setItem('cart', JSON.stringify([]));

        showLoginAlert(formData.username);
        setTimeout(() => {
          console.log('Redirecting to user profile page...');
          navigate('/users/member/myProfile');
        }, 3000);
      }
    } catch (error) {
      console.error('Error Error up:', error);
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
            <Input
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
