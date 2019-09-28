import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { LargeHeader } from '~/ui/typo';
import { Spacing } from '~/ui/layout';

import { SingleFeature } from './SingleFeature';
import { medium } from '~/services/styles';

export { useFeature } from './SingleFeature';

interface Feature {
  description: ReactNode;
  details: ReactNode;
}

interface Props {
  title: string;
  features: Feature[];
}

const Holder = styled.div``;
const TitleHolder = styled(Spacing)`
  ${medium`
    padding-bottom: 2rem;
  `}
`;
const Title = styled.div`
  max-width: 600px;
`;
const FeaturesHolder = styled.div``;
const SingleFeatureHolder = styled(Spacing)`
  ${medium`
    padding-bottom: 6rem;
  `}
`;

export function DetailsSection({ title, features }: Props) {
  return (
    <Holder>
      <TitleHolder size="large">
        <Title>
          <LargeHeader>{title}</LargeHeader>
        </Title>
      </TitleHolder>
      <FeaturesHolder>
        {features.map((feature, index) => {
          return (
            <SingleFeatureHolder key={index} size="xlarge">
              <SingleFeature
                details={feature.details}
                description={feature.description}
              />
            </SingleFeatureHolder>
          );
        })}
      </FeaturesHolder>
    </Holder>
  );
}
