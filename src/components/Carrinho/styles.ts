import styled from 'styled-components'
import { colors } from '../../styles'

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 2;
`

export const Box = styled.div`
  position: fixed;
  background: ${colors.coralPink};
  top: 0;
  right: 0;
  width: 360px;
  height: 100vh;
  padding: 32px 8px 8px;
  overflow-y: auto;

  > p {
    color: ${colors.white};
  }

  .valor-total {
    margin-top: 40px;
  }

  button {
    margin-top: 16px;
    background-color: ${colors.lightPeach};
    color: ${colors.coralPink};
    font-size: 14px;
    font-weight: 700;
    width: 100%;
    height: 24px;
    border: none;
    cursor: pointer;
    align-self: center;
  }
`

export const Item = styled.div`
  background-color: ${colors.lightPeach};
  height: 100px;
  margin-bottom: 16px;
  padding: 8px 8px 12px;
  display: flex;
  position: relative;

  img {
    width: 80px;
    object-fit: cover;
    margin-right: 10px;
  }

  .descricao {
    display: flex;
    flex-direction: column;
    color: ${colors.coralPink};

    h1 {
      font-size: 18px;
      font-weight: 900;
    }

    p {
      margin-top: 16px;
    }
  }

  .lixeira {
    position: absolute;
    right: 0;
    bottom: 8px;
    width: 16px;
    height: 16px;
    cursor: pointer;
  }
`
