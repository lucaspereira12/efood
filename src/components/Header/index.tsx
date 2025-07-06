import { HeaderContainer } from './styles'
import { Link } from 'react-router-dom'

import imagemDeFundo from '../../assets/images/fundo-header.png'
import logo from '../../assets/images/logo.png'

export type Produto = {
  id: number
  nome: string
  descricao: string
  foto: string
  preco: number
  porcao: string
}

type HeaderProps = {
  produtos: Produto[]
  onCarrinhoClick: () => void
}

const Header: React.FC<HeaderProps> = ({ produtos, onCarrinhoClick }) => {
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
        <button onClick={onCarrinhoClick}>
          {produtos.length} produto(s) no carrinho
        </button>
      </div>
    </HeaderContainer>
  )
}

export default Header
