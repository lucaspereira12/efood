import { FooterContainer } from './styles'
import { Link } from 'react-router-dom'

import logo from '../../assets/images/logo.png'
import instagram from '../../assets/images/redes-sociais/instagram.png'
import facebook from '../../assets/images/redes-sociais/facebook.png'
import twitter from '../../assets/images/redes-sociais/twitter.png'

const Footer = () => (
  <FooterContainer>
    <Link to="/">
      <img src={logo} alt="Logo" />
    </Link>
    <ul>
      <li>
        <Link to="/">
          <img src={instagram} alt="Instagram" />
        </Link>
      </li>
      <li>
        <Link to="/">
          <img src={facebook} alt="Facebook" />
        </Link>
      </li>
      <li>
        <Link to="/">
          <img src={twitter} alt="Twitter" />
        </Link>
      </li>
    </ul>
    <p>
      A efood é uma plataforma para divulgação de estabelecimentos, a
      responsabilidade pela entrega, qualidade dos produtos é toda do
      estabelecimento contratado.
    </p>
  </FooterContainer>
)

export default Footer
