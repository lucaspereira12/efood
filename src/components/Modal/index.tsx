import { Box, Close, Overlay, ModalContent } from './styles'

import closeIcon from '../../assets/images/icones/close.png'

import { formatarPreco } from '../../utils'

type Produto = {
  id: number
  foto: string
  nome: string
  descricao: string
  porcao: string
  preco: number
}

type Props = {
  show: boolean
  onClose: () => void
  produto: Produto | null
  addCarrinho: (produto: Produto) => void
}

const Modal = ({ show, onClose, produto, addCarrinho }: Props) => {
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
              Adicionar ao carrinho - {formatarPreco(produto.preco)}
            </button>
          </div>
        </ModalContent>
      </Box>
    </Overlay>
  )
}

export default Modal
