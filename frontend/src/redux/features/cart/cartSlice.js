import { createSlice } from '@reduxjs/toolkit';
import Swal from 'sweetalert2';


const initialState = {
    cartItems: []
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        addToCart: (state, action) => {
            const existingItems = state.cartItems.find(item => item._id === action.payload._id);
            if (!existingItems) {
                state.cartItems.push(action.payload)
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Product Added To The Cart",
                    showConfirmButton: false,
                    timer: 1500
                });
            } else (
                Swal.fire({
                    title: "Already In Cart",
                    text: "You won't be able to revert this!",
                    icon: "warning",
                    // showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    // cancelButtonColor: "#d33",
                    confirmButtonText: "OK!"
                })
            )
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(item => item._id !== action.payload._id)
        }
    }
});

// Export the Actions 
export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;