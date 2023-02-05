import { useContext } from 'react';
import { ThemeContext } from '../../theme/ThemeContext';
import './ThemeButton.scss';

const ThemeButton = () => {
  const { mode, dispatch } = useContext(ThemeContext);

  const themeHandler = () => {
    if (mode.darkMode) {
      dispatch({ type: 'LIGHTMODE' });
    } else {
      dispatch({ type: 'DARKMODE' });
    }
  };
  return (
    <div onClick={themeHandler} className="theme-switch-button">
      <i className={`fa fa-${mode.darkMode ? 'sun' : 'moon'}-o`}></i>
    </div>
  );
};
export default ThemeButton;
