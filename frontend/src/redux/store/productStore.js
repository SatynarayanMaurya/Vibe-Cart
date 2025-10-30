
import {createSlice} from "@reduxjs/toolkit"


const initialState = {
    allProducts :null,

    loading :false,

    userDetails:null,

    allCartProducts:null

}

export const productStore = createSlice({
    name:"product",
    initialState,
    reducers:{
        setAllProducts:(state,actions)=>{
            state.allProducts = actions.payload
        },

        clearAllProducts:(state,actions)=>{
            state.allProducts = null
        },

        setLoading :(state,actions)=>{
            state.loading = actions.payload
        },

        setUserDetails :(state,actions)=>{
            state.userDetails = actions.payload
        },

        clearUserDetails :(state,actions)=>{
            state.userDetails = null
        },

        setAllCartProducts:(state,actions)=>{
            state.allCartProducts = actions.payload
        },

        clearAllCartProducts:(state,actions)=>{
            state.allCartProducts = null
        }
    }
})

export const {setAllProducts,clearAllProducts,setLoading,setUserDetails,clearUserDetails,setAllCartProducts,clearAllCartProducts} = productStore.actions;
export default productStore.reducer