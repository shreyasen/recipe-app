import { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Signup.scss';
import axios from 'axios';
import { ROUTE_NAMES } from '../../routes/RouteNames';
import recipe_image from '../../assets/common-background.png';

export const SignupPage = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };
  const handleSignup = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post('http://localhost:5000/user/add', userInfo)
      .then(() => navigate(ROUTE_NAMES.addRecipe))
      .catch((err) => console.log(err));
  };
  return (
    <div className="form-box">
      <div className="form-left">
        <div className="form-header">Create your new account</div>
        <div className="form-header-text">
          Already have an account? <Link to="/signin">Log In</Link>
        </div>
        <form onSubmit={handleSignup}>
          <div>
            <input
              type={'text'}
              placeholder={'First Name'}
              value={userInfo.firstName}
              name={'firstName'}
              onChange={handleInputChange}
              className="input-text"
            />
          </div>
          <div>
            <input
              type={'text'}
              placeholder={'Last Name'}
              value={userInfo.lastName}
              name={'lastName'}
              onChange={handleInputChange}
              className="input-text"
            />
          </div>
          <div>
            <input
              type={'email'}
              placeholder={'Email'}
              value={userInfo.email}
              name={'email'}
              onChange={handleInputChange}
              className="input-text"
            />
          </div>
          <div>
            <input
              type={'password'}
              placeholder={'Password'}
              value={userInfo.password}
              name={'password'}
              onChange={handleInputChange}
              className="input-text"
            />
          </div>
          <div>
            <button className="form-button">Sign Up</button>
          </div>
        </form>
      </div>
      <div className="form-right">
        <img src={recipe_image} alt="recipe_image" />
      </div>
    </div>
  );
};
