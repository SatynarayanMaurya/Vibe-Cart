import React from 'react'
import { Sparkles } from 'lucide-react';
const NotificationToast = ({ message }) => {
  if (!message) return null;
  
  return (
    <div className="fixed top-20 right-4 z-100 animate-slide-in">
      <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2">
        <Sparkles className="h-5 w-5" />
        <span className="font-semibold">{message}</span>
      </div>
    </div>
  );
};

export default NotificationToast
