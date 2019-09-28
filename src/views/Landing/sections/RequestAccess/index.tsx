import React from 'react';
import styled from 'styled-components';
import { HeroHeader, Spacing, LargeHeader } from '~/ui';
import { Button } from '~/ui/buttons';
import { useRequestAccess } from '~/domains/requestAccess';
import { medium } from '~/services/styles';

const Holder = styled.div`
  ${medium`
    padding-top: 2rem;
  `}
`;
const TitleHolder = styled.div`
  max-width: 560px;
`;

const CTAHolder = styled.div``;

export function RequestAccess() {
  const { open } = useRequestAccess();

  // setRequestAccessState({});
  return (
    <Holder>
      <Spacing>
        <TitleHolder>
          <LargeHeader>
            Request Devopsi early access and use it for 2&nbsp;months
            for&nbsp;free.
          </LargeHeader>
        </TitleHolder>
      </Spacing>
      <CTAHolder>
        <Button label="Request Access" onClick={open} inverted />
      </CTAHolder>
    </Holder>
  );
  return null;
}
