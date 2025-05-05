import { createSlice } from "@reduxjs/toolkit";
const savedCart = localStorage.getItem('cartItems')
const initialState = {
    items:savedCart?JSON.parse(savedCart): []
}
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const existing = state.items.find((item) => item.id === action.payload.id)
            if (existing) {
                existing.quantity += 1
            }
            else {
                state.items.push({ ...action.payload, quantity: 1 })
            }
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter((item) => item.id !== action.payload.id)
        },
        increaseQuantity: (state, action) => {
            const existing = state.items.find((item) => item.id === action.payload.id)
            if (existing) {
                existing.quantity += 1
            }
        },
        decreaseQuantity: (state, action) => {
            const existing = state.items.find((item) => item.id === action.payload.id)
            if (existing) {
                if (existing.quantity > 1){

                    existing.quantity -= 1
                }
            }
        },
    }
})
export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } = cartSlice.actions
export default cartSlice.reducer