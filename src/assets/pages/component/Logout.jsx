import { backendUrl } from '../../../../config';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ListGroup } from 'react-bootstrap';
import React from 'react';
import { useAuth } from '../Context/AuthContext';

const Logout = () => {
  const { authState, logout } = useAuth();
  console.log('anyone log in:', authState.isAuthenticated);
  //logout from db base
  const handleLogoutAccount = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found, redirecting to login');
      logout();
      return;
    }
    try {
      await axios.post(`${backendUrl}/api/users/member/myProfile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      logout();
      console.log('Logged out successfully');
    } catch (error) {
      console.error('Error logging out', error);
    }
  };

  //logout from local

  return (
    <Link to='#'>
      <ListGroup.Item action onClick={handleLogoutAccount}>
        Log Out
      </ListGroup.Item>
    </Link>
  );
};

export default Logout;
