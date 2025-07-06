import { configureStore } from '@reduxjs/toolkit'

import cartReducer from './reducers/cart'
import { apiSlice } from '../services/api'
export type RootState = ReturnType<typeof store.getState>
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware)
})

export type RootReducer = ReturnType<typeof store.getState>
