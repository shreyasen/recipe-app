import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { getUserDetails } from '../../features/userSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

const Common = () => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.authDetails.isLoggenIn);

  useEffect(() => {
    if (Cookies.get('JWT-TOKEN')) {
      dispatch(getUserDetails());
    }
  }, [isLoggedIn]);

  return null;
};
export default Common;
