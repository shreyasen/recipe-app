import type { FC } from 'react';
import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Layout.scss';
import ThemeButton from '../components/ThemeButton/ThemeButton';
import { ThemeContext } from '../theme/ThemeContext';

type Props = {
  children: React.ReactNode;
};

const Layout: FC<Props> = ({ children }) => {
  const { mode } = useContext(ThemeContext);
  const [pageHeight, setPageHeight] = useState(0);

  useEffect(() => {
    const height = window.innerHeight;
    setPageHeight(height);
  }, []);

  return (
    <BrowserRouter>
      <div
        className={`common-layout ${
          mode.darkMode ? 'dark-theme' : 'light-theme'
        }`}
      >
        <Header />
        {children}
        <Footer />
        <ThemeButton />
      </div>
    </BrowserRouter>
  );
};
export default Layout;
