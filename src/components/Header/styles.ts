import styled from 'styled-components'
import { breakpoints, colors } from '../../styles'

export const HeaderContainer = styled.header`
  height: 209px;

  @media (max-width: ${breakpoints.tablet}) {
    height: auto;
  }

  .container {
    position: relative;

    .link-restaurante {
      color: ${colors.coralPink};
      text-decoration: none;
      font-size: 18px;
      font-weight: 900;
      position: absolute;
      margin-top: 82px;
    }

    .link-logo {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);

      img {
        display: block;
        margin-top: 63px;
      }
    }

    button {
      position: absolute;
      right: 0;
      margin-top: 82px;
      border: none;
      background-color: transparent;
      cursor: pointer;
      color: ${colors.coralPink};
      font-size: 18px;
      font-weight: 900;
    }

    @media (max-width: ${breakpoints.tablet}) {
      display: flex;
      flex-direction: column;
      align-items: center;
      height: auto;
      padding-top: 63px;

      .link-logo {
        position: static;
        transform: none;
        order: 0;

        img {
          margin-top: 0;
        }
      }

      .link-restaurante {
        position: static;
        order: 1;
        margin-top: 32px;
      }

      button {
        position: static;
        order: 2;
        margin-top: 10px;
        margin-bottom: 63px;
      }
    }
  }
`
