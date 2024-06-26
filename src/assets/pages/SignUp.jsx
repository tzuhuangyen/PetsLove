import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

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
    try {
      const response = await axios.post(
        `${backendUrl}/api/users/signup`,
        formData
      );
      console.log('Form Data to submit:', formData);
      // console.log('Username:', formData.username);
      console.log('User token created:', response.data);
      showSignUpAlert(formData.username);

      setTimeout(() => {
        navigate('/users/login');
      }, 500);
    } catch (error) {
      if (error.response) {
        console.error('Error signing up:', error.response);
        showSignUpErrorAlert();
      }
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
            {errors.password && <p>Password is required.</p>}
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
            {errors.password && <p>Password is required.</p>}
          </div>
          <button type='submit' value='Sign Up' className='form--submit'>
            Sign Up
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
