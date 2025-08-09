import { useEffect, useState } from 'react'
import Footer from '../../components/Footer'
import Hero from '../../components/Hero'
import Listagem from '../../components/Listagem'

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

const Home = () => {
  const [restaurante, setRestaurante] = useState<Restaurante[]>([])

  useEffect(() => {
    fetch('https://ebac-fake-api.vercel.app/api/efood/restaurantes')
      .then((resposta) => resposta.json())
      .then((resposta) => setRestaurante(resposta))
  }, [])

  return (
    <>
      <Hero />
      <Listagem restaurante={restaurante} />
      <Footer />
    </>
  )
}

export default Home
