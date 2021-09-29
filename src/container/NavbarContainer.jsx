import React from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../components/navbar/Navbar';
import { useDispatch } from 'react-redux';
import { logout } from '../redux-module/auth';

function NavbarContainer() {
  const {isAuthenticated} = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const userLogout = () => dispatch(logout());
  
  return (
    <>
      <Navbar auth={isAuthenticated} userLogout={userLogout} />
    </>
  );
}

export default NavbarContainer;