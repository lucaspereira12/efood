import { configureStore } from '@reduxjs/toolkit'

import { api } from '../services/api'

import cartReducer from './reducers/cart'
import checkoutReducer from './reducers/checkout'

const loadCartFromLocalStorage = () => {
  try {
    const serializedCart = localStorage.getItem('carrinho')
    if (serializedCart === null) {
      return undefined
    }
    return JSON.parse(serializedCart)
  } catch (e) {
    console.warn('Erro ao carregar o carrinho do localStorage:', e)
    return undefined
  }
}

const saveCartToLocalStorage = (state: RootReducer) => {
  try {
    const serializedCart = JSON.stringify(state.cart)
    localStorage.setItem('carrinho', serializedCart)
  } catch (e) {
    console.warn('Erro ao salvar o carrinho no localStorage:', e)
  }
}

const preloadedState = {
  cart: loadCartFromLocalStorage()
}

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    checkout: checkoutReducer,
    [api.reducerPath]: api.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
  preloadedState
})

store.subscribe(() => {
  saveCartToLocalStorage(store.getState())
})

export type RootReducer = ReturnType<typeof store.getState>
