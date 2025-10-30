import React, { useState, useEffect } from 'react';
import { CartSidebar } from './CartSidebar';
import ProductsGrid from './ProductsGrid';
import CheckoutModal from './CheckoutModal';
import Header from './Header';
import NotificationToast from './NotificationToast';
import LoadingScreen from './LoadingScreen';
import HeroSection from './HeroSection';
import ReceiptModal from './ReceiptModal';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { setAllCartProducts, setLoading } from '../redux/store/productStore';
import { apiConnector } from '../services/apiConnector';
import { productEndpoints } from '../services/apis';
import { useNavigate } from 'react-router-dom';

const DUMMY_PRODUCTS = [
  { id: 1, name: 'Wireless Headphones', price: 79.99, category: 'Electronics',image:"https://static.vecteezy.com/system/resources/previews/044/617/804/non_2x/yellow-wireless-headphones-isolated-on-transparent-background-png.png" },
  { id: 2, name: 'Smart Watch Pro', price: 199.99, category: 'Electronics', image:"https://static.vecteezy.com/system/resources/previews/051/754/125/non_2x/smart-watch-isolated-on-transparent-background-png.png" },

  { id: 3, name: 'Dumbbell Set', price: 99.99, category: 'Sports & Fitness', image: 'https://pngimg.com/d/dumbbell_PNG16369.png' },
  { id: 4, name: 'Resistance Bands', price: 19.99, category: 'Sports & Fitness', image: 'https://png.pngtree.com/png-vector/20250321/ourmid/pngtree-resistance-bands-isolated-on-transparent-background-png-image_15807136.png' },
    
  { id: 5, name: 'Aromatherapy Diffuser', price: 39.99, category: 'Home & Living', image: 'https://png.pngtree.com/png-clipart/20240717/original/pngtree-aroma-diffuser-humidifier-png-image_15581021.png' },

  { id: 6, name: 'Laptop Stand', price: 49.99, category: 'Accessories', image:"https://png.pngtree.com/png-vector/20250713/ourmid/pngtree-modern-silver-laptop-stand-design-png-image_16631402.webp" },

  { id: 7, name: 'Mechanical Keyboard', price: 129.99, category: 'Electronics',image:"https://png.pngtree.com/png-vector/20250517/ourmid/pngtree-illuminated-white-compact-mechanical-keyboard-with-rainbow-rgb-backlighting-for-gaming-png-image_16311227.png" },

  { id: 8, name: 'Water Bottle', price: 14.99, category: 'Sports & Fitness', image: 'https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/NI_CATALOG/IMAGES/CIW/2025/7/28/8c4580c0-4395-4700-a26c-4e8ad215aa82_C7G45YM2FB.png' },
  { id: 9, name: 'Electric Toothbrush', price: 59.99, category: 'Health & Beauty', image: 'https://pngimg.com/d/toothbrush_PNG79.png' },

  { id: 10, name: 'USB-C Hub', price: 39.99, category: 'Accessories',image:"https://www.amkette.com/cdn/shop/files/514XiBD7I7L._SL1500_-removebg-preview.png?v=1684996244" },

  { id: 11, name: 'Wireless Mouse', price: 29.99, category: 'Electronics',image:"https://png.pngtree.com/png-clipart/20240520/original/pngtree-wireless-gaming-mouse-png-image_15140813.png" },

  { id: 12, name: 'Wall Clock', price: 24.99, category: 'Home & Living', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9i4x233uUyTX_IO6NIUiXSKBe9Nc8Tf_W5w&s' },
  { id: 13, name: 'Yoga Mat', price: 29.99, category: 'Sports & Fitness', image: 'https://png.pngtree.com/png-vector/20240128/ourmid/pngtree-yoga-mat-3d-illustrations-png-image_11558911.png' },

  { id: 14, name: 'Smart Jump Rope', price: 49.99, category: 'Sports & Fitness', image: 'https://sc04.alicdn.com/kf/H91d329b8f2ad407389e2e8b8cf7d4b62w.png' },

  { id: 15, name: 'Phone Case', price: 19.99, category: 'Accessories',image:"https://media-ik.croma.com/prod/https://media.tatacroma.com/Croma%20Assets/Communication/Cases%20and%20Covers/Images/311006_aivhzc.png" },
  { id: 16, name: 'Bluetooth Speaker', price: 89.99, category: 'Electronics',image:"https://pngimg.com/d/wireless_speaker_PNG28.png" },

  { id: 17, name: 'Desk Organizer', price: 24.99, category: 'Accessories',image:"https://png.pngtree.com/png-vector/20250127/ourmid/pngtree-modern-computer-workstation-wooden-desk-organizer-sleek-monitor-wireless-keyboard-png-image_15351586.png" },
  { id: 18, name: 'HD Webcam', price: 69.99, category: 'Electronics',image:'https://png.pngtree.com/png-clipart/20250121/original/pngtree-high-quality-hd-webcam-for-video-conferencing-png-image_19968393.png' },

  { id: 19, name: 'Beard Trimmer', price: 49.99, category: 'Health & Beauty', image: 'https://png.pngtree.com/png-vector/20241224/ourmid/pngtree-an-up-close-view-of-a-stylish-black-and-white-electric-png-image_14744208.png' },
  { id: 20, name: 'Skincare Set', price: 89.99, category: 'Health & Beauty', image: 'https://static.vecteezy.com/system/resources/thumbnails/048/053/161/small/a-pastel-paradise-of-skincare-products-png.png' },

  { id: 21, name: 'Travel Backpack', price: 89.99, category: 'Travel & Outdoors', image: 'https://png.pngtree.com/png-clipart/20241230/original/pngtree-orange-backpack-clipart-illustration-travel-adventure-hiking-camping-school-bag-gear-png-image_18283513.png' },
  { id: 22, name: 'Camping Lantern', price: 39.99, category: 'Travel & Outdoors', image: 'https://png.pngtree.com/png-vector/20230912/ourmid/pngtree-watercolor-camping-lantern-png-image_10019835.png' },

  { id: 23, name: 'Portable Power Bank', price: 44.99, category: 'Electronics', image: 'https://png.pngtree.com/png-vector/20240728/ourmid/pngtree-metal-portable-power-bank-png-image_13261164.png' },

  { id: 24, name: 'Mini Projector', price: 189.99, category: 'Electronics', image: 'https://png.pngtree.com/png-clipart/20240826/original/pngtree-mini-projector-png-image_15850501.png' },

  { id: 25, name: 'Laptop Sleeve', price: 25.99, category: 'Accessories', image: 'https://png.pngtree.com/png-vector/20230831/ourmid/pngtree-3d-render-laptop-bag-perspective-view-png-image_9192010.png' },

  { id: 26, name: 'Cable Organizer', price: 12.99, category: 'Accessories', image: 'https://png.pngtree.com/png-clipart/20240929/original/pngtree-brighten-your-setup-the-best-colorful-computer-cables-png-image_16126101.png' },


  { id: 27, name: 'Smartphone Tripod', price: 49.99, category: 'Accessories', image: 'https://png.pngtree.com/png-clipart/20250530/original/pngtree-smartphone-placed-in-ring-light-on-tripod-stand-over-transparent-background-png-image_21095831.png' },
  { id: 28, name: 'Desk Lamp with USB Port', price: 59.99, category: 'Accessories', image: 'https://mrlightglobal.in/wp-content/uploads/2025/01/6601-1.png' },

  { id: 29, name: 'Wireless Keyboard and Mouse Combo', price: 79.99, category: 'Accessories', image: 'https://png.pngtree.com/png-clipart/20250107/original/pngtree-gaming-wireless-keyboard-mouse-combo-png-image_19748813.png' },

  { id: 30, name: 'Monitor Light Bar', price: 69.99, category: 'Accessories', image: 'https://dl.razerzone.com/src2/13998/13998-en-v4.png' },

];

export default function VibeCommerce() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const token = localStorage.getItem("token")
  const [products] = useState(DUMMY_PRODUCTS);
  const allCartProducts = useSelector((state)=>state.product.allCartProducts)
  const [cart, setCart] = useState([]);
  const loading = useSelector((state)=>state.product.loading)
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [receipt, setReceipt] = useState(null);
  const [checkoutForm, setCheckoutForm] = useState({ name: '', email: '' });
  const [notification, setNotification] = useState('');


  const getAllCartItem = async()=>{
    try{
      if(!token) return ;
      if(allCartProducts){
        return ;
      }
      dispatch(setLoading(true))
      const result = await apiConnector("GET",productEndpoints.GET_ALL_CART_PRODUCT)
      dispatch(setAllCartProducts(result?.data?.allCartItems))
      dispatch(setLoading(false))
      
    }
    catch(error){
      console.log("Error in getting all the cart Item : ",error) 
      dispatch(setLoading(false))
    }
  }

  useEffect(()=>{
    getAllCartItem()
  },[])

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(''), 3000);
  };

  const addToCart = async(productId) => {
    try{
      if(!token){
        toast.warn("Please log in to add items to your cart.");
        navigate("/auth")
        return ;
      }
      const product = products.find(p => p.id === productId);
      dispatch(setLoading(true))
      const result = await apiConnector("POST",productEndpoints.ADD_TO_CART,{id:product?.id,name:product?.name,category:product?.category,price:product?.price,image:product?.image})
      dispatch(setAllCartProducts(result?.data?.cart?.cartItems))
      dispatch(setLoading(false))
      showNotification(`${product.name} added to cart!`);
    }
    catch(error){
      console.log("Error in adding the cart : ",error)
      toast.error(error?.response?.data?.message || error?.message || "Error in adding to the cart")
      dispatch(setLoading(false))
    }
  };

  const updateQuantity = (itemId, newQty) => {
    if (newQty < 1) {
      removeFromCart(itemId);
      return;
    }
    setCart(cart.map(item => 
      item.id === itemId ? { ...item, qty: newQty } : item
    ));
  };

  const removeFromCart = (itemId) => {
    const item = cart.find(i => i.id === itemId);
    setCart(cart.filter(item => item.id !== itemId));
    showNotification(`${item.name} removed from cart`);
  };

  const handleCheckout =async () => {
    try{
      
      dispatch(setLoading(true))
      const result = await apiConnector("PUT",productEndpoints.REMOVE_ALL_ITEM_FROM_CART)
      dispatch(setAllCartProducts(result?.data?.allCartProducts))
      dispatch(setLoading(false))
    }
    catch(error){
      console.log("Error in handle check out : ",error)
      toast.error(error?.response?.data?.message || error?.message || "Error in handle checkout")
      dispatch(setLoading(false))
    }
    if (!checkoutForm.name.trim()) {
      showNotification('Please enter your name');
      return;
    }
    if (!checkoutForm.email.trim() || !checkoutForm.email.includes('@')) {
      showNotification('Please enter a valid email');
      return;
    }

    const receiptData = {
      orderId: `ORD-${Date.now()}`,
      timestamp: new Date().toISOString(),
      total: cartTotal,
      items: cart,
      customerName: checkoutForm.name,
      customerEmail: checkoutForm.email
    };

    setReceipt(receiptData);
    setShowCheckout(false);
    setShowReceipt(true);
    setCart([]);
    setCheckoutForm({ name: '', email: '' });
  };

  const cartTotal = allCartProducts?.reduce((sum, item) => sum + (item.price * item.qty), 0) || 0;
  const cartItemCount = allCartProducts?.reduce((sum, item) => sum + item.qty, 0) || 0;

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      <Header cartItemCount={cartItemCount} onCartClick={() => setShowCart(true)} />
      <NotificationToast message={notification} />
      <HeroSection />
      <ProductsGrid products={products} onAddToCart={addToCart} />

      {showCart && (
        <CartSidebar 
          cart={allCartProducts}
          cartTotal={cartTotal}
          cartItemCount={cartItemCount}
          onClose={() => setShowCart(false)}
          onCheckout={() => {
            setShowCart(false);
            setShowCheckout(true);
          }}
          onUpdateQuantity={updateQuantity}
          onRemove={removeFromCart}
        />
      )}

      {showCheckout && (
        <CheckoutModal 
          cartTotal={cartTotal}
          cartItemCount={cartItemCount}
          checkoutForm={checkoutForm}
          onFormChange={setCheckoutForm}
          onClose={() => setShowCheckout(false)}
          onSubmit={handleCheckout}
        />
      )}

      {showReceipt && receipt && (
        <ReceiptModal 
          receipt={receipt}
          onClose={() => setShowReceipt(false)}
        />
      )}
    </div>
  );
}