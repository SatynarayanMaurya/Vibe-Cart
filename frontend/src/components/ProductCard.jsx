import React from 'react'
import { ShoppingCart, Trash2, Plus, Minus, CheckCircle, X, Package, Sparkles } from 'lucide-react';
const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
      <div className="h-48 bg-gradient-to-br from-purple-200 via-blue-200 to-pink-200 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-200 to-blue-200 opacity-20 "></div>
          <img src={product?.image||"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNhzvzKJxLjowcveny5ehUQq-mTXPpIg_8PA&s"} alt="product_image" className='object-contain w-full h-full ' />
      </div>
      <div className="p-5">
        <span className="inline-block bg-purple-100 text-purple-700 text-xs font-semibold px-2 py-1 rounded-full mb-2">
          {product.category}
        </span>
        <h3 className="text-lg font-bold text-gray-800 mb-2">{product.name}</h3>
        <div className="flex justify-between items-center">
          <p className="text-2xl font-bold text-purple-600">
            ${product.price.toFixed(2)}
          </p>
        </div>
        <button
          onClick={() => onAddToCart(product.id)}
          className="w-full mt-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 px-4 rounded-xl font-semibold transition-all transform hover:scale-105 flex items-center justify-center space-x-2 shadow-md"
        >
          <Plus className="h-5 w-5" />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
};


export default ProductCard
