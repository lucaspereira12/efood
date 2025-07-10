import styled from 'styled-components'
import { breakpoints, colors } from '../../styles'

export const FooterContainer = styled.footer`
  background-color: ${colors.lightPeach};
  width: 100%;
  margin-top: 120px;
  padding-top: 40px;
  padding-bottom: 40px;

  > a {
    display: block;
    margin: 0 auto;
    width: fit-content;

    img {
      display: block;
    }
  }

  ul {
    display: flex;
    margin: 32px auto 0;
    width: fit-content;

    li {
      margin-right: 8px;

      &:last-child {
        margin-right: 0;
      }

      a img {
        width: 24px;
        height: 24px;
        display: block;
      }
    }
  }

  p {
    max-width: 480px;
    height: 24px;
    font-size: 10px;
    font-weight: 400px;
    color: ${colors.coralPink};
    text-align: center;
    margin: 80px auto 0;

    @media (max-width: ${breakpoints.tablet}) {
      width: 80%;
      height: auto;
    }
  }
`
