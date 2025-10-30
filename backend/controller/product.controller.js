import Cart from "../models/cart.model.js";

export const addToCart = async (req, res) => {
  try {
    const {id, name, price, category, image } = req.body;

    if (!name || !price || !category || !image) {
      return res.status(400).json({
        success: false,
        message: "Required fields are missing",
      });
    }

    // Check if user already has a cart
    let existingCartUser = await Cart.findOne({ userId: req.user._id });

    if (existingCartUser) {
      // Check if item already exists in the cart
      const existingItem = existingCartUser.cartItems.find(
        (item) => item.name === name
      );

      if (existingItem) {
        // If same item exists, increase quantity
        existingItem.qty += 1;
      } else {
        // Else push new item
        existingCartUser.cartItems.push({id, name, price, category, image });
      }

      await existingCartUser.save();

      return res.status(200).json({
        success: true,
        message: "Item added to existing cart successfully",
        cart: existingCartUser,
      });
    } else {
      // If no cart exists, create a new one
      const newCart = await Cart.create({
        userId: req.user._id,
        cartItems: [{id, name, price, category, image }],
      });

      return res.status(201).json({
        success: true,
        message: "New cart created and item added",
        cart: newCart,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Error in adding item to the cart",
    });
  }
};

export const removeItemfromCart = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Required field 'name' is missing",
      });
    }

    let existingCartUser = await Cart.findOne({ userId: req.user._id });

    if (!existingCartUser) {
      return res.status(404).json({
        success: false,
        message: "Cart not found for this user",
      });
    }

    // Filter out the item to remove
    const updatedItems = existingCartUser.cartItems.filter(
      (item) => item.id !== id
    );

    if (updatedItems.length === existingCartUser.cartItems.length) {
      return res.status(404).json({
        success: false,
        message: "Item not found in cart",
      });
    }

    // Assign filtered list back and save
    existingCartUser.cartItems = updatedItems;
    await existingCartUser.save();

    return res.status(200).json({
      success: true,
      message: "Item removed from cart successfully",
      allCartProducts: existingCartUser?.cartItems,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Error in removing the item from the cart",
    });
  }
};


export const removeAllItemFromCart = async (req, res) => {
  try {
    let existingCartUser = await Cart.findOne({ userId: req.user._id });

    if (!existingCartUser) {
      return res.status(404).json({
        success: false,
        message: "Cart not found for this user",
      });
    }

    existingCartUser.cartItems = [];
    await existingCartUser.save();

    return res.status(200).json({
      success: true,
      message: "All items removed from cart successfully",
      allCartProducts: existingCartUser?.cartItems,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Error in removing all items from the cart",
    });
  }
};

export const increaseQuantity = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Product name is required",
      });
    }

    const existingCartUser = await Cart.findOne({ userId: req.user._id });

    if (!existingCartUser) {
      return res.status(404).json({
        success: false,
        message: "Cart not found for this user",
      });
    }

    // Find the item in the cart
    const item = existingCartUser.cartItems.find((i) => i.id === id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found in cart",
      });
    }

    // Increase quantity
    item.qty += 1;

    await existingCartUser.save();

    return res.status(200).json({
      success: true,
      message: "Item quantity increased successfully",
      allCartProducts: existingCartUser?.cartItems,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Error in increasing the quantity",
    });
  }
};


export const decreaseQuantity = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Product name is required",
      });
    }

    const existingCartUser = await Cart.findOne({ userId: req.user._id });

    if (!existingCartUser) {
      return res.status(404).json({
        success: false,
        message: "Cart not found for this user",
      });
    }

    // Find the item in the cart
    const item = existingCartUser.cartItems.find((i) => i.id === id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found in cart",
      });
    }

    // Increase quantity
    item.qty -= 1;

    await existingCartUser.save();

    return res.status(200).json({
      success: true,
      message: "Item quantity increased successfully",
      allCartProducts: existingCartUser?.cartItems,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Error in increasing the quantity",
    });
  }
};

export const cart = async(req,res)=>{
  try{
    const allCartItems = await Cart.findOne({userId:req.user._id})
    return res.status(200).json({
      success:true,
      message:"All cart item fetched successfully",
      allCartItems:allCartItems?.cartItems
    })
  }
  catch(error){
    return res.status(500).json({
      success:false,
      message:error.message || "Error in getting cart item"
    })
  }
}


export const getAllProducts =async(req,res)=>{
  try{
    const allProducts =  [
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

    return res.status(200).json({
      success:true,
      message:"All Product fetched successfully",
      allProducts
    })
  }
  catch(error){
    return res.status(500).json({
      success:false,
      message:error.message || "Error in getting all the products"
    })
  }
} 
 