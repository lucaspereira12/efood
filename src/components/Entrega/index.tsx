import { useForm, Controller } from 'react-hook-form'
import { InputMask } from '@react-input/mask'
import { Box, Form, Overlay } from './styles'

type FormEntrega = {
  nome: string
  endereco: string
  cidade: string
  cep: string
  numero: string
  complemento?: string
}

type Props = {
  onContinuar: () => void
  onVoltar: () => void
}

const Entrega = ({ onContinuar, onVoltar }: Props) => {
  const { register, handleSubmit, control } = useForm<FormEntrega>()

  const onSubmit = () => {
    onContinuar()
  }

  return (
    <Overlay>
      <Box>
        <h1>Entrega</h1>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <label>
            Quem irá receber
            <input type="text" {...register('nome', { required: true })} />
          </label>

          <label>
            Endereço
            <input type="text" {...register('endereco', { required: true })} />
          </label>

          <label>
            Cidade
            <input type="text" {...register('cidade', { required: true })} />
          </label>

          <div className="row">
            <label>
              CEP
              <Controller
                control={control}
                name="cep"
                rules={{ required: true }}
                render={({ field }) => (
                  <InputMask
                    mask="99999-999"
                    replacement={{ 9: /\d/ }}
                    {...field}
                  />
                )}
              />
            </label>

            <label>
              Número
              <input type="text" {...register('numero', { required: true })} />
            </label>
          </div>

          <label>
            Complemento (opcional)
            <input type="text" {...register('complemento')} />
          </label>

          <button type="submit">Continuar com o pagamento</button>
          <button type="button" onClick={onVoltar}>
            Voltar para o carrinho
          </button>
        </Form>
      </Box>
    </Overlay>
  )
}

export default Entrega
