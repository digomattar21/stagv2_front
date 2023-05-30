// components/LoginForm.tsx
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser, setLogin } from '../../features/authentication/authSlice';
import { AppDispatch, RootState } from '../../app/store';
import { unwrapResult } from '@reduxjs/toolkit';
import Spinner from '../../components/Spinner';
import { useAppSelector } from '../../app/hooks';
import { useNavigate } from 'react-router-dom';

const LoginForm: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { loading } = useAppSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<null | string>(null);
  const isAuthenticated = useAppSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const resultAction = await dispatch(loginUser({ email, password }));
      const response = unwrapResult(resultAction);
      dispatch(setLogin(response));
      console.log(response);
      navigate(response?.user?.admin ? '/admin/main' : '/user/main');
    } catch (err: any) {
      setError(
        err.message || 'An error occurred while logging in. Please try again.'
      );
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/user/main');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-gray-200 rounded-lg p-8 shadow-xl">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm mb-4">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
            alt="Your Company"
            onClick={() => navigate('/')}
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <div className="w-full p-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-semibold text-gray-900"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 text-gray-900 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-semibold text-gray-900"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-3 py-2 text-gray-900 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 text-sm font-semibold text-gray-200 bg-indigo-600 rounded-md hover:bg-indigo-500 text-center flex justify-center"
            >
              {loading ? <Spinner color={'fill-white'} /> : 'Log In'}
            </button>
          </form>
          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{' '}
            <a
              onClick={() => navigate('/signup')}
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Sign Up
            </a>
          </p>
          {error && (
            <p
              className="text-sm text-red-500 mt-2 text-center"
              style={{ minHeight: '1rem' }}
            >
              {error}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
