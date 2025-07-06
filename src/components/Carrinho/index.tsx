import { Box, Overlay, Item } from './styles'

import { useEffect, useRef } from 'react'

import lixeiraIcon from '../../assets/images/icones/lixeira.png'

export type Produto = {
  id: number
  nome: string
  descricao: string
  foto: string
  preco: number
  porcao: string
}

type CarrinhoProps = {
  produtos: Produto[]
  onRemove: (index: number) => void
  onClose: () => void
  onContinuar: () => void
}

const Carrinho: React.FC<CarrinhoProps> = ({
  produtos,
  onRemove,
  onClose,
  onContinuar
}) => {
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
                  onClick={() => onRemove(index)}
                />
              </Item>
            ))}
            <p className="valor-total">Valor total - R$ {total.toFixed(2)}</p>
            <button onClick={onContinuar}>Continuar com a entrega</button>
          </>
        )}
      </Box>
    </Overlay>
  )
}

export default Carrinho
