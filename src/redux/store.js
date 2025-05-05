import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './searchSlice';
import cartSlice from './cartSlice'
import themeSlice from './themeSlice';


export const store = configureStore({
  reducer: {
    search: searchReducer,
    cart: cartSlice,
    theme:themeSlice

    
  },
});
