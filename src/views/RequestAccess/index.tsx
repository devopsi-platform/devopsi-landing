import React from 'react';
import { Container, TopBar } from '~/ui';
import styled from 'styled-components';
import { colors } from '~/config';
import { useLockBodyScroll } from '~/hooks/dom';

import { RequestAccessModal } from './RequestAccessModal';
import { useRequestAccess } from '~/domains/requestAccess';
import { AnimatePresence, motion } from 'framer-motion';

const Holder = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${colors.primary};
  z-index: 100;
`;

const Content = styled(Container)`
  font-family: monospace;
  padding: 40px 0;
  line-height: 2;
`;

const Row = styled.div``;

const TransparentInput = styled.input`
  font: inherit;
  border: none;
  outline: none;
  background: transparent;
  color: inherit;
`;

export function RequestAccess() {
  const { isOpened } = useRequestAccess();

  if (!isOpened) {
    return null;
  }

  return <RequestAccessModal />;

  return (
    <AnimatePresence>
      {isOpened && (
        <motion.div
          key="request"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <RequestAccessModal />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
