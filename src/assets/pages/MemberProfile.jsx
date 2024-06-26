import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Col } from 'react-bootstrap';
import { backendUrl } from '../../../config';
import DeleteAccount from '../pages/component/DeleteAccount';
import { showUpdatePswAlert, showUpdatePswErrorAlert } from '../../swal';
//change user's information, delete account, log out,
function MemberProfile() {
  //input oldPsw
  const [oldPassword, setOldPassword] = useState('');
  //input newPsw
  const [newPassword, setNewPassword] = useState('');
  //input confirmPsw
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  // State for new password and confirmPsw error message
  const [newPasswordError, setNewPasswordError] = useState('');
  const [confirmNewPasswordError, setConfirmNewPasswordError] = useState('');
  const [userId, setUserId] = useState(null); // 在组件中定义状态来存储用户ID
  const navigate = useNavigate();
  const [error, setError] = useState('');
  //用于从令牌中解析出用户ID：
  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     try {
  //       const decodedToken = jwtDecode(token);
  //       if (decodedToken && decodedToken.userId) {
  //         setUserId(decodedToken.userId); // 设置用户ID状态
  //         console.log('User ID:', decodedToken.userId); // 记录用户 ID 值
  //       }
  //     } catch (error) {
  //       console.error('Error decoding token:', error);
  //       // Handle token decode error, e.g., by logging out the user or showing an error message}
  //       navigate('/users//login');
  //       setError('Failed to decode token. Please log in again.');
  //     }
  //   }
  // }, [navigate]);

  //newPassword
  const handleNewPasswordChange = (e) => {
    const newPasswordValue = e.target.value;
    setNewPassword(newPasswordValue);
    // Check if the new password is the same as the old password
    if (oldPassword && newPasswordValue === oldPassword) {
      setNewPasswordError(
        'The new password cannot be the same as the old password.'
      );
    } else {
      setNewPasswordError(''); // Clear the error message
    }
    // Check if the confirm password matches the new password as the user types
    // if (confirmNewPassword && confirmNewPassword !== newPasswordValue) {
    //   setConfirmNewPasswordError(
    //     'The new password and confirmation password do not match.'
    //   );
    // } else {
    setConfirmNewPasswordError('');
  };

  //confirmPsw
  const handleConfirmNewPasswordChange = (e) => {
    const confirmPasswordValue = e.target.value;
    setConfirmNewPassword(confirmPasswordValue);

    // Check if the confirm password matches the new password as the user types
    if (newPassword && newPassword !== confirmPasswordValue) {
      setConfirmNewPasswordError(
        'The new password and confirmation password do not match.'
      );
    } else {
      setConfirmNewPasswordError('');
    }
  };
  const handlePasswordUpdate = async (newPassword) => {
    console.log('handlePasswordUpdate called');
    const token = localStorage.getItem('token'); // Retrieve the token
    console.log('Token found:', token);
    if (!token) {
      console.error('Token not found');
      setError('Token not found');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setConfirmNewPasswordError(
        'The new password and confirmation password do not match.'
      );

      setError('Passwords do not match');
      return;
    } else {
      console.log('Passwords match');
      setConfirmNewPasswordError('');
    }

    const updateData = {
      oldPassword: oldPassword,

      newPassword: newPassword,
      confirmNewPassword: confirmNewPassword,
    };
    console.log('updateData:', updateData);

    const response = await axios
      .patch(`${backendUrl}/api/users/member/myProfile/updatePsw`, updateData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Use the token you got from the login
        },
      })
      .then((response) => {
        console.log('PATCH /myProfile/updatePsw endpoint hit');
        console.log('Response:', response);

        const { token } = response.data;
        console.log('User logged in & token:', token);
        localStorage.setItem('token', token);

        if (response && response.data) {
          console.log(response.data);
          showUpdatePswAlert();
          setTimeout(() => {
            navigate('/users/login');
          }, 3000);
        }
      })
      .catch((error) => {
        console.error('Error updating password:', error.response || error);
        setError('Failed to update password');
        showUpdatePswErrorAlert();

        if (error.response) {
          console.log('Error response data:', error.response.data); // Log detailed error response
          console.log('Error response status:', error.response.status);
        } else if (error.request) {
          console.log('Error request data:', error.request);
        } else {
          console.log('Error message:', error.message);
        }
        console.log('Error config:', error.config);
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form submission from reloading the page
    console.log('Form submitted');

    // Check if the new password is the same as the old password
    if (newPassword === oldPassword) {
      setNewPasswordError(
        'The new password cannot be the same as the old password.'
      );
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setConfirmNewPassword(
        'The new password and confirmation password do not match.'
      );
      return; // Stop further execution
    }
    handlePasswordUpdate(newPassword); // Call your function with the new password
  };

  return (
    <>
      <Col md={9}>
        {' '}
        <h2 className=' mb-4'>User Profile</h2>
        <section className='mb-5 mt-5'>
          <div className='p-4' style={{ backgroundColor: '#faf0fd' }}>
            <h3 className=' mb-4'>Change Password</h3>
            <form
              id='form'
              onSubmit={handleSubmit}
              className='display-flex flex-column'
            >
              <div>
                {error && (
                  <div style={{ color: 'red', marginBottom: '10px' }}>
                    {error}
                  </div>
                )}

                <label className='form-label' htmlFor='password'>
                  Enter old password
                </label>
                <input
                  className='form-control'
                  type='password'
                  name='password'
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  required
                />
                <label className='form-label' htmlFor='newPassword'>
                  Enter new password
                </label>
                <input
                  className='form-control'
                  id='newPassword'
                  type='password'
                  value={newPassword} // 将密码与 state 中的 password 变量绑定
                  onChange={handleNewPasswordChange}
                  required
                />
                {newPasswordError && (
                  <div style={{ color: 'red', marginBottom: '10px' }}>
                    {newPasswordError}
                  </div>
                )}
                <label className='form-label' htmlFor='confirmNewPassword'>
                  confirm new password
                </label>
                <input
                  className='form-control'
                  id='confirmNewPassword'
                  type='password'
                  value={confirmNewPassword} // This should be confirmNewPassword, not handleConfirmPasswordChange
                  onChange={handleConfirmNewPasswordChange} // Use the correct handler here
                  required
                />
                {confirmNewPasswordError && (
                  <div style={{ color: 'red', marginBottom: '10px' }}>
                    {confirmNewPasswordError}
                  </div>
                )}
              </div>

              <button className='mt-4 me-4' type='button'>
                CANCEL
              </button>
              <button className='mt-4' type='submit'>
                Update Password
              </button>
            </form>
          </div>
        </section>
        <DeleteAccount />
      </Col>
    </>
  );
}
export default MemberProfile;
