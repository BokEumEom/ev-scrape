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
      <main className="h-screen box-border">   {/* [J]0602 공통간격삭제 */}
        {children}
      </main>
      <FooterBar />
    </div>
  );
};

export default Layout;
