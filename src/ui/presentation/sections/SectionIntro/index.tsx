import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { Header, Typography } from '~/ui/typo';
import { Spacing } from '~/ui/layout';

interface Props {
  title: string;
  intro: ReactNode;
}

const Holder = styled.div`
  max-width: 450px;
`;
const Title = styled(Spacing)``;
const Intro = styled.div``;

export function SectionIntro({ title, intro }: Props) {
  return (
    <Holder>
      <Title size="xsmall">
        <Header>{title}</Header>
      </Title>
      <Typography>
        <Intro>{intro}</Intro>
      </Typography>
    </Holder>
  );
}
