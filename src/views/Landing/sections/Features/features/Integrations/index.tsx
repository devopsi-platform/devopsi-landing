import React from 'react';
import styled from 'styled-components';
import { DetailsSection, SectionIntro } from '~/ui/presentation';
import { CodeSnippet } from '~/ui/presentation/code';
import { FilesTree } from '~/ui/presentation/code/FilesTree';
import { DevopsiConfig } from './DevopsiConfig';
import { Pre } from '~/ui';

interface Props {}

const Holder = styled.div``;

export function Integrations({  }: Props) {
  return (
    <Holder>
      <DetailsSection
        title="Integrate with external services for sending&nbsp;emails, managing&nbsp;payments and&nbsp;way&nbsp;more."
        features={[
          {
            description: (
              <SectionIntro
                title="Add integrations using&nbsp;terminal or admin&nbsp;panel."
                intro="Devopsi will create proxy microservice for every integration with simple API."
              />
            ),
            details: (
              <CodeSnippet
                language="shell"
                fileName="terminal"
                content={`
        $ devopsi integrations add mailgun

        [ Devopsi asked for necessary permission in your browser ]

        [ Mailgun service added ]
`}
              />
            ),
          },
          {
            description: (
              <SectionIntro
                title="Use external integrations as&nbsp;local&nbsp;microservices."
                intro={
                  <>
                    There is a special kind of microservice called
                    'integrations'. You can call it from every microservice to
                    use external integration. If you'd like to send email, you
                    can just call <Pre>http://integrations/mailgun/send</Pre>{' '}
                    with email parameters. You don't even have to check external
                    documentations.
                  </>
                }
              />
            ),
            details: (
              <CodeSnippet
                language="javascript"
                fileName="myapp/products/server.js"
                content={`
                  const axios = require('axios');
                
                  // such code can be executed eg. after finishing user registration
                  await axios.post(
                    'http://integrations/mailgun/send', 
                    { 
                      email: 'john@devopsi.dev',
                      topic: 'Hello!',
                      content: 'Hello world!'
                    }
                  );
              `}
              />
            ),
          },
          {
            description: (
              <SectionIntro
                title="Manage secrets and&nbsp;credentials."
                intro="Use terminal or admin panel to define secrets of your project. "
              />
            ),
            details: (
              <CodeSnippet
                language="shell"
                fileName="terminal"
                content={`
        $ devopsi secrets add api_key

        [ Enter your secret value ]
        
        $ super-secret-value

        [ Secret called 'api_key' was added ]
`}
              />
            ),
          },
          {
            description: (
              <SectionIntro
                title="Secrets (and everything else) will work the same way in the cloud and on your latop."
                intro="Secrets will be available both in production and in dev mode when iterating on your machine."
              />
            ),
            details: (
              <CodeSnippet
                language="javascript"
                fileName="myapp/products/server.js"
                content={`
                  const apiKey = process.env.secrets.api_key;

                  console.log(apiKey); // 👻 
              `}
              />
            ),
          },
        ]}
      />
    </Holder>
  );
}
