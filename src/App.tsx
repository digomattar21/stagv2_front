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
import SettingsPage from './pages/SettingsPage';
import ArticlePage from './pages/ArticlePage';

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
          <Route path="/articles" element={<ArticlePage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/user" element={<AuthCheck />}>
            <Route path="/user/main" element={<MainPage />} />
            <Route path="/user/settings" element={<SettingsPage />} />
            <Route path="/user/articles" element={<ArticlePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </PageView>
  );
}

export default App;
