import { useNavigate } from 'react-router-dom'
import { Box, Overlay } from './styles'

type Props = {
  orderId: number
  onConcluir: () => void
}

const Confirmacao = ({ orderId, onConcluir }: Props) => {
  const navigate = useNavigate()

  const concluir = () => {
    onConcluir()
    navigate('/')
  }

  return (
    <Overlay>
      <Box>
        <h1>Pedido realizado - {orderId}</h1>
        <p>
          Estamos felizes em informar que seu pedido já está em processo de
          preparação e, em breve, será entregue no endereço fornecido.
        </p>
        <p>
          Gostaríamos de ressaltar que nossos entregadores não estão autorizados
          a realizar cobranças extras.
        </p>
        <p>
          Lembre-se da importância de higienizar as mãos após o recebimento do
          pedido, garantindo assim sua segurança e bem-estar durante a refeição.
        </p>
        <p>
          Esperamos que desfrute de uma deliciosa e agradável experiência
          gastronômica. Bom apetite!
        </p>
        <button onClick={concluir}>Concluir</button>
      </Box>
    </Overlay>
  )
}

export default Confirmacao
