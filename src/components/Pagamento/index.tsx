import { useFormik } from 'formik'
import * as Yup from 'yup'
import { InputMask } from '@react-input/mask'
import { Box, Form, Message, Overlay } from './styles'
import { useState } from 'react'

type Props = {
  onFinalizar: () => void
  onVoltar: () => void
  total: number
}

const Pagamento = ({ onFinalizar, onVoltar, total }: Props) => {
  const [isLoading, setIsLoading] = useState(false)

  const formik = useFormik({
    initialValues: {
      nomeCartao: '',
      numeroCartao: '',
      codigo: '',
      mesVencimento: '',
      anoVencimento: ''
    },
    validationSchema: Yup.object({
      nomeCartao: Yup.string().required('Nome no cartão é obrigatório'),
      numeroCartao: Yup.string()
        .required('Número do cartão é obrigatório')
        .test('len', 'Número do cartão deve conter 16 dígitos', (val) => {
          return val?.replace(/\D/g, '').length === 16
        }),
      codigo: Yup.string()
        .required('CVV é obrigatório')
        .test('len', 'CVV deve conter 3 dígitos', (val) => {
          return val?.replace(/\D/g, '').length === 3
        }),
      mesVencimento: Yup.string()
        .required('Mês de vencimento é obrigatório')
        .test('mes', 'Mês inválido', (val) => {
          const num = parseInt(val || '')
          return num >= 1 && num <= 12
        }),
      anoVencimento: Yup.string()
        .required('Ano de vencimento é obrigatório')
        .test('ano', 'Ano inválido', (val) => {
          const anoAtual = new Date().getFullYear()
          return parseInt(val || '') >= anoAtual
        })
    }),
    onSubmit: async (values) => {
      setIsLoading(true)
      try {
        const resposta = await fetch('https://httpbin.org/post', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...values, total })
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
  })

  return (
    <Overlay>
      <Box>
        <h1>Pagamento - Valor a pagar R$ {total.toFixed(2)}</h1>
        <Form onSubmit={formik.handleSubmit}>
          <label htmlFor="nomeCartao">
            Nome no cartão
            <input
              id="nomeCartao"
              type="text"
              name="nomeCartao"
              value={formik.values.nomeCartao}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </label>

          <div className="row">
            <label htmlFor="numeroCartao">
              Número do cartão
              <InputMask
                id="numeroCartao"
                name="numeroCartao"
                mask="9999 9999 9999 9999"
                replacement={{ 9: /\d/ }}
                value={formik.values.numeroCartao}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </label>

            <label htmlFor="codigo">
              CVV
              <InputMask
                id="codigo"
                name="codigo"
                mask="999"
                replacement={{ 9: /\d/ }}
                value={formik.values.codigo}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </label>
          </div>

          <div className="row">
            <label htmlFor="mesVencimento">
              Mês de vencimento
              <InputMask
                id="mesVencimento"
                name="mesVencimento"
                mask="99"
                replacement={{ 9: /\d/ }}
                value={formik.values.mesVencimento}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </label>

            <label htmlFor="anoVencimento">
              Ano de vencimento
              <InputMask
                id="anoVencimento"
                name="anoVencimento"
                mask="9999"
                replacement={{ 9: /\d/ }}
                value={formik.values.anoVencimento}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
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
