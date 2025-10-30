import React from 'react'
import { CheckCircle } from 'lucide-react';
const ReceiptModal = ({ receipt, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={onClose}></div>
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full relative z-10 animate-scale-in">
        <div className="p-8 text-center">
          <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-full h-24 w-24 flex items-center justify-center mx-auto mb-6 animate-bounce">
            <CheckCircle className="h-14 w-14 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Order Successful!</h2>
          <p className="text-gray-600 mb-8">Thank you for shopping with Vibe Commerce</p>
          
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-6 text-left space-y-4 mb-6">
            <div className="flex justify-between items-center pb-3 border-b border-purple-200">
              <span className="text-gray-600 font-medium">Order ID:</span>
              <span className="font-bold text-gray-800">{receipt.orderId}</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-purple-200">
              <span className="text-gray-600 font-medium">Customer:</span>
              <span className="font-semibold text-gray-800">{receipt.customerName}</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-purple-200">
              <span className="text-gray-600 font-medium">Email:</span>
              <span className="font-semibold text-gray-800 text-sm">{receipt.customerEmail}</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-purple-200">
              <span className="text-gray-600 font-medium">Date:</span>
              <span className="font-semibold text-gray-800 text-sm">
                {new Date(receipt.timestamp).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="text-lg font-bold text-gray-700">Total Paid:</span>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                ${receipt.total.toFixed(2)}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg mb-3"
          >
            Continue Shopping
          </button>
          <p className="text-sm text-gray-500">A confirmation email has been sent to {receipt.customerEmail}</p>
        </div>
      </div>
    </div>
  );
};

export default ReceiptModal
