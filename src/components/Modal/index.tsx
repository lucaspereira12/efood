import React from 'react'
import { Box, Close, Overlay, ModalContent } from './styles'

import closeIcon from '../../assets/images/icones/close.png'

export type Produto = {
  id: number
  nome: string
  descricao: string
  foto: string
  preco: number
  porcao: string
}

type ModalProps = {
  show: boolean
  onClose: () => void
  produto: Produto | null
  addCarrinho: (produto: Produto) => void
}

const Modal: React.FC<ModalProps> = ({
  show,
  onClose,
  produto,
  addCarrinho
}) => {
  if (!show || !produto) return null

  return (
    <Overlay>
      <Box>
        <Close onClick={onClose}>
          <img src={closeIcon} alt="Close" />
        </Close>
        <ModalContent>
          <img src={produto.foto} alt={produto.nome} />
          <div className="info">
            <h1>{produto.nome}</h1>
            <p>{produto.descricao}</p>
            <p>Serve: {produto.porcao}</p>
            <button onClick={() => addCarrinho(produto)}>
              Adicionar ao carrinho - R$ {produto.preco}
            </button>
          </div>
        </ModalContent>
      </Box>
    </Overlay>
  )
}

export default Modal
