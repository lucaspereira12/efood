export const formatarPreco = (preco: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(preco)
}

export const precoTotal = (items: Produto[]) => {
  return items.reduce((soma, item) => {
    return soma + item.preco
  }, 0)
}
