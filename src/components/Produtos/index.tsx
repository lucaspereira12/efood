import { Item, ProdutosContainer } from './styles'

export type Produto = {
  id: number
  nome: string
  descricao: string
  foto: string
  preco: number
  porcao: string
}

export type Restaurante = {
  id: number
  capa: string
  destacado: boolean
  tipo: string
  titulo: string
  avaliacao: number
  descricao: string
  cardapio: Produto[]
}

type Props = {
  restaurante: Restaurante
  maisDetalhes: (produto: Produto) => void
}

const Produtos = ({ restaurante, maisDetalhes }: Props) => {
  return (
    <>
      <ProdutosContainer className="container">
        {restaurante.cardapio?.map((produto) => (
          <Item key={produto.id}>
            <img src={produto.foto} alt={produto.nome} />
            <h1>{produto.nome}</h1>
            <p>{produto.descricao}</p>
            <button onClick={() => maisDetalhes(produto)}>Mais detalhes</button>
          </Item>
        ))}
      </ProdutosContainer>
    </>
  )
}

export default Produtos
