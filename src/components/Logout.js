import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HelperService from '../services/HelperService';
import { useDispatch } from 'react-redux';
import { authActions } from '../store/authReducer';

export default function Logout() {
  const user = HelperService.getCurrentUserData();
  
  let navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(authActions.logout());
      localStorage.removeItem("userData");
      navigate("/");
    }
  }, [dispatch, navigate, user]);

  return null;
}
