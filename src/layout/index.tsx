import type { FC } from 'react';
import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Layout.scss';

type Props = {
  children: React.ReactNode;
};

const Layout: FC<Props> = ({ children }) => {
  const [pageHeight, setPageHeight] = useState(0);

  useEffect(() => {
    const height = window.innerHeight;
    setPageHeight(height);
  }, []);

  return (
    <BrowserRouter>
      <div className="common-layout" style={{ height: pageHeight }}>
        <Header />
        {children}
        <Footer />
      </div>
    </BrowserRouter>
  );
};
export default Layout;
