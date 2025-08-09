import { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { InputMask } from '@react-input/mask'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { Box, CepContainer, Form, MessageCep, Overlay } from './styles'
import { formatarPreco, precoTotal } from '../../utils'
import { RootReducer } from '../../store'
import { usePurchaseMutation } from '../../services/api'
import { clear, open } from '../../store/reducers/cart'
import { close as closeCheckout } from '../../store/reducers/checkout'

type Etapa = 'entrega' | 'pagamento'

const Checkout = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [etapa, setEtapa] = useState<Etapa>('entrega')
  const [cepNotFound, setCepNotFound] = useState(false)

  const [purchase, { data, isSuccess, isLoading }] = usePurchaseMutation()
  const produtos = useSelector((state: RootReducer) => state.cart.items)

  const valorTotal = precoTotal(produtos)

  const form = useFormik({
    initialValues: {
      nome: '',
      endereco: '',
      cidade: '',
      cep: '',
      numero: '',
      complemento: '',
      nomeCartao: '',
      numeroCartao: '',
      codigo: '',
      mesVencimento: '',
      anoVencimento: ''
    },
    validationSchema: Yup.object({
      nome: Yup.string()
        .min(3, 'O nome precisa ter pelo menos 3 caracteres')
        .required('Campo obrigatório'),
      endereco: Yup.string().required('Campo obrigatório'),
      cidade: Yup.string().required('Campo obrigatório'),
      cep: Yup.string().required('Campo obrigatório'),
      numero: Yup.string().required('Campo obrigatório'),
      complemento: Yup.string(),
      nomeCartao: Yup.string().required('Campo obrigatório'),
      numeroCartao: Yup.string()
        .required('Campo obrigatório')
        .test('len', 'Número inválido', (val) => {
          return val?.replace(/\D/g, '').length === 16
        }),
      codigo: Yup.string()
        .required('Campo obrigatório')
        .test('len', 'Código inválido', (val) => {
          return val?.replace(/\D/g, '').length === 3
        }),
      mesVencimento: Yup.string()
        .required('Campo obrigatório')
        .test('mes', 'Mês inválido', (val) => {
          const num = parseInt(val || '')
          return num >= 1 && num <= 12
        }),
      anoVencimento: Yup.string()
        .required('Campo obrigatório')
        .test('ano', 'Ano inválido', (val) => {
          const anoAtual = new Date().getFullYear()
          return parseInt(val || '') >= anoAtual
        })
    }),
    onSubmit: async (values) => {
      try {
        await purchase({
          products: produtos.map((item) => ({
            id: item.id,
            price: item.preco
          })),
          delivery: {
            receiver: values.nome,
            address: {
              description: values.endereco,
              city: values.cidade,
              zipCode: values.cep,
              number: Number(values.numero),
              complement: values.complemento
            }
          },
          payment: {
            card: {
              name: values.nomeCartao,
              number: values.numeroCartao,
              code: Number(values.codigo),
              expires: {
                month: Number(values.mesVencimento),
                year: Number(values.anoVencimento)
              }
            }
          }
        }).unwrap()

        dispatch(clear())
      } catch (error) {
        alert('Erro ao finalizar a compra. Tente novamente.')
      }
    }
  })

  const handleCepBlur = async () => {
    const cep = form.values.cep.replace(/\D/g, '')
    if (cep.length !== 8) return

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
      const data = await response.json()

      if (data.erro) {
        setCepNotFound(true)
        setTimeout(() => setCepNotFound(false), 1000)
      } else {
        setCepNotFound(false)
        form.setFieldValue('endereco', data.logradouro || '')
        form.setFieldValue('cidade', data.localidade || '')
      }
    } catch {
      setCepNotFound(true)
      setTimeout(() => setCepNotFound(false), 1000)
    }
  }

  const voltarAoCarrinho = () => {
    dispatch(closeCheckout())
    dispatch(open())
  }

  return (
    <Overlay>
      <Box>
        {!(isSuccess && data) ? (
          <Form onSubmit={form.handleSubmit}>
            {etapa === 'entrega' && (
              <>
                <h1>Entrega</h1>
                <label htmlFor="nome">
                  Quem irá receber
                  <input
                    id="nome"
                    type="text"
                    name="nome"
                    value={form.values.nome}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    className={
                      form.errors.nome && form.touched.nome ? 'erro' : ''
                    }
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
                    className={
                      form.errors.endereco && form.touched.endereco
                        ? 'erro'
                        : ''
                    }
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
                    className={
                      form.errors.cidade && form.touched.cidade ? 'erro' : ''
                    }
                  />
                </label>
                <div className="row-cep">
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
                        className={
                          form.errors.cep && form.touched.cep ? 'erro' : ''
                        }
                      />
                      {cepNotFound && (
                        <MessageCep>CEP não encontrado</MessageCep>
                      )}
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
                      className={
                        form.errors.numero && form.touched.numero ? 'erro' : ''
                      }
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
                <button
                  type="button"
                  onClick={async () => {
                    const errors = await form.validateForm()
                    const camposEntrega: (keyof typeof form.values)[] = [
                      'nome',
                      'endereco',
                      'cidade',
                      'cep',
                      'numero'
                    ]

                    const temErros = camposEntrega.some(
                      (campo) => errors[campo]
                    )
                    if (!temErros) {
                      setEtapa('pagamento')
                    } else {
                      camposEntrega.forEach((campo) =>
                        form.setFieldTouched(campo, true)
                      )
                    }
                  }}
                >
                  Continuar com o pagamento
                </button>
                <button type="button" onClick={voltarAoCarrinho}>
                  Voltar para o carrinho
                </button>
              </>
            )}

            {etapa === 'pagamento' && (
              <>
                <h1>Pagamento - Valor a pagar {formatarPreco(valorTotal)}</h1>
                <label htmlFor="nomeCartao">
                  Nome no cartão
                  <input
                    id="nomeCartao"
                    type="text"
                    name="nomeCartao"
                    value={form.values.nomeCartao}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    className={
                      form.errors.nomeCartao && form.touched.nomeCartao
                        ? 'erro'
                        : ''
                    }
                  />
                </label>
                <div className="row-cartao">
                  <label htmlFor="numeroCartao">
                    Número do cartão
                    <InputMask
                      id="numeroCartao"
                      name="numeroCartao"
                      mask="9999 9999 9999 9999"
                      replacement={{ 9: /\d/ }}
                      value={form.values.numeroCartao}
                      onChange={form.handleChange}
                      onBlur={form.handleBlur}
                      className={
                        form.errors.numeroCartao && form.touched.numeroCartao
                          ? 'erro'
                          : ''
                      }
                    />
                  </label>
                  <label htmlFor="codigo">
                    CVV
                    <InputMask
                      id="codigo"
                      name="codigo"
                      mask="999"
                      replacement={{ 9: /\d/ }}
                      value={form.values.codigo}
                      onChange={form.handleChange}
                      onBlur={form.handleBlur}
                      className={
                        form.errors.codigo && form.touched.codigo ? 'erro' : ''
                      }
                    />
                  </label>
                </div>
                <div className="row-cartao">
                  <label htmlFor="mesVencimento">
                    Mês de vencimento
                    <InputMask
                      id="mesVencimento"
                      name="mesVencimento"
                      mask="99"
                      replacement={{ 9: /\d/ }}
                      value={form.values.mesVencimento}
                      onChange={form.handleChange}
                      onBlur={form.handleBlur}
                      className={
                        form.errors.mesVencimento && form.touched.mesVencimento
                          ? 'erro'
                          : ''
                      }
                    />
                  </label>
                  <label htmlFor="anoVencimento">
                    Ano de vencimento
                    <InputMask
                      id="anoVencimento"
                      name="anoVencimento"
                      mask="9999"
                      replacement={{ 9: /\d/ }}
                      value={form.values.anoVencimento}
                      onChange={form.handleChange}
                      onBlur={form.handleBlur}
                      className={
                        form.errors.anoVencimento && form.touched.anoVencimento
                          ? 'erro'
                          : ''
                      }
                    />
                  </label>
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  onClick={async () => {
                    const errors = await form.validateForm()
                    const camposPagamento: (keyof typeof form.values)[] = [
                      'nomeCartao',
                      'numeroCartao',
                      'codigo',
                      'mesVencimento',
                      'anoVencimento'
                    ]

                    const temErros = camposPagamento.some(
                      (campo) => errors[campo]
                    )

                    if (!temErros) {
                      form.handleSubmit()
                    } else {
                      camposPagamento.forEach((campo) =>
                        form.setFieldTouched(campo, true)
                      )
                    }
                  }}
                >
                  {isLoading
                    ? 'Finalizando pagamento...'
                    : 'Finalizar pagamento'}
                </button>
                <button type="button" onClick={() => setEtapa('entrega')}>
                  Voltar para a edição de endereço
                </button>
              </>
            )}
          </Form>
        ) : (
          <div className="confirmacao">
            <h1>Pedido realizado - {data.orderId}</h1>
            <p>
              Estamos felizes em informar que seu pedido já está em processo de
              preparação e, em breve, será entregue no endereço fornecido.
            </p>
            <p>
              Gostaríamos de ressaltar que nossos entregadores não estão
              autorizados a realizar cobranças extras.
            </p>
            <p>
              Lembre-se da importância de higienizar as mãos após o recebimento
              do pedido, garantindo assim sua segurança e bem-estar durante a
              refeição.
            </p>
            <p>
              Esperamos que desfrute de uma deliciosa e agradável experiência
              gastronômica. Bom apetite!
            </p>
            <button
              onClick={() => {
                dispatch(closeCheckout())
                navigate('/')
              }}
            >
              Concluir
            </button>
          </div>
        )}
      </Box>
    </Overlay>
  )
}
export default Checkout
