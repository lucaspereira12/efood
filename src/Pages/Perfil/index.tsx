import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { useGetPerfilQuery } from '../../services/api'
import { RootReducer } from '../../store'

import Header from '../../components/Header'
import Banner from '../../components/Banner'
import Produtos from '../../components/Produtos'
import Footer from '../../components/Footer'
import Cart from '../../components/Cart'
import Checkout from '../../components/Checkout'

const Perfil = () => {
  const { id } = useParams<{ id: string }>()
  const { data: restaurante, isLoading, error } = useGetPerfilQuery(id || '')

  const isCartOpen = useSelector((state: RootReducer) => state.cart.isOpen)
  const isCheckoutOpen = useSelector(
    (state: RootReducer) => state.checkout.isOpen
  )

  if (isLoading) return <p>Carregando...</p>

  if (error || !restaurante)
    return <p>Erro ao carregar o perfil do restaurante.</p>

  return (
    <>
      <Header />
      <Banner restaurante={restaurante} />
      <Produtos produtos={restaurante.cardapio} />
      <Footer />

      {isCartOpen && <Cart />}

      {isCheckoutOpen && <Checkout />}
    </>
  )
}

export default Perfil
