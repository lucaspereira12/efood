import styled from 'styled-components'
import { breakpoints, colors } from '../../styles'

export const HeaderContainer = styled.header`
  min-height: 163px;
  position: relative;

  .container {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: start;
    position: relative;

    @media (max-width: ${breakpoints.tablet}) {
      flex-direction: column;
      align-items: center;
    }
  }

  .link-restaurante,
  button {
    color: ${colors.coralPink};
    text-decoration: none;
    font-size: 18px;
    margin-top: 59px;
    z-index: 1;
  }

  button {
    border: none;
    background-color: transparent;
    cursor: pointer;
  }

  .link-logo {
    position: absolute;
    margin-top: 40px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;

    img {
      display: block;
    }

    @media (max-width: ${breakpoints.tablet}) {
      position: static;
      transform: none;
    }
  }

  @media (max-width: ${breakpoints.tablet}) {
    .link-restaurante,
    button {
      margin-top: 10px;
    }

    button {
      margin-bottom: 10px;
    }
  }

  @media (max-width: ${breakpoints.tablet}) {
    .link-logo {
      order: -1;
    }
  }
`
