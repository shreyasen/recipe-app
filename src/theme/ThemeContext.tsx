import { createContext, useReducer, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};
export interface ThemeState {
  darkMode: boolean;
}

export interface ThemeAction {
  type: 'LIGHTMODE' | 'DARKMODE';
}
export const ThemeContext = createContext<{
  mode: ThemeState;
  dispatch: React.Dispatch<ThemeAction>;
}>({
  mode: { darkMode: false },
  dispatch: () => null,
});

const initialState: ThemeState = {
  darkMode: false,
};

const themeReducer = (state: ThemeState, action: ThemeAction): ThemeState => {
  switch (action.type) {
    case 'LIGHTMODE':
      return { darkMode: false };
    case 'DARKMODE':
      return { darkMode: true };
    default:
      return state;
  }
};

export const ThemeProvider = ({ children }: Props) => {
  const [mode, dispatch] = useReducer(themeReducer, initialState);
  return (
    <ThemeContext.Provider value={{ mode, dispatch }}>
      {children}
    </ThemeContext.Provider>
  );
};
