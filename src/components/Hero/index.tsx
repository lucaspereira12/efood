import { HeroContainer } from './styles'
import { Link } from 'react-router-dom'

import imagemDeFundo from '../../assets/images/fundo-hero.png'
import logo from '../../assets/images/logo.png'

const Hero = () => (
  <HeroContainer style={{ backgroundImage: `url(${imagemDeFundo})` }}>
    <Link to="/">
      <img src={logo} alt="Logo" />
    </Link>
    <h1>Viva experiências gastronômicas no conforto da sua casa</h1>
  </HeroContainer>
)

export default Hero
