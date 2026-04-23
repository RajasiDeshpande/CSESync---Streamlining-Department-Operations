import React from 'react';

const ChartCard = ({ title, data, labelKey = 'month', valueKey = 'count', color = 'blue' }) => {
  const maxValue = Math.max(...data.map(item => item[valueKey]), 1);
  
  const colors = {
    blue: 'bg-blue-600 shadow-blue-500/40',
    indigo: 'bg-indigo-600 shadow-indigo-500/40',
    purple: 'bg-purple-600 shadow-purple-500/40',
  };

  return (
    <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden flex flex-col h-full">
      <div className="p-8 border-b border-gray-50 flex justify-between items-center">
        <h3 className="text-xl font-black text-gray-900 tracking-tight">{title}</h3>
        <select className="bg-gray-50 border-none rounded-xl text-[10px] font-black uppercase tracking-widest px-3 py-1 text-gray-400 focus:ring-0">
          <option>Last 6 Months</option>
          <option>This Year</option>
        </select>
      </div>
      
      <div className="p-8 flex-1 flex items-end gap-3 md:gap-6 min-h-[300px]">
        {data.map((item, index) => {
          const height = (item[valueKey] / maxValue) * 100;
          return (
            <div key={index} className="flex-1 flex flex-col items-center group h-full justify-end">
              <div className="relative w-full flex justify-center items-end group">
                {/* Tooltip */}
                <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-[10px] font-bold px-2 py-1 rounded-lg pointer-events-none whitespace-nowrap z-10">
                  {item[valueKey]} users
                </div>
                
                {/* Bar */}
                <div 
                  className={`w-full max-w-[40px] rounded-t-xl transition-all duration-700 ease-out transform group-hover:scale-110 ${colors[color]}`}
                  style={{ height: `${height}%` }}
                ></div>
              </div>
              <span className="mt-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">{item[labelKey]}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChartCard;
