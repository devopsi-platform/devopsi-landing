import { css } from 'styled-components';

export const HANDHELD_BREAKPOINT = 840;
export const MEDIUM_BREAKPOINT = 840;

export const handheld = (...args: any[]) => css`
  @media (max-width: ${HANDHELD_BREAKPOINT}px) {
    ${(css as any)(...args)};
  }
`;

export const medium = (...args: any[]) => css`
  @media (max-width: ${MEDIUM_BREAKPOINT}px) {
    ${(css as any)(...args)};
  }
`;

export const notMedium = (...args: any[]) => css`
  @media (min-width: ${MEDIUM_BREAKPOINT + 1}px) {
    ${(css as any)(...args)};
  }
`;
