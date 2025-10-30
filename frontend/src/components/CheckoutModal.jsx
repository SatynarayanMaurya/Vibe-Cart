import { X } from 'lucide-react';
const CheckoutModal = ({ cartTotal, cartItemCount, checkoutForm, onFormChange, onClose, onSubmit }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 bg-opacity-50 backdrop-blur-sm" onClick={onClose}></div>
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full relative z-10 animate-scale-in">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-5 rounded-t-2xl flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">Checkout</h2>
          <button onClick={onClose} className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-all">
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
            <input
              type="text"
              value={checkoutForm.name}
              onChange={(e) => onFormChange({ ...checkoutForm, name: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
            <input
              type="email"
              value={checkoutForm.email}
              onChange={(e) => onFormChange({ ...checkoutForm, email: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
              placeholder="john@example.com"
            />
          </div>
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4 space-y-2">
            <div className="flex justify-between text-gray-600">
              <span>Items ({cartItemCount}):</span>
              <span className="font-semibold">${cartTotal?.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping:</span>
              <span className="font-semibold text-green-600">FREE</span>
            </div>
            <div className="border-t-2 border-purple-200 pt-2 flex justify-between items-center text-lg font-bold">
              <span className="text-gray-700">Order Total:</span>
              <span className="text-2xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                ${cartTotal?.toFixed(2)}
              </span>
            </div>
          </div>
          <button
            onClick={onSubmit}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg"
          >
            Complete Purchase
          </button>
          <p className="text-xs text-gray-500 text-center">This is a mock checkout. No payment will be processed.</p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal
