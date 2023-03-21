import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { ROUTE_NAMES } from '../../routes/RouteNames';

type CredentialType = {
  email: string;
  password: string;
};
const Signin = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState<CredentialType>({
    email: '',
    password: '',
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSignin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post('http://localhost:5000/user/auth', credentials)
      .then((res) => {
        Cookies.set('JWT-TOKEN', res.data.token);
        navigate(ROUTE_NAMES.addRecipe);
      })
      .catch((err) => console.log(err));
  };

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
