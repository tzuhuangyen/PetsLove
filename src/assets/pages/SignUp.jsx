import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Spinner } from 'react-bootstrap';

import { backendUrl } from '../../../config.js';
console.log('Backend URL:', backendUrl);
import { showSignUpAlert, showSignUpErrorAlert } from '../../swal.js';

//Input component
const Input = ({ register, errors, id, labelText, type, rules }) => {
  return (
    <div className='mb-4' style={{ position: 'relative' }}>
      <label className='form-label' htmlFor={id}>
        {labelText}
      </label>
      <input
        id={id}
        type={type}
        {...register(id, rules)}
        className={`form-control ${errors[id] && 'is-invalid'}`}
      />

      {errors[id] && (
        <div className='invalid-feedback mb-4'>{errors?.[id]?.message}</div>
      )}
    </div>
  );
};
//sign up component
const SignUp = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false); // 添加提交狀態

  //通過最小的重新渲染來提高性能
  const {
    handleSubmit,
    register, //要在提交的表單數據中包含該元素的值＝name屬性
    formState: { errors },
    setError,
    watch,
  } = useForm({ mode: 'onTouched' });

  const password = watch('password');

  //取出表單內的資料並送至數據庫
  const handleSignUp = async (formData) => {
    setIsSubmitting(true); // 開始提交，顯示加載狀態

    try {
      console.log('Form Data to submit:', formData);
      const response = await axios.post(
        `${backendUrl}/api/users/signup`,
        formData
      );
      console.log('Signup successful:', response.data);
      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);

        if (response.data.user) {
          localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        await showSignUpAlert(formData.username);
        // 延时跳转到登录页面
        setTimeout(() => {
          navigate('/users/login');
        }, 500);
      } else {
        // 如果後端沒有返回令牌，則顯示成功訊息後導航到登錄頁面
        await showSignUpAlert(formData.username);
        navigate('/users/login');
      }
    } catch (error) {
      console.error('Error signing up:', error);

      if (error.response) {
        const errorMessage =
          error.response.data.message || 'Registration failed';
        // 處理特定錯誤
        if (error.response.status === 400 && errorMessage.includes('exists')) {
          // 如果是電子郵件已存在的錯誤
          setError('username', {
            type: 'manual',
            message: 'This email is already registered',
          });
        }

        showSignUpErrorAlert(errorMessage);
      } else {
        // 處理網絡錯誤或其他未知錯誤
        showSignUpErrorAlert('Network error. Please try again later.');
      }
    } finally {
      setIsSubmitting(false); // 無論成功或失敗，都結束提交狀態
    }
  };

  const onSubmit = (formData) => {
    if (formData.password !== formData.confirmPassword) {
      setError('confirmPassword', {
        type: 'manual',
        message: 'Passwords do not match',
      });
      return;
    }
    console.log(formData);
    handleSignUp(formData);
  };

  return (
    <div
      className='form-container pt-4'
      style={{ height: '100vh', backgroundColor: '#faf0fd' }}
    >
      <div className='signup-form'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className='text-center mb-5'>Sign up</h2>
          <div>
            {' '}
            <Input
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
          <div>
            <Input
              register={register}
              errors={errors}
              id='password'
              labelText='Password:'
              type='text'
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
              <p className='text-danger'>{errors.password.message}</p>
            )}
          </div>
          <div>
            <Input
              register={register}
              errors={errors}
              id='confirmPassword'
              labelText='confirmPassword:'
              type='password'
              rules={{
                required: {
                  value: true,
                  message: 'Please enter your password again',
                },
                minLength: { value: 8, message: 'at least 8 characters' },
                validate: (value) =>
                  value === password || 'Passwords do not match',
                pattern: {
                  value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/,
                  message:
                    'include a capital letter,a lowercase letter,a number',
                },
              }}
            />
            {errors.confirmPassword && (
              <p className='text-danger'>{errors.confirmPassword.message}</p>
            )}
          </div>
          <button
            type='submit'
            value='Sign Up'
            className='form--submit'
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Spinner
                  as='span'
                  animation='border'
                  size='sm'
                  role='status'
                  aria-hidden='true'
                  className='me-2'
                />
                Signing Up...
              </>
            ) : (
              'Sign Up'
            )}
          </button>
        </form>

        <p className='para'>
          Already have an account?
          <Link to='/users/login'>Login Here</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
