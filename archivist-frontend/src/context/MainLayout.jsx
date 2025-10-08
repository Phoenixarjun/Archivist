import React from 'react';

const MainLayout = ({ children }) => {
  return (
    <div>
      {/* Navbar and Sidebar will go here */}
      <main>{children}</main>
    </div>
  );
};

export default MainLayout;