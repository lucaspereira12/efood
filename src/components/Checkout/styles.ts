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
    margin-bottom: 8px;
  }

  .confirmacao {
    h1 {
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
  }
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;

  label {
    font-size: 14px;
    font-weight: 700;
    display: flex;
    flex-direction: column;
    margin-top: 8px;
  }

  input {
    height: 32px;
    padding: 8px;
    font-size: 14px;
    font-weight: 700;
    border: 2px solid transparent;
    box-sizing: border-box;
    margin-top: 8px;
    outline: none;
    background-color: ${colors.lightPeach};
    color: ${colors.grayDark};

    &.erro {
      border-color: red;
      box-shadow: 0 0 2px red;
    }
  }

  .row-cep {
    display: flex;
    gap: 34px;

    input {
      width: 100%;
    }
  }

  .row-cartao {
    display: flex;
  }

  .row-cartao:first-of-type {
    gap: 30px;

    label:first-of-type input {
      width: 228px;
    }

    label:last-of-type input {
      width: 87px;
    }
  }

  .row-cartao:last-of-type {
    gap: 34px;

    input {
      width: 100%;
    }
  }

  button {
    background-color: ${colors.lightPeach};
    color: ${colors.coralPink};
    font-weight: bold;
    font-size: 14px;
    height: 32px;
    border: none;
    cursor: pointer;

    &:first-of-type {
      margin-top: 24px;
    }

    &:last-of-type {
      margin-top: 8px;
    }
  }
`

export const MessageCep = styled.div`
  position: absolute;
  background-color: #333;
  color: white;
  padding: 6px 10px;
  border-radius: 4px;
  font-size: 12px;
  top: 36px;
  left: 0;
  margin-top: 6px;
  white-space: nowrap;
  z-index: 3;
`

export const CepContainer = styled.div`
  position: relative;
  display: block;
`
