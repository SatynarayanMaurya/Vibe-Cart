import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", 
    required: true,
  },

  cartItems: [
    {
      id:{
        type:Number,
        required:true
      },
        
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      category: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      qty: {
        type: Number,
        default: 1,
      },
    },
  ],
});

export default mongoose.model("Cart", cartSchema);
