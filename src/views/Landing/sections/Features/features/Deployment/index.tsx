import React from 'react';
import styled from 'styled-components';
import { DetailsSection, SectionIntro } from '~/ui/presentation';
import { CodeSnippet, GithubComment } from '~/ui/presentation/code';
import { FilesTree } from '~/ui/presentation/code/FilesTree';
import { DevopsiConfig } from './DevopsiConfig';
import { Spacing, Bold } from '~/ui';

interface Props {}

const Holder = styled.div``;

export function Deployment({  }: Props) {
  return (
    <Holder>
      <DetailsSection
        title="Deployments and Pull Requests demo&nbsp;URL-s out&nbsp;of&nbsp;the&nbsp;box."
        features={[
          {
            description: (
              <SectionIntro
                title="Integrate Devopsi with your&nbsp;GitHub&nbsp;repository."
                intro="When enabled, Devopsi will create copy of your microservices for every Pull Request. Devopsi bot will comment your Pull Request with demo URL."
              />
            ),
            details: (
              <GithubComment
                content={
                  <>
                    Demo link: <a>https://pr-432.thebeststartup.devopsi.dev</a>
                  </>
                }
              />
            ),
          },
          {
            description: (
              <SectionIntro
                title="Every non-production deployment&nbsp;is&nbsp;protected."
                intro="Your work in progress might be sensitive, so only team members are allowed to access non-production deployments. If needed, you can mark any deployment as public to the web."
              />
            ),
            details: (
              <>
                <Spacing size="small">
                  <GithubComment
                    author="pie6k"
                    content={
                      <>
                        <Bold>@devopsibot</Bold> pr-public
                      </>
                    }
                    hoursAgo={3}
                  />
                </Spacing>
                <GithubComment
                  hoursAgo={3}
                  content={
                    <>
                      Demo of this PR is now public for everyone:{' '}
                      <a>https://pr-432.myapp.devopsi.dev</a>
                    </>
                  }
                />
              </>
            ),
          },
          {
            description: (
              <SectionIntro
                title="Deploy to production from&nbsp;master&nbsp;branch."
                intro="You can enable automatic production deployments from choosen branch. They will be in staging mode, until promoted by allowed team member."
              />
            ),
            details: <div />,
          },

          {
            description: (
              <SectionIntro
                title="Deploy manually using&nbsp;terminal."
                intro="At any moment, you can manually trigger production build and deployment using your terminal."
              />
            ),
            details: (
              <CodeSnippet
                language="shell"
                fileName="terminal"
                content={`
            $ devopsi deploy

            [ Building your services... ]
            [ Done... ]

            Your services are deployed to production and connected to your domain: "https://myapp.com"
    `}
              />
            ),
          },
        ]}
      />
    </Holder>
  );
}
