import React from 'react';
import { createGlobalStyle, css } from 'styled-components';
import { fonts } from './fonts';

interface FontData {
  family: string;
  weight: string;
  style: string;
  woff: string;
  woff2: string;
}

function getFontFaceCss({ family, style, weight, woff, woff2 }: FontData) {
  return css`
    @font-face {
      font-family: ${family};
      src: url(${woff}) format('woff2'), url(${woff2}) format('woff');
      font-weight: ${weight};
      font-style: ${style};
    }
  `;
}

const AVENIR_FAMILY = 'Avenir Next';

const FontFaces = createGlobalStyle`
  ${getFontFaceCss({
    family: AVENIR_FAMILY,
    style: 'normal',
    weight: 'bold',
    woff: fonts.AvenirNextBold,
    woff2: fonts.AvenirNextBold2,
  })};

  ${getFontFaceCss({
    family: AVENIR_FAMILY,
    style: 'normal',
    weight: '900',
    woff: fonts.AvenirNextHeavy,
    woff2: fonts.AvenirNextHeavy2,
  })};

  ${getFontFaceCss({
    family: AVENIR_FAMILY,
    style: 'normal',
    weight: '500',
    woff: fonts.AvenirNextMedium,
    woff2: fonts.AvenirNextMedium,
  })};

  ${getFontFaceCss({
    family: AVENIR_FAMILY,
    style: 'normal',
    weight: 'normal',
    woff: fonts.AvenirNextRegular,
    woff2: fonts.AvenirNextRegular2,
  })};

`;

const FontsSettings = createGlobalStyle`
  body {
    font-family: ${AVENIR_FAMILY}, Helvetica Neue, sans-serif;
  }
`;

export function FontsStyles() {
  return (
    <>
      <FontFaces />
      <FontsSettings />
    </>
  );
}
