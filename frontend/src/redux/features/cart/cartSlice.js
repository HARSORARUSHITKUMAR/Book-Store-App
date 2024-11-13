import { createSlice } from '@reduxjs/toolkit';


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
                alert("item added successfully")
            } else (
                alert("item already exists")
            )
        }
    }
});

// Export the Actions 
export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;