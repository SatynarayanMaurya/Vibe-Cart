import React from 'react'
import { Trash2, Plus, Minus, Package,  } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setAllCartProducts, setLoading } from '../redux/store/productStore';
import { apiConnector } from '../services/apiConnector';
import { productEndpoints } from '../services/apis';
import { toast } from 'react-toastify';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const dispatch = useDispatch();

  const removeProduct = async()=>{
    try{
      dispatch(setLoading(true))
      const result = await apiConnector("PUT",productEndpoints.REMOVE_ITEM_FROM_CART,{id:item?.id})
      dispatch(setAllCartProducts(result?.data?.allCartProducts))
      dispatch(setLoading(false))
    }
    catch(error){
      console.log("Error in removing the product : ",error)
      dispatch(setLoading(false))
      toast.error(error?.response?.data?.message || error.messsage || "Error in removing the item from the cart")
    }
  }

  const increaseQuantity = async()=>{
    try{
      dispatch(setLoading(true))
      const result = await apiConnector("PUT",productEndpoints.INCREASE_QUANTITY,{id:item?.id})
      dispatch(setAllCartProducts(result?.data?.allCartProducts))
      dispatch(setLoading(false))
    }
    catch(error){
      console.log("Error in increasing the quantity : ",error)
      dispatch(setLoading(false))
      toast.error(error?.response?.data?.message || error.messsage || "Error in increasing the quantity")
    }
  }

  const decreaseQuantity = async()=>{
    try{
      dispatch(setLoading(true))
      const result = await apiConnector("PUT",productEndpoints.DECREASE_QUANTITY,{id:item?.id})
      dispatch(setAllCartProducts(result?.data?.allCartProducts))
      dispatch(setLoading(false))
    }
    catch(error){
      console.log("Error in increasing the quantity : ",error)
      dispatch(setLoading(false))
      toast.error(error?.response?.data?.message || error.messsage || "Error in decreasing the quantity")
    }
  }
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 flex items-center space-x-4 hover:shadow-md transition-shadow">
      <div className="h-16 w-16 bg-gradient-to-br from-purple-200 to-blue-200 rounded-lg flex items-center justify-center flex-shrink-0">
        <img src={item?.image||"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNhzvzKJxLjowcveny5ehUQq-mTXPpIg_8PA&s"} alt="product_image" className='object-contain w-full h-full ' />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-800 truncate">{item?.name}</h3>
        <p className="text-purple-600 font-bold text-lg">${item?.price?.toFixed(2)}</p>
      </div>
      <div className="flex items-center space-x-2 bg-white rounded-lg p-1 shadow-sm">
        <button
          // onClick={() => onUpdateQuantity(item.id, item.qty - 1)}
          onClick={() => decreaseQuantity()}
          className="bg-gray-100 hover:bg-gray-200 rounded-lg p-1 transition-colors"
        >
          <Minus className="h-4 w-4 text-gray-600" />
        </button>
        <span className="font-bold w-8 text-center text-gray-800">{item?.qty}</span>
        <button
          // onClick={() => onUpdateQuantity(item.id, item.qty + 1)}
          onClick={() => increaseQuantity()}
          className="bg-gray-100 hover:bg-gray-200 rounded-lg p-1 transition-colors"
        >
          <Plus className="h-4 w-4 text-gray-600" />
        </button>
      </div>
      <button
        // onClick={() => onRemove(item.id)}
        onClick={() => removeProduct()}
        className="text-red-500 hover:bg-red-50 rounded-full p-2 transition-colors"
      >
        <Trash2 className="h-5 w-5" />
      </button>
    </div>
  );
};
export default CartItem
