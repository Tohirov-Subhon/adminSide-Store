import { configureStore } from '@reduxjs/toolkit'
import  products  from '../features/products/products'
import  AuthSlice  from '../auth/auth'

export const store = configureStore({
  reducer: {
    auth : AuthSlice,
    products: products
  },
})