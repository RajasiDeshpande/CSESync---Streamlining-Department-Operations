import React from 'react';

const DataTable = ({ columns, data, actions, loading }) => {
  if (loading) {
    return (
      <div className="w-full bg-white rounded-3xl border border-gray-100 overflow-hidden">
        <div className="animate-pulse">
          <div className="h-16 bg-gray-50 border-b border-gray-100"></div>
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-20 border-b border-gray-50"></div>
          ))}
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="w-full bg-white rounded-3xl border border-gray-100 p-20 flex flex-col items-center justify-center text-center">
        <div className="h-20 w-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
          <svg className="h-10 w-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
          </svg>
        </div>
        <h3 className="text-xl font-black text-gray-900 mb-2">No Records Found</h3>
        <p className="text-gray-400 font-medium">There's no data to show in this view right now.</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50">
              {columns.map((col) => (
                <th key={col.key} className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400 border-b border-gray-100">
                  {col.label}
                </th>
              ))}
              {actions && <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400 border-b border-gray-100 text-right">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {data.map((row, rowIndex) => (
              <tr key={row._id || rowIndex} className="group hover:bg-gray-50/50 transition-colors">
                {columns.map((col) => (
                  <td key={col.key} className="px-6 py-5 text-sm font-bold text-gray-700">
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </td>
                ))}
                {actions && (
                  <td className="px-6 py-5 text-right whitespace-nowrap">
                    <div className="flex justify-end gap-2">
                      {actions.map((action, actionIndex) => (
                        <button
                          key={actionIndex}
                          onClick={() => action.onClick(row)}
                          className={`p-2 rounded-xl transition-all ${action.className || 'text-gray-400 hover:bg-white hover:shadow-sm'}`}
                          title={action.label}
                        >
                          {action.icon}
                        </button>
                      ))}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
