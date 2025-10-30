import express from "express"
import { login, signup } from "../controller/auth.controller.js"
import { authMiddleware } from "../middlewares/authMiddleware.js"
import { addToCart, cart, decreaseQuantity, getAllProducts, increaseQuantity, removeAllItemFromCart, removeItemfromCart } from "../controller/product.controller.js"

const router = express.Router()

router.post("/signup",signup)
router.post("/login",login)

router.get("/products",getAllProducts)

router.get("/cart",authMiddleware,cart)
router.post("/addToCart",authMiddleware,addToCart)
router.put("/removeItemFromCart",authMiddleware,removeItemfromCart)
router.put("/removeAllItemFromCart",authMiddleware,removeAllItemFromCart)
router.put("/increaseQuantity",authMiddleware,increaseQuantity)
router.put("/decreaseQuantity",authMiddleware,decreaseQuantity)

export default router