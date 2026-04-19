import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8 max-w-7xl">
        {children}
      </main>
      <footer className="bg-white border-t py-4 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} CSESync. All rights reserved.
      </footer>
    </div>
  );
};

export default Layout;
