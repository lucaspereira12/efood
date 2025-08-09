import { HeaderContainer } from './styles'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootReducer } from '../../store'

import imagemDeFundo from '../../assets/images/fundo-header.png'
import logo from '../../assets/images/logo.png'
import { open } from '../../store/reducers/cart'

const Header = () => {
  const dispatch = useDispatch()
  const { items } = useSelector((state: RootReducer) => state.cart)

  const cartOpen = () => {
    dispatch(open())
  }

  return (
    <HeaderContainer style={{ backgroundImage: `url(${imagemDeFundo})` }}>
      <div className="container">
        <Link
          to="/"
          className="link-restaurante"
          title="Clique aqui para voltar à página inicial"
        >
          Restaurantes
        </Link>
        <Link to="/" className="link-logo">
          <img src={logo} alt="Logo" />
        </Link>
        <button onClick={cartOpen}>
          {items.length} produto(s) no carrinho
        </button>
      </div>
    </HeaderContainer>
  )
}

export default Header
