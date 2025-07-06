import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

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

export type Produto = {
  id: number
  nome: string
  descricao: string
  foto: string
  preco: number
  porcao: string
}

type EtapaCheckout = 'carrinho' | 'entrega' | 'pagamento' | 'confirmacao'

const Perfil = () => {
  const { id } = useParams()
  const restauranteId = Number(id)
  const [carrinho, setCarrinho] = useState<Produto[]>(() => {
    const carrinhoSalvo = localStorage.getItem('carrinho')
    return carrinhoSalvo ? JSON.parse(carrinhoSalvo) : []
  })
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

  useEffect(() => {
    localStorage.setItem('carrinho', JSON.stringify(carrinho))
  }, [carrinho])

  if (isLoading) return <p>Carregando...</p>
  if (error || !restaurante) return <p>Erro ao carregar restaurante.</p>

  const detalhes = (produto: Produto) => {
    setProdutoSelecionado(produto)
    setShowForm(true)
  }

  const addCarrinho = (produto: Produto) => {
    setCarrinho([...carrinho, produto])
    setShowForm(false)
    setEtapaCheckout('carrinho')
  }

  const removerProduto = (index: number) => {
    const novoCarrinho = [...carrinho]
    novoCarrinho.splice(index, 1)
    setCarrinho(novoCarrinho)
  }

  const valorTotal = carrinho.reduce((soma, item) => soma + item.preco, 0)

  const finalizarPedido = () => {
    setOrderId(Math.floor(Math.random() * 100000))
    setEtapaCheckout('confirmacao')
  }

  const voltarParaInicio = () => {
    setCarrinho([])
    localStorage.removeItem('carrinho')
    setEtapaCheckout(null)
    setOrderId(null)
  }

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
          produtos={carrinho}
          onClose={() => setEtapaCheckout(null)}
          onRemove={removerProduto}
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
