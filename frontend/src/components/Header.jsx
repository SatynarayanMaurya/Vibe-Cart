import { ShoppingCart, Package,LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const Header = ({ cartItemCount, onCartClick }) => {
  const navigate = useNavigate()
  return (
    <header className="bg-white shadow-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-br from-purple-600 to-blue-600 p-2 rounded-lg">
              <Package className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Vibe Commerce
            </h1>
          </div>
          <div className='flex gap-8'>
            {
              !localStorage?.getItem("token")&&
              <button
              onClick={()=>navigate("/auth")}
              className="relative bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-2 rounded-full flex items-center space-x-2 transition-all transform hover:scale-105 shadow-lg"
              >
                <span className="font-semibold">Login</span>
                <LogIn className="h-5 w-5" />
              </button>
            }

            <button
              onClick={onCartClick}
              className="relative bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-2 rounded-full flex items-center space-x-2 transition-all transform hover:scale-105 shadow-lg"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="font-semibold">Cart</span>
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-500 text-white rounded-full h-6 w-6 flex items-center justify-center text-xs font-bold animate-pulse">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header
