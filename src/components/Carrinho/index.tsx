import { Box, Overlay, Item } from './styles'

import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { RootReducer } from '../../store'
import { remove } from '../../store/reducers/cart'

import lixeiraIcon from '../../assets/images/icones/lixeira.png'

type CarrinhoProps = {
  onClose: () => void
  onContinuar: () => void
}

const Carrinho: React.FC<CarrinhoProps> = ({ onClose, onContinuar }) => {
  const dispatch = useDispatch()
  const produtos = useSelector((state: RootReducer) => state.carrinho.itens)
  const boxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onClose])

  const total = produtos.reduce((soma, item) => soma + item.preco, 0)

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
                  onClick={() => dispatch(remove(index))}
                />
              </Item>
            ))}
            <div className="valor-total">
              <p>Valor total</p>
              <span>R$ {total.toFixed(2)}</span>
            </div>
            <button onClick={onContinuar}>Continuar com a entrega</button>
          </>
        )}
      </Box>
    </Overlay>
  )
}

export default Carrinho
