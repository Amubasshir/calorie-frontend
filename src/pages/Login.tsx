import React from 'react';
import LoginForm from '../components/auth/LoginForm';

const Login: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <LoginForm />
    </div>
  );
};

export default Login;