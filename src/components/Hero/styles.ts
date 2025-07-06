import styled from 'styled-components'
import { colors } from '../../styles'

export const HeroContainer = styled.header`
  height: 360px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  img {
    margin-top: 40px;
  }

  h1 {
    margin-bottom: 40px;
    max-width: 539px;
    text-align: center;
    font-size: 36px;
    font-weight: 900;
    color: ${colors.coralPink};
  }
`
