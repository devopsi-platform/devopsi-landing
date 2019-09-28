import React from 'react';
import styled, { css } from 'styled-components';
import { usePrimaryColor } from '~/hooks/colors';
import { motion } from 'framer-motion';
import { medium } from '~/services/styles';

interface Props {
  label: string;
  onClick?: () => void;
  inverted?: boolean;
  disabled?: boolean;
}

const ShadowCaster = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 10%;
  right: 10%;
  box-shadow: 0 10px 30px #fff4;
  transition: 0.15s all;
  opacity: 1;
  pointer-events: none;
`;

const Holder = styled.div<{ isDisabled: boolean }>`
  background-color: #fff;
  position: relative;

  font-weight: bold;
  display: inline-block;

  border-radius: 10px;
  cursor: pointer;
  transition: 0.15s all;
  user-select: none;
  transform: translate3d(0, 0, 0);

  ${medium`
    font-size: 16px;
  `}

  ${(props) => {
    if (props.isDisabled) {
      return css`
        opacity: 0.5;
        pointer-events: none !important;
      `;
    }
  }}

  &:hover {
    transform: scale(0.98);

    & ${ShadowCaster} {
      opacity: 0.5;
      transform: translate3d(0, -5px, 0);
    }

    &:active {
      transform: scale(0.96);
    }
  }
`;

const InnerHolder = styled.div`
  padding: 14px 15px 12px;
`;

export function Button({ label, onClick, inverted, disabled }: Props) {
  const color = usePrimaryColor();
  return (
    <Holder onClick={onClick} isDisabled={!!disabled}>
      <motion.div
        style={{
          backgroundColor: inverted ? color : '#fff',
          borderRadius: 10,
        }}
      >
        <InnerHolder>
          <motion.span style={{ color: inverted ? '#fff' : color }}>
            {label}
          </motion.span>
        </InnerHolder>
        {/* <ShadowCaster /> */}
      </motion.div>
    </Holder>
  );
}
