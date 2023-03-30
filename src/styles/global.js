import { css, createGlobalStyle } from "styled-components";
import styledReset from 'styled-reset';

const reset = css`
  ${styledReset}
`;

const GlobalStyles = createGlobalStyle`
  ${reset}
`;

export default GlobalStyles;
