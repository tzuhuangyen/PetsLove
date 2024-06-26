import { backendUrl } from '../../../../config';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ListGroup } from 'react-bootstrap';
import React from 'react';
import { useAuth } from '../Context/AuthContext';

const Logout = () => {
  const navigate = useNavigate();
  const { authState, setAuthState } = useAuth();
  console.log('anyone log in:', authState.isAuthenticated);
  //logout from db base
  const handleLogoutAccount = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found, redirecting to login');
      logoutUser();
      return;
    }
    try {
      await axios.post(`${backendUrl}/api/users/member/myProfile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      logoutUser();
      console.log('Logged out successfully');
    } catch (error) {
      console.error('Error logging out', error);
    }
  };

  //logout from local
  function logoutUser() {
    setAuthState({ ...authState, isAuthenticated: false });
    console.log('user log out:', authState.isAuthenticated);
    localStorage.removeItem('token'); // Remove the token from local storage
    navigate('/users/login');
  }
  return (
    <Link to='#'>
      <ListGroup.Item action onClick={handleLogoutAccount}>
        Log Out
      </ListGroup.Item>
    </Link>
  );
};

export default Logout;
