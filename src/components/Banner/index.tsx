import { BannerContainer } from './styles'

type Restaurante = {
  capa: string
  titulo: string
  tipo: string
}

type Props = {
  restaurante: Restaurante
}

const Banner = ({ restaurante }: Props) => {
  return (
    <BannerContainer style={{ backgroundImage: `url(${restaurante.capa})` }}>
      <div className="container">
        <h1>{restaurante.tipo}</h1>
        <h2>{restaurante.titulo}</h2>
      </div>
    </BannerContainer>
  )
}

export default Banner
