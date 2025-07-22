import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Produto } from '../../Pages/Home'

type CarrinhoState = {
  itens: Produto[]
}

const initialState: CarrinhoState = {
  itens: []
}

const cartSlice = createSlice({
  name: 'carrinho',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Produto>) => {
      state.itens.push(action.payload)
    },
    remove: (state, action: PayloadAction<number>) => {
      state.itens.splice(action.payload, 1)
    },
    clear: (state) => {
      state.itens = []
    }
  }
})

export const { add, remove, clear } = cartSlice.actions
export default cartSlice.reducer
