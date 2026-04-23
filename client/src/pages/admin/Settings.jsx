import React, { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { useAuth } from '../../context/AuthContext';

const Settings = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Admin Profile', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
    { id: 'security', label: 'Security & Auth', icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' },
    { id: 'system', label: 'System Preferences', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
  ];

  return (
    <DashboardLayout>
      <div className="flex flex-col lg:flex-row gap-12 max-w-6xl">
         {/* Sidebar Tabs */}
         <div className="lg:w-72 flex flex-col gap-2">
            {tabs.map(tab => (
               <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-sm transition-all ${
                  activeTab === tab.id 
                    ? 'bg-white text-blue-600 shadow-xl shadow-gray-200 border border-gray-100' 
                    : 'text-gray-400 hover:text-gray-600'
                }`}
               >
                  <svg className={`h-5 w-5 ${activeTab === tab.id ? 'text-blue-600' : 'text-gray-300'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
                  </svg>
                  {tab.label}
               </button>
            ))}
         </div>

         {/* Content Area */}
         <div className="flex-1 bg-white rounded-[40px] shadow-sm border border-gray-100 p-12">
            {activeTab === 'profile' && (
               <div className="space-y-10 animate-in fade-in duration-500">
                  <div>
                     <h2 className="text-2xl font-black text-gray-900 mb-2">Account Information</h2>
                     <p className="text-gray-400 font-medium">Manage your personal admin profile credentials.</p>
                  </div>

                  <div className="flex items-center gap-8 p-8 bg-gray-50 rounded-[32px] border border-gray-100 italic">
                     <div className="h-20 w-20 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white text-3xl font-black shadow-xl shadow-blue-500/20">
                        {user?.name?.[0]}
                     </div>
                     <div>
                        <button className="bg-blue-600 text-white font-black text-[10px] px-4 py-2 rounded-xl uppercase tracking-widest mb-2 shadow-lg shadow-blue-500/20">Change Avatar</button>
                        <p className="text-xs text-gray-400 font-medium">JPG or PNG. Max size 2MB.</p>
                     </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-4">Full Legal Name</label>
                        <input type="text" defaultValue={user?.name} className="w-full bg-gray-50 border-none px-6 py-4 rounded-2xl font-bold text-gray-900 focus:ring-2 focus:ring-blue-500/20 transition-all" />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-4">Admin Email</label>
                        <input type="email" defaultValue={user?.email} className="w-full bg-gray-50 border-none px-6 py-4 rounded-2xl font-bold text-gray-900 focus:ring-2 focus:ring-blue-500/20 transition-all" />
                     </div>
                  </div>

                  <div className="flex justify-end pt-6">
                     <button className="bg-gray-900 text-white font-black px-10 py-5 rounded-2xl shadow-xl shadow-gray-200 transition-all text-xs uppercase tracking-widest">Save Profile Changes</button>
                  </div>
               </div>
            )}
            
            {activeTab === 'security' && (
               <div className="text-center py-20 animate-in fade-in duration-500">
                  <div className="h-20 w-20 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-6">
                     <svg className="h-10 w-10 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                  </div>
                  <h4 className="text-xl font-black text-gray-900 mb-2">Security Dashboard Ready</h4>
                  <p className="text-gray-400 font-medium italic">Configure two-factor authentication and password policies.</p>
               </div>
            )}

            {activeTab === 'system' && (
               <div className="text-center py-20 animate-in fade-in duration-500">
                  <div className="h-20 w-20 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-6">
                     <svg className="h-10 w-10 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /></svg>
                  </div>
                  <h4 className="text-xl font-black text-gray-900 mb-2">System Preferences</h4>
                  <p className="text-gray-400 font-medium italic italic">Platform-wide global settings and branding control.</p>
               </div>
            )}
         </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
