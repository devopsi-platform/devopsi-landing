import React from 'react';
import styled from 'styled-components';
import { HeroHeader, Spacing } from '~/ui';
import { Button } from '~/ui/buttons';
import { useRequestAccess } from '~/domains/requestAccess';

interface Props {}

const Holder = styled.div`
  min-height: 400px;
  height: 40vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const SloganHolder = styled.div`
  max-width: 700px;
`;

const CTAHolder = styled.div``;

export function Intro({  }: Props) {
  const { open } = useRequestAccess();

  return (
    <Holder>
      <SloganHolder>
        <Spacing>
          <HeroHeader>
            Microservices for teams without DevOps experience.
          </HeroHeader>
        </Spacing>
        <CTAHolder>
          <Button label="Request Access" onClick={open} />
        </CTAHolder>
      </SloganHolder>
    </Holder>
  );
}
