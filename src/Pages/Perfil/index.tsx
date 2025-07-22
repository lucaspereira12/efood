import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Banner from '../../components/Banner'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import Produtos from '../../components/Produtos'
import Modal from '../../components/Modal'
import Carrinho from '../../components/Carrinho'
import Entrega from '../../components/Entrega'
import Pagamento from '../../components/Pagamento'
import Confirmacao from '../../components/Confirmacao'

import { useGetRestaurantePorIdQuery } from '../../services/api'
import { RootReducer } from '../../store'
import { add, clear } from '../../store/reducers/cart'

import { Produto } from '../../Pages/Home'

type EtapaCheckout = 'carrinho' | 'entrega' | 'pagamento' | 'confirmacao'

const Perfil = () => {
  const { id } = useParams()
  const restauranteId = Number(id)

  const dispatch = useDispatch()
  const carrinho = useSelector((state: RootReducer) => state.carrinho.itens)

  const valorTotal = carrinho.reduce((soma, item) => soma + item.preco, 0)

  const [showForm, setShowForm] = useState(false)
  const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(
    null
  )
  const [etapaCheckout, setEtapaCheckout] = useState<EtapaCheckout | null>(null)
  const [orderId, setOrderId] = useState<number | null>(null)

  const {
    data: restaurante,
    isLoading,
    error
  } = useGetRestaurantePorIdQuery(restauranteId)

  const detalhes = (produto: Produto) => {
    setProdutoSelecionado(produto)
    setShowForm(true)
  }

  const addCarrinho = (produto: Produto) => {
    const produtoAdicionado = carrinho.some((item) => item.id === produto.id)

    if (produtoAdicionado) {
      alert('O produto já foi adicionado ao carrinho.')
      return
    }

    dispatch(add(produto))
    setShowForm(false)
    setEtapaCheckout('carrinho')
  }

  const finalizarPedido = () => {
    setOrderId(Math.floor(Math.random() * 100000))
    setEtapaCheckout('confirmacao')
  }

  const voltarParaInicio = () => {
    dispatch(clear())
    setEtapaCheckout(null)
    setOrderId(null)
  }

  if (isLoading) return <p>Carregando...</p>
  if (error || !restaurante) return <p>Erro ao carregar restaurante.</p>

  return (
    <>
      <Header
        produtos={carrinho}
        onCarrinhoClick={() => setEtapaCheckout('carrinho')}
      />

      <Banner
        capa={restaurante.capa}
        titulo={restaurante.titulo}
        tipo={restaurante.tipo}
      />

      <Produtos restaurante={restaurante} maisDetalhes={detalhes} />

      <Footer />

      <Modal
        show={showForm}
        onClose={() => setShowForm(false)}
        produto={produtoSelecionado}
        addCarrinho={addCarrinho}
      />

      {etapaCheckout === 'carrinho' && (
        <Carrinho
          onClose={() => setEtapaCheckout(null)}
          onContinuar={() => setEtapaCheckout('entrega')}
        />
      )}

      {etapaCheckout === 'entrega' && (
        <Entrega
          onContinuar={() => setEtapaCheckout('pagamento')}
          onVoltar={() => setEtapaCheckout('carrinho')}
        />
      )}

      {etapaCheckout === 'pagamento' && (
        <Pagamento
          total={valorTotal}
          onFinalizar={finalizarPedido}
          onVoltar={() => setEtapaCheckout('entrega')}
        />
      )}

      {etapaCheckout === 'confirmacao' && orderId && (
        <Confirmacao orderId={orderId} onConcluir={voltarParaInicio} />
      )}
    </>
  )
}

export default Perfil
