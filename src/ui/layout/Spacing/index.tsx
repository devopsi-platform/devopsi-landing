import styled, { css } from 'styled-components';

const spacingMap = {
  xxsmall: 0.5,
  xsmall: 1,
  small: 2,
  regular: 4,
  large: 8,
  xlarge: 16,
};

type SpacingSize = keyof typeof spacingMap;

export function getSpacingSizeInRem(spacingSize: SpacingSize = 'regular') {
  return spacingMap[spacingSize];
}

interface Props {
  size?: SpacingSize;
  isDisabled?: boolean;
  enableTop?: boolean;
}

export const Spacing = styled.div<Props>`
  ${(props) => {
    if (props.isDisabled) {
      return null;
    }

    return css`
      padding-bottom: ${getSpacingSizeInRem(props.size)}rem;
    `;
  }}

  ${(props) => {
    if (props.isDisabled || !props.enableTop) {
      return null;
    }

    return css`
      padding-top: ${getSpacingSizeInRem(props.size)}rem;
    `;
  }}
`;
