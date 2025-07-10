import styled from 'styled-components'
import { colors } from '../../styles'

export const BannerContainer = styled.div`
  height: 280px;
  padding-top: 24px;
  position: relative;

  h1 {
    position: relative;
    font-size: 32px;
    font-weight: 100;
    color: ${colors.white};
  }

  h2 {
    position: absolute;
    bottom: 32px;
    font-size: 32px;
    font-weight: 900;
    color: ${colors.white};
  }
`
