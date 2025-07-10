import styled from 'styled-components'
import { breakpoints, colors } from '../../styles'

export const ProdutosContainer = styled.div`
  margin-top: 56px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;

  @media (max-width: ${breakpoints.desktop}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${breakpoints.tablet}) {
    display: block;
  }
`

export const Item = styled.div`
  background-color: ${colors.coralPink};
  width: 320px;
  padding: 8px;

  @media (max-width: ${breakpoints.desktop}) {
    width: 368px;
  }

  @media (max-width: ${breakpoints.tablet}) {
    width: 80%;
    margin: 0 auto 32px;
  }

  img {
    width: 100%;
    height: 167px;
    object-fit: cover;
    display: block;
  }

  h1 {
    color: ${colors.lightPeach};
    font-size: 16px;
    font-weight: 900;
    margin-top: 8px;
  }

  p {
    color: ${colors.lightPeach};
    font-size: 14px;
    font-weight: 400;
    margin-top: 8px;
    line-height: 22px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
  }

  button {
    margin-top: 8px;
    background-color: ${colors.lightPeach};
    color: ${colors.coralPink};
    font-weight: 700;
    width: 100%;
    height: 24px;
    border: none;
    cursor: pointer;
  }
`
