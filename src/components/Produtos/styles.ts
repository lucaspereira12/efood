import styled from 'styled-components'
import { breakpoints, colors } from '../../styles'

export const ProdutosContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  margin-top: 56px;
  margin-bottom: 120px;

  @media (max-width: ${breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${breakpoints.mobile}) {
    display: block;
    grid-template-columns: 1fr;
    justify-items: center;
  }
`

export const Item = styled.div`
  width: 100%;
  background-color: ${colors.coralPink};
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 8px;
  color: ${colors.white};

  @media (max-width: ${breakpoints.mobile}) {
    margin-bottom: 32px;
  }

  img {
    width: 100%;
    height: auto;
    display: block;
  }

  h1 {
    font-family: Roboto;
    font-weight: 900;
    font-size: 16px;
    margin-top: 8px;
  }

  p {
    font-size: 14px;
    width: 100%;
    margin-top: 8px;
  }

  button {
    margin-top: 8px;
    background-color: ${colors.lightPeach};
    color: ${colors.coralPink};
    width: 100%;
    height: 24px;
    border: none;
    cursor: pointer;
  }
`
