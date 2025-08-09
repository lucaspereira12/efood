declare type Produto = {
  id: number
  nome: string
  descricao: string
  foto: string
  preco: number
  porcao: string
}

declare type Restaurante = {
  id: number
  titulo: string
  tipo: string
  capa: string
  descricao: string
  avaliacao: number
  destacado: boolean
  cardapio: Produto[]
}
