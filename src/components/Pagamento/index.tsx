import { useForm, Controller } from 'react-hook-form'
import { InputMask } from '@react-input/mask'
import { Box, Form, Overlay } from './styles'

type FormPagamento = {
  nomeCartao: string
  numeroCartao: string
  codigo: string
  mesVencimento: string
  anoVencimento: string
}

type Props = {
  onFinalizar: () => void
  onVoltar: () => void
  total: number
}

const Pagamento = ({ onFinalizar, onVoltar, total }: Props) => {
  const { register, handleSubmit, control } = useForm<FormPagamento>()

  const onSubmit = () => {
    onFinalizar()
  }

  return (
    <Overlay>
      <Box>
        <h1>Pagamento - Valor a pagar R$ {total.toFixed(2)}</h1>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <label>
            Nome no cartão
            <input
              type="text"
              {...register('nomeCartao', { required: true })}
            />
          </label>

          <div className="row">
            <label>
              Número do cartão
              <Controller
                name="numeroCartao"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <InputMask
                    mask="9999 9999 9999 9999"
                    replacement={{ 9: /\d/ }}
                    {...field}
                  />
                )}
              />
            </label>
            <label>
              CVV
              <Controller
                name="codigo"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <InputMask mask="999" replacement={{ 9: /\d/ }} {...field} />
                )}
              />
            </label>
          </div>

          <div className="row">
            <label>
              Mês de vencimento
              <Controller
                name="mesVencimento"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <InputMask mask="99" replacement={{ 9: /\d/ }} {...field} />
                )}
              />
            </label>

            <label>
              Ano de vencimento
              <Controller
                name="anoVencimento"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <InputMask mask="9999" replacement={{ 9: /\d/ }} {...field} />
                )}
              />
            </label>
          </div>

          <button type="submit">Finalizar pagamento</button>
          <button type="button" onClick={onVoltar}>
            Voltar para a edição de endereço
          </button>
        </Form>
      </Box>
    </Overlay>
  )
}

export default Pagamento
