'use client';

import { useState } from 'react';
import LoginForm from './LoginForm';
import LoginHeader from './LoginHeader';
import RoleSwitcher from './RoleSwitcher';



const Login = () => {

  return (
    <>
      <LoginHeader />
      <LoginForm />
    </>
  );
};

export default Login;
