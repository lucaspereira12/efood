import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Box, CepContainer, Form, Message, Overlay } from './styles'
import { useState } from 'react'

type Props = {
  onContinuar: () => void
  onVoltar: () => void
}

const Entrega = ({ onContinuar, onVoltar }: Props) => {
  const [cepNotFound, setCepNotFound] = useState(false)

  const form = useFormik({
    initialValues: {
      nome: '',
      endereco: '',
      cidade: '',
      cep: '',
      numero: '',
      complemento: ''
    },
    validationSchema: Yup.object({
      nome: Yup.string()
        .min(3, 'O nome precisa ter pelo menos 3 caracteres')
        .required('O campo é obrigatório'),
      endereco: Yup.string().required('O campo é obrigatório'),
      cidade: Yup.string().required('O campo é obrigatório'),
      cep: Yup.string().required('O campo é obrigatório'),
      numero: Yup.string().required('O campo é obrigatório'),
      complemento: Yup.string().optional()
    }),
    onSubmit: () => {
      onContinuar()
    }
  })

  const handleCepBlur = async (evento: React.FocusEvent<HTMLInputElement>) => {
    const cep = evento.target.value.replace(/\D/g, '')

    if (cep.length !== 8) return

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
      const data = await response.json()

      if (data.erro) {
        setCepNotFound(true)
        setTimeout(() => setCepNotFound(false), 1000)
        return
      }

      form.setFieldValue('endereco', data.logradouro)
      form.setFieldValue('cidade', data.localidade)
    } catch (error) {
      console.error('Erro ao buscar CEP:', error)
      setCepNotFound(true)
      form.setFieldValue('cep', '')
      setTimeout(() => setCepNotFound(false), 1000)
    }
  }

  return (
    <Overlay>
      <Box>
        <h1>Entrega</h1>
        <Form onSubmit={form.handleSubmit}>
          <label htmlFor="nome">
            Quem irá receber
            <input
              id="nome"
              type="text"
              name="nome"
              value={form.values.nome}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
            />
          </label>

          <label htmlFor="endereco">
            Endereço
            <input
              id="endereco"
              type="text"
              name="endereco"
              value={form.values.endereco}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
            />
          </label>

          <label htmlFor="cidade">
            Cidade
            <input
              id="cidade"
              type="text"
              name="cidade"
              value={form.values.cidade}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
            />
          </label>

          <div className="row">
            <label htmlFor="cep">
              CEP
              <CepContainer>
                <input
                  id="cep"
                  type="text"
                  name="cep"
                  value={form.values.cep}
                  onChange={(evento) => {
                    const cpfFormat = evento.target.value
                      .replace(/\D/g, '')
                      .slice(0, 8)
                    form.setFieldValue('cep', cpfFormat)
                  }}
                  onBlur={handleCepBlur}
                />
                {cepNotFound && <Message>CEP não encontrado</Message>}
              </CepContainer>
            </label>

            <label htmlFor="numero">
              Número
              <input
                id="numero"
                type="text"
                name="numero"
                value={form.values.numero}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
              />
            </label>
          </div>

          <label htmlFor="complemento">
            Complemento (opcional)
            <input
              id="complemento"
              type="text"
              name="complemento"
              value={form.values.complemento}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
            />
          </label>

          <button type="button" onClick={() => form.handleSubmit()}>
            Continuar com o pagamento
          </button>
          <button type="button" onClick={onVoltar}>
            Voltar para o carrinho
          </button>
        </Form>
      </Box>
    </Overlay>
  )
}

export default Entrega
