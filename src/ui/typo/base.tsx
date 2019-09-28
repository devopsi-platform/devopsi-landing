import styled, { css } from 'styled-components';
import { medium } from '~/services/styles';

const headerBaseStyles = css`
  font-weight: bold;
  line-height: 1.5;
`;

export const HeroHeader = styled.h1`
  ${headerBaseStyles}
  font-size: 3rem;

  ${medium`
    font-size: 2rem;
  `}
`;

export const LargeHeader = styled.h2`
  ${headerBaseStyles}
  font-size: 2rem;

  ${medium`
    font-size: 1.5rem;
  `}
`;

export const Header = styled.h2`
  ${headerBaseStyles}
  font-size: 1.5rem;

  ${medium`
    font-size: 1.25rem;
  `}
`;

export const Text = styled.span`
  font-weight: medium;
`;

export const Bold = styled.strong`
  font-weight: bold;
`;

export const Typography = styled.div`
  line-height: 1.5;

  p {
    margin-bottom: 1em;
  }
`;

export const Pre = styled.pre`
  font-family: monospace;
  background-color: #0003;
  display: inline;
`;
