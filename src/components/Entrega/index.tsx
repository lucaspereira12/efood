import { useForm } from 'react-hook-form'
import { Box, CepContainer, Form, Message, Overlay } from './styles'
import { useState } from 'react'

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
  const { register, handleSubmit, setValue, watch } = useForm<FormEntrega>()
  const cepValue = watch('cep') || ''
  const [cepNotFound, setCepNotFound] = useState(false)

  const onSubmit = () => {
    onContinuar()
  }

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

      setValue('endereco', data.logradouro)
      setValue('cidade', data.localidade)
    } catch (error) {
      console.error('Erro ao buscar CEP:', error)
      setCepNotFound(true)
      setValue('cep', '')
      setTimeout(() => setCepNotFound(false), 1000)
    }
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
              <CepContainer>
                <input
                  type="text"
                  {...register('cep', {
                    required: true,
                    validate: (value) => value.replace(/\D/g, '').length === 8
                  })}
                  value={cepValue}
                  onChange={(evento) => {
                    const cpfFormat = evento.target.value
                      .replace(/\D/g, '')
                      .slice(0, 8)
                    setValue('cep', cpfFormat)
                  }}
                  onBlur={handleCepBlur}
                />
                {cepNotFound && <Message>CEP não encontrado</Message>}
              </CepContainer>
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
