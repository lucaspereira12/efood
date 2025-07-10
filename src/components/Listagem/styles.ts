import styled from 'styled-components'
import { breakpoints, colors } from '../../styles'

export const ListagemDeRestaurantes = styled.div`
  margin-top: 80px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 80px;

  @media (max-width: ${breakpoints.tablet}) {
    display: block;
  }
`

export const Item = styled.div`
  width: 472px;
  position: relative;

  @media (max-width: ${breakpoints.desktop}) {
    width: 344px;
  }

  @media (max-width: ${breakpoints.tablet}) {
    width: 100%;
    margin-bottom: 80px;
  }

  .categoria-container {
    position: absolute;
    right: 0;
    margin: 16px 16px 0 0;
    display: inline-block;
    justify-content: flex-end;
    color: ${colors.lightPeach};
    font-size: 12px;
    font-weight: 700;
  }

  img {
    width: 100%;
    height: 217px;
    object-fit: cover;
    display: block;
  }

  .informacoes-do-restaurante {
    background-color: ${colors.white};
    color: ${colors.coralPink};
    border: solid 1px ${colors.coralPink};
    border-top: none;
    position: relative;
    padding: 8px 8px 8px 7px;

  .avaliacao {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    position: absolute;
    right: 8px;
    height: 21px;

    span {
      font-size: 18px;
      font-weight: 700;
      height: 100%;
    }

    img {
      width: 21px;
      height: 21px;
      margin-left: 8px;
    }
  }

  h1 {
    font-size: 18px;
    font-weight: 700;
    height: 21px;
  }

  p {
    margin-top: 16px;
    font-size: 14px;
    font-weight: 400;
    line-height: 22px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
  }

  button {
    margin-top: 16px;
    background-color: ${colors.coralPink};
    color: ${colors.lightPeach};
    font-weight: 700;
    width: 82px;
    height: 24px;
    border: none;
    cursor: pointer;
  }
`

const CategoriaBase = styled.div`
  background-color: ${colors.coralPink};
  display: inline-block;
  padding: 6px 4px;
`

export const Destaque = styled(CategoriaBase)`
  margin-right: 8px;
`

export const Tipo = CategoriaBase
