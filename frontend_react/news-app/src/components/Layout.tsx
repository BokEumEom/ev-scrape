// src/components/Layout.tsx
import React from 'react';
import NavigationBar from './NavigationBar';
import FooterBar from './FooterBar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavigationBar />
      <main className="flex-grow pt-16 pb-16"> {/* Adjusted padding to accommodate fixed NavigationBar and FooterBar */}
        {children}
      </main>
      <FooterBar />
    </div>
  );
};

export default Layout;
