import styled from 'styled-components'
import { breakpoints, colors } from '../../styles'

export const BannerContainer = styled.div`
  height: 280px;
  padding-top: 24px;
  position: relative;

  h1 {
    position: relative;
    margin-left: 170px;
    font-size: 32px;
    font-weight: 100;
    color: ${colors.white};
  }

  h2 {
    position: absolute;
    bottom: 32px;
    left: 170px;
    font-size: 32px;
    font-weight: 900;
    color: ${colors.white};
  }

  @media (max-width: ${breakpoints.tablet}) {
    h1,
    h2 {
      left: 50%;
      transform: translateX(-50%);
      margin-left: 0;
      text-align: center;
    }
  }
`
