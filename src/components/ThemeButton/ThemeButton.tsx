import { FC, useContext } from 'react';
import { ThemeContext } from '../../theme/ThemeContext';

const ThemeButton: FC = () => {
  const { mode, dispatch } = useContext(ThemeContext);

  const themeHandler = () => {
    if (mode.darkMode) {
      dispatch({ type: 'LIGHTMODE' });
    } else {
      dispatch({ type: 'DARKMODE' });
    }
  };
  return <button onClick={themeHandler}>theme</button>;
};
export default ThemeButton;
