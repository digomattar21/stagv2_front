// AuthCheck.tsx
import React, { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { RootState } from '../app/store';
import { useAppSelector } from '../app/hooks';

const AuthCheck: React.FC = () => {
  const isAuthenticated = useAppSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? <Outlet /> : null;
};

export default AuthCheck;
