import { useAppDispatch } from '../../app/hooks';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { logout } from '../../features/authentication/authSlice';

const LogOut = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleNavigation = (route: string) => {
    dispatch({ type: 'NAVIGATE_TO', payload: route });
    navigate(route, { replace: true });
  };

  //Maybe api calls here to get logs

  useEffect(() => {
    dispatch(logout());
    handleNavigation('/');
  }, []);

  return <></>;
};

export default LogOut;
