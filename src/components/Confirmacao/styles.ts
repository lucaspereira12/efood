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
  color: ${colors.lightPeach};

  h1 {
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 16px;
  }

  p {
    font-size: 14px;
    font-weight: 400;
    margin-bottom: 26px;
  }

  button {
    background-color: ${colors.lightPeach};
    color: ${colors.coralPink};
    font-weight: bold;
    font-size: 14px;
    width: 100%;
    height: 24px;
    border: none;
    cursor: pointer;
  }
`
