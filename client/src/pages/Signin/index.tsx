import { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { ROUTE_NAMES } from '../../routes/RouteNames';
import { authenticateUser } from '../../features/authSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

export type CredentialType = {
  email: string;
  password: string;
};
const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const authDetails = useAppSelector((state) => state.authDetails);

  const [credentials, setCredentials] = useState<CredentialType>({
    email: '',
    password: '',
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSignin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(authenticateUser(credentials));
  };

  useEffect(() => {
    if (Cookies.get('JWT-TOKEN')) navigate(ROUTE_NAMES.root);
  }, [navigate]);

  return (
    <div className="form-box">
      <div className="form-header">Login to your ALM account</div>
      <div className="form-header-text">
        Don&apos;t have an ALM account?{' '}
        <Link to="/signup">Create a new account</Link>
      </div>
      <form onSubmit={handleSignin}>
        <div>
          <input
            type={'email'}
            placeholder={'Email'}
            value={credentials.email}
            name={'email'}
            onChange={handleInputChange}
            className="input-text"
          />
        </div>
        <div>
          <input
            type={'password'}
            placeholder={'Password'}
            value={credentials.password}
            name={'password'}
            onChange={handleInputChange}
            className="input-text"
          />
        </div>
        <div>
          <button type="submit" className="form-button">
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};
export default Signin;
