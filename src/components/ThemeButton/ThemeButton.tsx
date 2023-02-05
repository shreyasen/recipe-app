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
    <button
      onClick={themeHandler}
      className="theme-switch-button"
      data-testid="theme-switch-button"
    >
      <i
        className={`fa fa-${mode.darkMode ? 'sun' : 'moon'}-o`}
        data-testid="theme-switch-icon"
      ></i>
    </button>
  );
};
export default ThemeButton;
