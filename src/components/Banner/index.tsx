import { BannerContainer } from './styles'

type Props = {
  capa: string
  titulo: string
  tipo: string
}

const Banner = ({ titulo, tipo, capa }: Props) => {
  return (
    <BannerContainer style={{ backgroundImage: `url(${capa})` }}>
      <h1>{titulo}</h1>
      <h2>{tipo}</h2>
    </BannerContainer>
  )
}

export default Banner
