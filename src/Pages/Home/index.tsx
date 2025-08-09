import { useGetRestaurantesQuery } from '../../services/api'

import Footer from '../../components/Footer'
import Hero from '../../components/Hero'
import Listagem from '../../components/Listagem'

const Home = () => {
  const { data: restaurantes, isLoading, error } = useGetRestaurantesQuery()

  if (isLoading) return <p>Carregando...</p>
  if (error || !restaurantes) return <p>Erro ao carregar os restaurantes.</p>

  return (
    <>
      <Hero />
      <Listagem restaurantes={restaurantes} />
      <Footer />
    </>
  )
}

export default Home
