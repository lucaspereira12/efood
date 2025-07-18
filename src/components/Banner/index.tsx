import { BannerContainer } from './styles'

type Props = {
  capa: string
  titulo: string
  tipo: string
}

const Banner = ({ titulo, tipo, capa }: Props) => {
  return (
    <BannerContainer style={{ backgroundImage: `url(${capa})` }}>
      <div className="container">
        <h1>{tipo}</h1>
        <h2>{titulo}</h2>
      </div>
    </BannerContainer>
  )
}

export default Banner
