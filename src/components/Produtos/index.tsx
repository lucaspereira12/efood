import { useState } from 'react'
import Modal from '../Modal'
import { Item, ProdutosContainer } from './styles'
import { useDispatch } from 'react-redux'
import { add, open } from '../../store/reducers/cart'

type Produto = {
  id: number
  nome: string
  descricao: string
  foto: string
  porcao: string
  preco: number
}

type Props = {
  produtos: Produto[]
}

const Produtos = ({ produtos }: Props) => {
  const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(
    null
  )
  const [isModalOpen, setIsModalOpen] = useState(false)

  const dispatch = useDispatch()

  const abrirModal = (produto: Produto) => {
    setProdutoSelecionado(produto)
    setIsModalOpen(true)
  }

  const fecharModal = () => {
    setIsModalOpen(false)
  }

  const adicionarAoCarrinho = (produto: Produto) => {
    dispatch(add(produto))
    fecharModal()
    dispatch(open())
  }

  return (
    <>
      <ProdutosContainer className="container">
        {produtos.map((produto) => (
          <Item key={produto.id}>
            <img src={produto.foto} alt={produto.nome} />
            <h1>{produto.nome}</h1>
            <p>{produto.descricao}</p>
            <button onClick={() => abrirModal(produto)}>Mais detalhes</button>
          </Item>
        ))}
      </ProdutosContainer>

      <Modal
        show={isModalOpen}
        onClose={fecharModal}
        produto={produtoSelecionado}
        addCarrinho={adicionarAoCarrinho}
      />
    </>
  )
}

export default Produtos
