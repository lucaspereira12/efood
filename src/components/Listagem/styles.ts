import styled from 'styled-components'
import { breakpoints, colors } from '../../styles'

export const ListagemDeRestaurantes = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 80px;
  margin-top: 80px;
  margin-bottom: 120px;

  @media (max-width: ${breakpoints.tablet}) {
    display: block;
    grid-template-columns: 1fr;
    justify-items: center;
  }
`

export const Item = styled.div`
  max-width: 472px;
  background-color: ${colors.white};
  display: flex;
  flex-direction: column;
  position: relative;

  @media (max-width: ${breakpoints.tablet}) {
    margin-bottom: 80px;
  }

  img {
    width: 100%;
    height: auto;
    display: block;
  }

  .categoria-container {
    position: absolute;
    top: 16px;
    right: 16px;
    display: flex;
    gap: 8px;
  }

  .informacoes-do-restaurante {
    color: ${colors.coralPink};
    padding: 8px;
    border: solid 1px ${colors.coralPink};
    border-top: none;
    height: 100%;

    .titulo-avaliacao {
      display: flex;
      justify-content: space-between;
      margin-bottom: 8px;

      h1 {
        font-weight: 700;
        font-size: 18px;
      }

      div {
        display: flex;
        align-items: center;
        font-size: 16px;
        font-weight: 700;

        img {
          width: 21px;
          height: 21px;
          margin-right: 8px;
        }
      }
    }

    p {
      font-size: 14px;
      width: 100%;
      margin-top: 16px;
    }

    button {
      margin-top: 16px;
      background-color: ${colors.coralPink};
      color: ${colors.white};
      width: 82px;
      height: 24px;
      border: none;
      cursor: pointer;
    }
  }
`

export const Tipo = styled.div`
  background-color: ${colors.coralPink};
  color: ${colors.white};
  font-size: 12px;
  font-weight: 700;
  width: 61px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Destaque = styled.div`
  background-color: ${colors.coralPink};
  color: ${colors.white};
  font-size: 12px;
  font-weight: 700;
  width: 121px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
`
