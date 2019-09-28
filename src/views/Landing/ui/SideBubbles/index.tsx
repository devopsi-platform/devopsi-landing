import React from 'react';
import styled from 'styled-components';
import {
  useViewportScroll,
  motion,
  useSpring,
  useTransform,
} from 'framer-motion';
import { useMotionVelocity } from '~/services/animations';
import { Container } from '~/ui';

import { Bubble } from './Bubble';
import { medium } from '~/services/styles';

const Holder = styled.div`
  position: fixed;
  pointer-events: none;
  top: 0;
  left: 0;
  right: 0;
  z-index: 3;

  ${medium`
    display: none;
  `}
`;
const SizeContainer = styled(Container)`
  position: relative;
`;
const LeftBubbles = styled.div`
  position: absolute;
  top: 0;
  left: 0;
`;

const RightBubbles = styled.div`
  position: absolute;
  top: 0;
  left: 100%;
`;

function useScrollWiggleTransformY() {
  const { scrollY } = useViewportScroll();

  const scrollVelocity = useMotionVelocity(scrollY);
  const translateY = useTransform(scrollVelocity, [-110, 0, 110], [1, 0, -1], {
    clamp: false,
  });

  const smoothTranslateY = useSpring(translateY);

  return smoothTranslateY;
}

export function SideBubbles() {
  const { scrollY, scrollYProgress } = useViewportScroll();

  const rotateZ = useTransform(scrollYProgress, [0, 1], [0, 15]);
  // const invertedTranslateY = useTransform(translateY, [0, 1], [0, -1], {
  //   clamp: false,
  // });

  return (
    <Holder>
      <SizeContainer>
        <LeftBubbles>
          <motion.div
            style={{
              rotateZ: rotateZ,
            }}
          >
            <Bubble
              size={400}
              offsetX={-500}
              rounding={0.9}
              offsetY={-100}
              invertWiggle
            />
            <Bubble
              size={600}
              offsetX={-800}
              rounding={1}
              offsetY={300}
              invertWiggle
            />
            <Bubble
              size={200}
              offsetX={-400}
              rounding={0.8}
              offsetY={870}
              invertWiggle
            />
          </motion.div>
        </LeftBubbles>
        <RightBubbles>
          <motion.div
            style={{
              rotateZ: rotateZ,
            }}
          >
            <Bubble size={600} offsetX={100} rounding={1} offsetY={-50} />
            <Bubble size={140} offsetX={110} rounding={1} offsetY={495} />
            <Bubble size={400} offsetX={180} rounding={0.9} offsetY={570} />
          </motion.div>
        </RightBubbles>
      </SizeContainer>
    </Holder>
  );
}
