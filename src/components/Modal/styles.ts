import styled from 'styled-components'
import { colors } from '../../styles'

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Box = styled.div`
  position: relative;
  background: ${colors.coralPink};
  max-width: 1024px;
  width: 90%;
  height: 344px;
  padding: 32px;
`

export const Close = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  background: transparent;
  font-size: 20px;
  border: none;
  cursor: pointer;

  img {
    display: block;
  }
`

export const ModalContent = styled.div`
  display: flex;
  height: 100%;

  img {
    height: 100%;
    width: 280px;
    object-fit: cover;
  }

  .info {
    margin-left: 24px;
    color: ${colors.white};

    h1 {
      font-size: 18px;
      font-weight: 900;
    }

    p {
      margin-top: 16px;
      font-size: 14px;
      font-weight: 400;
      line-height: 22px;

      &:last-of-type {
        margin-top: 22px;
      }
    }

    button {
      margin-top: 16px;
      background-color: ${colors.lightPeach};
      color: ${colors.coralPink};
      font-weight: 700;
      width: 304px;
      height: 24px;
      border: none;
      cursor: pointer;
      align-self: center;
    }
  }
`
