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

  h1 {
    color: ${colors.lightPeach};
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 8px;
  }
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;

  label {
    color: ${colors.lightPeach};
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
    border: none;
    margin-top: 8px;
    outline: none;
    background-color: ${colors.lightPeach};
    color: ${colors.grayDark};
  }

  .row {
    display: flex;
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

export const Message = styled.div`
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
