import React from 'react';
import styled from 'styled-components';
import {
  MicroservicesFolders,
  AddDatabase,
  Deployment,
  Integrations,
} from './features';
import { Spacing } from '~/ui';
import { medium } from '~/services/styles';

interface Props {}

const Holder = styled.div``;
const FeatureHolder = styled(Spacing)`
  ${medium`
    padding-bottom: 4rem;
  `}
`;

export function Features({  }: Props) {
  return (
    <Holder>
      <FeatureHolder size="xlarge">
        <MicroservicesFolders />
      </FeatureHolder>
      <FeatureHolder size="xlarge">
        <AddDatabase />
      </FeatureHolder>
      <FeatureHolder size="xlarge">
        <Integrations />
      </FeatureHolder>
      <Deployment />
    </Holder>
  );
}
