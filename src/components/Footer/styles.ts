import styled from 'styled-components'
import { colors } from '../../styles'

export const FooterContainer = styled.footer`
  background-color: ${colors.lightPeach};
  // height: 298px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  img {
    display: block;
  }

  > a > img {
    margin-top: 40px;
  }

  ul {
    display: flex;
    margin-top: 32px;

    li {
      margin-right: 8px;

      &:last-child {
        margin-right: 0;
      }
    }
  }

  p {
    max-width: 480px;
    font-size: 10px;
    font-weight: 400;
    text-align: center;
    color: ${colors.coralPink};
    margin-top: 80px;
    margin-bottom: 40px;
`
