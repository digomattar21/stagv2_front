import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import PageView from './containers/PageView';
import MainPage from './pages/MainPage';
import { setAuthStatus } from './features/authentication/authSlice';
import { isTokenValid } from './utils/checkToken';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthCheck from './utils/authCheck';
import LoginForm from './pages/Login';
import SignUpForm from './pages/SignUp';

function App(): JSX.Element {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (isTokenValid(token)) {
      dispatch(setAuthStatus(true));
    } else {
      dispatch(setAuthStatus(false));
    }
  }, [dispatch]);

  return (
    <PageView>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/user" element={<AuthCheck />}>
            <Route path="/user/main" element={<MainPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </PageView>
  );
}

export default App;
