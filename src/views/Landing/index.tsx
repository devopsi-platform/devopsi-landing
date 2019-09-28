import React from 'react';
import styled from 'styled-components';
import { Intro, Features, RequestAccess } from './sections';
import { LandingStyles, FontsStyles } from './styles';
import { SideBubbles } from './ui';
import { Spacing, Container, Footer } from '~/ui';
import { WigglePageEdge } from '~/ui/presentation';
import { colors } from '~/config';
import { medium } from '~/services/styles';

interface Props {}

const Holder = styled.div``;

const FooterHolder = styled.div`
  color: ${colors.secondary};
`;

const IntroHolder = styled(Spacing)`
  ${medium`
    padding-bottom: 3rem;
  `}
`;

export function Landing({  }: Props) {
  return (
    <Holder>
      <LandingStyles />
      <FontsStyles />
      <Container>
        <SideBubbles />
        <IntroHolder size="large">
          <Intro />
        </IntroHolder>
        <Features />
      </Container>
      <WigglePageEdge color="#fff">
        <Container>
          <FooterHolder>
            <Spacing size="large">
              <RequestAccess />
            </Spacing>
            <Footer />
          </FooterHolder>
        </Container>
      </WigglePageEdge>
    </Holder>
  );
}
