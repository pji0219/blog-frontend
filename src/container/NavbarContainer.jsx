import React from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../components/navbar/Navbar';

function NavbarContainer() {
  const {isAuthenticated} = useSelector(state => state.auth);
  console.log(isAuthenticated);
  return (
    <>
      <Navbar auth={isAuthenticated} />
    </>
  );
}

export default NavbarContainer;