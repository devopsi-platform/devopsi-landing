import React from 'react';
import styled from 'styled-components';
import { Bold } from '~/ui/typo';
import { Container } from '~/ui/layout';
import { useViewportScroll, motion, useTransform } from 'framer-motion';
import { colors } from '~/config';
import { usePrimaryColor } from '~/hooks/colors';
import { WiggleDrag } from '~/ui/interactions';
import { medium } from '~/services/styles';

const Placeholder = styled.div`
  min-height: 80px;
`;

const TopBarHolder = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2;

  ${medium`
    position: static;
  `}
`;
const Holder = styled.div`
  font-weight: bold;
  font-size: 24px;
  padding: 2rem 0;
`;

const LogoButton = styled(Bold)`
  cursor: pointer;
  position: relative;
  display: inline-block;
  user-select: none;
`;

const BetaSign = styled.div`
  font-size: 10px;
  position: absolute;
  top: -5px;
  font-weight: bold;
  left: 100%;
  background-color: #fff;
  padding: 2px 3px;
  border-radius: 4px;
`;

export function TopBar() {
  const backgroundColor = usePrimaryColor();
  return (
    <Placeholder>
      <TopBarHolder>
        <motion.div
          style={{
            backgroundColor,
          }}
        >
          <Holder>
            <Container>
              <LogoButton
                onClick={() => {
                  scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                Devopsi.
              </LogoButton>
            </Container>
          </Holder>
        </motion.div>
      </TopBarHolder>
    </Placeholder>
  );
}
