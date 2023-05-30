import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import PageView from './containers/PageView';
import MainPage from './pages/MainPage';
import {
  logout,
  setAuthStatus,
  setLogin,
} from './features/authentication/authSlice';
import { isTokenValid } from './utils/checkToken';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthCheck from './utils/authCheck';
import LoginForm from './pages/Login';
import SignUpForm from './pages/SignUp';
import SettingsPage from './pages/SettingsPage';
import ArticlePage from './pages/ArticlePage';
import SubmitArticlePage from './pages/SubmitArticlePage';
import NotFound from './pages/NotFound';
import LogOut from './components/LogOut';
import AdminArticlesPage from './pages/AdminArticlesPage';

function App(): JSX.Element {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const valid = isTokenValid(token);
    if (token && valid.valid) {
      dispatch(setLogin({ user: valid.token, token }));
    } else {
      dispatch(logout());
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
          <Route path="/logout" element={<LogOut />} />

          {/* Authenticated routes */}
          <Route path="/user/*" element={<AuthCheck />}>
            <Route path="main" element={<MainPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="articles" element={<ArticlePage />} />
            <Route path="article-submission" element={<SubmitArticlePage />} />
          </Route>
          <Route path="/admin/*" element={<AuthCheck />}>
            <Route path="main" element={<AdminArticlesPage />} />
          </Route>

          {/* Redirect unauthenticated users to the login page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </PageView>
  );
}
export default App;
