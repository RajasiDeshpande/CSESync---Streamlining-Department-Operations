import React from 'react';

const StatCard = ({ label, value, icon, color, trend }) => {
  const colorVariants = {
    blue: 'bg-blue-50 text-blue-600',
    indigo: 'bg-indigo-50 text-indigo-600',
    green: 'bg-green-50 text-green-600',
    orange: 'bg-orange-50 text-orange-600',
    purple: 'bg-purple-50 text-purple-600',
  };

  return (
    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-500 group">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-2xl ${colorVariants[color] || colorVariants.blue} transition-transform group-hover:scale-110 duration-300`}>
          {icon}
        </div>
        {trend && (
          <span className={`text-[10px] font-black px-2 py-1 rounded-lg ${trend > 0 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
            {trend > 0 ? '+' : ''}{trend}%
          </span>
        )}
      </div>
      <div>
        <p className="text-gray-400 font-bold text-[10px] uppercase tracking-widest mb-1">{label}</p>
        <p className="text-3xl font-black text-gray-900 tracking-tighter">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;
