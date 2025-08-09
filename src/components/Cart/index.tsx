import { Box, Overlay, Item } from './styles'

import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { RootReducer } from '../../store'
import { close, remove } from '../../store/reducers/cart'
import { open } from '../../store/reducers/checkout'
import { formatarPreco, precoTotal } from '../../utils'

import lixeiraIcon from '../../assets/images/icones/lixeira.png'

const Cart = () => {
  const { items } = useSelector((state: RootReducer) => state.cart)

  const dispatch = useDispatch()

  const closeCart = () => {
    dispatch(close())
  }

  const openCheckout = () => {
    closeCart()
    dispatch(open())
  }

  const removeItem = (id: number) => {
    dispatch(remove(id))
  }

  const produtos = useSelector((state: RootReducer) => state.cart.items)
  const boxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(event.target as Node)) {
        dispatch(close())
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  })

  return (
    <Overlay>
      <Box ref={boxRef}>
        {produtos.length === 0 ? (
          <p>O carrinho está vazio.</p>
        ) : (
          <>
            {produtos.map((produto, index) => (
              <Item key={index}>
                <img src={produto.foto} alt={produto.nome} />
                <div className="descricao">
                  <h1>{produto.nome}</h1>
                  <p>R$ {produto.preco.toFixed(2)}</p>
                </div>
                <img
                  src={lixeiraIcon}
                  alt="Lixeira"
                  className="lixeira"
                  title="Remover item do carrinho"
                  onClick={() => removeItem(produto.id)}
                />
              </Item>
            ))}
            <div className="valor-total">
              <p>Valor total</p>
              <span>R$ {formatarPreco(precoTotal(items))}</span>
            </div>
            <button onClick={openCheckout}>Continuar com a entrega</button>
          </>
        )}
      </Box>
    </Overlay>
  )
}

export default Cart
