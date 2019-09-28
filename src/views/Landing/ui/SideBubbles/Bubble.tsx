import React from 'react';
import styled from 'styled-components';
import {
  useViewportScroll,
  useSpring,
  useTransform,
  motion,
  MotionValue,
} from 'framer-motion';
import { useMotionVelocity } from '~/services/animations';
import { Container } from '~/ui';
import { WiggleDrag } from '~/ui/interactions';

const Holder = styled.div`
  pointer-events: all;
`;

const BubbleCircle = styled.div<{
  size: number;
  offsetX: number;
  offsetY: number;
  rounding: number;
}>`
  position: absolute;
  height: ${(props) => props.size}px;
  width: ${(props) => props.size}px;
  background: #fff8;
  box-sizing: border-box;
  border-radius: ${(props) => (props.size / 2) * props.rounding}px;
  opacity: 0.04;
  transform: rotate(45deg);

  left: ${(props) => props.offsetX}px;
  top: ${(props) => props.offsetY}px;

  transition: 0.15s opacity;
  cursor: grab;

  &:active {
    cursor: grabbing;
  }

  &:hover {
    opacity: 0.1;
  }
`;

interface Props {
  size: number;
  offsetX: number;
  offsetY: number;
  rounding: number;
  invertWiggle?: boolean;
}

function useScrollWiggleTransformY(ratio = 100) {
  const { scrollY } = useViewportScroll();

  const scrollVelocity = useMotionVelocity(scrollY);
  const translateY = useTransform(
    scrollVelocity,
    [-ratio, 0, ratio],
    [1, 0, -1],
    {
      clamp: false,
    },
  );

  const smoothTranslateY = useSpring(translateY);

  return smoothTranslateY;
}

function useInvertedTransform(transform: MotionValue<number>) {
  return useTransform(transform, [0, 1], [0, -1], {
    clamp: false,
  });
}

export function Bubble({
  size,
  rounding,
  offsetX,
  offsetY,
  invertWiggle,
}: Props) {
  const translateY = useScrollWiggleTransformY(size / 2);
  const invertedTranslateY = useInvertedTransform(translateY);

  return (
    <Holder>
      <WiggleDrag>
        <BubbleCircle
          size={size}
          offsetX={offsetX}
          rounding={rounding}
          offsetY={offsetY}
        />
      </WiggleDrag>
    </Holder>
  );
}
