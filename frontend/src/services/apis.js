const BASE_URL = import.meta.env.VITE_BASE_URL

export const authEndpoints = {
    SIGN_UP : BASE_URL +"/api/signup",
    LOGIN : BASE_URL + '/api/login'
}

export const productEndpoints = {
    GET_ALL_PRODUCTS : BASE_URL + "/api/products",
    GET_ALL_CART_PRODUCT : BASE_URL + "/api/cart",
    ADD_TO_CART : BASE_URL + "/api/addToCart",
    REMOVE_ITEM_FROM_CART : BASE_URL + "/api/removeItemFromCart",
    REMOVE_ALL_ITEM_FROM_CART : BASE_URL + "/api/removeAllItemFromCart",
    INCREASE_QUANTITY : BASE_URL + "/api/increaseQuantity",
    DECREASE_QUANTITY : BASE_URL + "/api/decreaseQuantity",
}


