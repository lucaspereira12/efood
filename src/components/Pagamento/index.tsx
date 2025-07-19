import { useForm, Controller } from 'react-hook-form'
import { InputMask } from '@react-input/mask'
import { Box, Form, Message, Overlay } from './styles'
import { useState } from 'react'

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
  const { register, handleSubmit, control, getValues } =
    useForm<FormPagamento>()
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async () => {
    setIsLoading(true)

    const dados = getValues()

    try {
      const resposta = await fetch('https://httpbin.org/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...dados,
          total
        })
      })

      if (!resposta.ok) {
        throw new Error('Erro ao processar pagamento')
      }

      const resultado = await resposta.json()
      console.log('Pagamento enviado:', resultado)

      onFinalizar()
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
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
                rules={{
                  required: true,
                  validate: (value) => value.replace(/\D/g, '').length === 16
                }}
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
                rules={{
                  required: true,
                  validate: (value) => value.replace(/\D/g, '').length === 3
                }}
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
                rules={{
                  required: true,
                  validate: (value) => {
                    const num = parseInt(value)
                    return num >= 1 && num <= 12
                  }
                }}
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
                rules={{
                  required: true,
                  validate: (value) => {
                    const anoAtual = new Date().getFullYear()
                    return parseInt(value) >= anoAtual
                  }
                }}
                render={({ field }) => (
                  <InputMask mask="9999" replacement={{ 9: /\d/ }} {...field} />
                )}
              />
            </label>
          </div>

          <button type="submit" disabled={isLoading}>
            Finalizar pagamento
          </button>
          <button type="button" onClick={onVoltar}>
            Voltar para a edição de endereço
          </button>

          {isLoading && <Message>Processando o pagamento...</Message>}
        </Form>
      </Box>
    </Overlay>
  )
}

export default Pagamento
