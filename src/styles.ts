import { createGlobalStyle } from 'styled-components'

export const colors = {
  coralPink: '#E66767',
  lightPeach: '#FFEBD9',
  snowPink: '#fae0e4',
  softIvory: '#FFF8F2',
  solarGold: '#FFB930',
  white: '#FFFFFF',
  grayDark: '#4B4B4B'
}

export const breakpoints = {
  desktop: '1024px',
  tablet: '768px',
  mobile: '480px'
}

export const GlobalCSS = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Roboto, sans-serif;
    list-style: none;
  }

  body {
    background-color: ${colors.softIvory};
  }

  .container {
    max-width: 1024px;
    width: 90%;
    margin: 0 auto;
  }
`
