import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ThemeButton from './ThemeButton';
import { ThemeProvider } from '../../theme/ThemeContext';

describe('Theme button', () => {
  test('should switch theme', async () => {
    render(<ThemeButton />, { wrapper: ThemeProvider });
    const themeSwitchBtn = screen.getByTestId('theme-switch-button');
    expect(themeSwitchBtn).toHaveClass('theme-switch-button');
    const themeSwitchIcon = screen.getByTestId('theme-switch-icon');
    // default light theme
    expect(themeSwitchIcon).toHaveClass('fa fa-moon-o');
    // light to dark theme
    await userEvent.click(themeSwitchBtn);
    expect(themeSwitchIcon).toHaveClass('fa fa-sun-o');
    // dark to light theme
    await userEvent.click(themeSwitchBtn);
    expect(themeSwitchIcon).toHaveClass('fa fa-moon-o');
  });
});
