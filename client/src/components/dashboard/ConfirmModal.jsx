import React from 'react';

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message, confirmText, type = 'danger' }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      ></div>
      
      {/* Modal */}
      <div className="relative bg-white w-full max-w-md rounded-[32px] shadow-2xl overflow-hidden animate-in zoom-in-95 fade-in duration-300">
        <div className="p-8">
          <div className={`h-16 w-16 mx-auto rounded-2xl flex items-center justify-center mb-6 ${
            type === 'danger' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'
          }`}>
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          
          <h3 className="text-2xl font-black text-gray-900 text-center mb-2 tracking-tight">{title}</h3>
          <p className="text-gray-500 text-center font-medium leading-relaxed">{message}</p>
        </div>
        
        <div className="flex border-t border-gray-50 bg-gray-50/50 p-6 gap-4">
          <button
            onClick={onClose}
            className="flex-1 bg-white hover:bg-gray-100 text-gray-700 font-bold py-4 rounded-2xl border border-gray-200 transition-all text-sm"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`flex-1 font-bold py-4 rounded-2xl transition-all text-sm text-white shadow-lg ${
              type === 'danger' 
                ? 'bg-red-500 hover:bg-red-600 shadow-red-500/20' 
                : 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/20'
            }`}
          >
            {confirmText || 'Confirm'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
