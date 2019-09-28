import { createGlobalStyle } from 'styled-components';
import { colors } from '~/config';
import { medium } from '~/services/styles';

export * from './FontsStyles';

export const LandingStyles = createGlobalStyle`
  body, html {
    /* background: linear-gradient(#e66465, #9198e5); */
    background: linear-gradient(${colors.primary}, ${colors.secondary});
    background-color: ${colors.primary};

    & ::selection {
      background-color: ${colors.primary};
      color: #fff;
    }

    ${medium`
      font-size: 16px;
    `}
  }

  * {
    scroll-behavior: smooth;
  }
`;
