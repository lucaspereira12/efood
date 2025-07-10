import { useNavigate } from 'react-router-dom'

import { Destaque, Item, ListagemDeRestaurantes, Tipo } from './styles'

import estrelaIcon from '../../assets/images/icones/estrela.png'

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

type Props = {
  restaurante: Restaurante[]
}

const Listagem = ({ restaurante }: Props) => {
  const navigate = useNavigate()

  return (
    <>
      <ListagemDeRestaurantes className="container">
        {restaurante.map((restaurante) => (
          <Item key={restaurante.id}>
            <div className="categoria-container">
              {restaurante.destacado && <Destaque>Destaque da semana</Destaque>}
              <Tipo>{restaurante.tipo}</Tipo>
            </div>
            <img src={restaurante.capa} alt={restaurante.titulo} />
            <div className="informacoes-do-restaurante">
              <div className="avaliacao">
                <span>{restaurante.avaliacao}</span>
                <img src={estrelaIcon} alt="Estrela" />
              </div>
              <h1>{restaurante.titulo}</h1>
              <p>{restaurante.descricao}</p>
              <button onClick={() => navigate(`/perfil/${restaurante.id}`)}>
                Saiba mais
              </button>
            </div>
          </Item>
        ))}
      </ListagemDeRestaurantes>
    </>
  )
}

export default Listagem
