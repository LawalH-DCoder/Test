'use client';

import { useState } from 'react';
import LoginForm from './LoginForm';
import LoginHeader from './LoginHeader';
import RoleSwitcher from './RoleSwitcher';

type UserRole = 'student' | 'admin';

const Login = () => {
  const [role, setRole] = useState<UserRole>('student');

  return (
    <>
      <LoginHeader />
      <LoginForm />
      <RoleSwitcher role={role} onChange={setRole} />
    </>
  );
};

export default Login;
