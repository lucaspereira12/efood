import styled from 'styled-components'
import { breakpoints, colors } from '../../styles'

export const HeroContainer = styled.header`
  width: 100%;
  height: 384px;
  padding-top: 64px;
  padding-bottom: 40px;
  text-align: center;
  color: ${colors.coralPink};

  @media (max-width: ${breakpoints.tablet}) {
    height: auto;
  }

  a {
    display: inline-block;

    img {
      display: block;
    }
  }

  h1 {
    font-size: 36px;
    font-weight: 900;
    width: 539px;
    height: 84px;
    margin: 138px auto 0;

    @media (max-width: ${breakpoints.tablet}) {
      width: 85%;
      height: auto;
      font-size: 32px;
    }
  }
`
