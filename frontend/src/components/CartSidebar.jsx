import React from 'react'
import { ShoppingCart, X } from 'lucide-react';
import CartItem from './CartItem';
export const CartSidebar = ({ cart, cartTotal, cartItemCount, onClose, onCheckout, onUpdateQuantity, onRemove }) => {
  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/50 bg-opacity-50 backdrop-blur-sm" onClick={onClose}></div>
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl transform transition-transform animate-slide-left">
        <div className="h-full flex flex-col">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-5 flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-white">Your Cart</h2>
              <p className="text-purple-100 text-sm">{cartItemCount} items</p>
            </div>
            <button onClick={onClose} className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-all">
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-4">
            {cart?.length === 0 || !localStorage.getItem("token") ? (
              <div className="text-center py-16">
                <ShoppingCart className="h-24 w-24 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg font-semibold mb-2">Your cart is empty</p>
                <p className="text-gray-400 text-sm">Add some products to get started!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cart?.map((item) => (
                  <CartItem 
                    key={item.id} 
                    item={item} 
                    onUpdateQuantity={onUpdateQuantity}
                    onRemove={onRemove}
                  />
                ))}
              </div>
            )}
          </div>

          {cart?.length > 0 && (
            <div className="border-t bg-white px-6 py-5 space-y-4">
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-700">Subtotal:</span>
                  <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    ${cartTotal?.toFixed(2)}
                  </span>
                </div>
              </div>
              <button
                onClick={onCheckout}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg"
              >
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
