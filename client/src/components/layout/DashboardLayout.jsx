import React from 'react';
import DashboardSidebar from './DashboardSidebar';

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex bg-gray-50 min-h-screen">
      <DashboardSidebar />
      <div className="flex-1 ml-72 flex flex-col pt-8">
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
