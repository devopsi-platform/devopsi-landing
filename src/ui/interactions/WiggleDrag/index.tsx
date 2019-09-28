import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

interface Props {
  children: ReactNode;
  dragPropagation?: boolean;
}

const Holder = styled.div`
  cursor: grab;

  &:active {
    cursor: grabbing;
  }
`;

export function WiggleDrag({ children, dragPropagation }: Props) {
  return (
    <motion.div
      style={{ flexGrow: 1 }}
      drag
      dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
      dragPropagation={dragPropagation}
      dragTransition={{ bounceStiffness: 600, bounceDamping: 15 }}
      dragElastic={0.1}
    >
      <Holder>{children}</Holder>
    </motion.div>
  );
}
