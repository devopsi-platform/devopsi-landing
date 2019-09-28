import React from 'react';
import styled from 'styled-components';
import { DetailsSection, SectionIntro } from '~/ui/presentation';
import { CodeSnippet } from '~/ui/presentation/code';
import { NewServiceFiles } from './NewServiceFiles';
import { Bold } from '~/ui';

interface Props {}

const Holder = styled.div``;

export function MicroservicesFolders({  }: Props) {
  return (
    <Holder>
      <DetailsSection
        title="Your folders are your microservices."
        features={[
          {
            description: (
              <SectionIntro
                title="New Folder = New Microservice."
                intro="Devopsi will create microservice for every folder in your project. The folder name is the microservice name and it can be used for microservices to communicate with each other."
              />
            ),
            details: <NewServiceFiles />,
          },
          {
            description: (
              <SectionIntro
                title="Use Docker to define your&nbsp;technology&nbsp;stack."
                intro="The only requirement is that your service listens&nbsp;on&nbsp;port&nbsp;80."
              />
            ),
            details: (
              <CodeSnippet
                language="dockerfile"
                fileName="myapp/hello-service/Dockerfile"
                content={`
                  FROM node:10
                  WORKDIR /usr/src/app

                  COPY package*.json ./
                  
                  RUN npm install
                  COPY . .
                  
                  # Exposing port 80 is the only requirement
                  EXPOSE 80
                  CMD [ "node", "server.js" ]
            `}
              />
            ),
          },
          {
            description: (
              <SectionIntro
                title="Implement your service as you&nbsp;would&nbsp;normally&nbsp;do."
                intro="You don't have to worry about how your service will be included in your infrastructure."
              />
            ),
            details: (
              <CodeSnippet
                language="javascript"
                fileName="myapp/hello-service/server.js"
                content={`
                const express = require('express');
                const app = express();
                
                app.get('/hello', (req, res) => res.send('Hello World!'))
                
                app.listen(80, () => console.log('Service ready'))
            `}
              />
            ),
          },

          {
            description: (
              <SectionIntro
                title="Run your entire infrastructure with&nbsp;a&nbsp;single&nbsp;command."
                intro={
                  <>
                    Devopsi will build all your microservices and create
                    personal URL ready to use.{' '}
                    <Bold>
                      It will also update services after every file change.
                    </Bold>
                  </>
                }
              />
            ),
            details: (
              <CodeSnippet
                language="shell"
                fileName="terminal"
                content={`
            $ devopsi dev

            [ Building your services... ]
            [ Done... ]

            Your services are available at "https://john.myapp.devopsi.dev"

            [ Waiting for file changes... ]
    `}
              />
            ),
          },
          {
            description: (
              <SectionIntro
                title="Every member of your organization can&nbsp;access your&nbsp;Devopsi&nbsp;URL."
                intro="You can show your progress or debug with other team members."
              />
            ),
            details: (
              <CodeSnippet
                language="shell"
                fileName="terminal"
                content={`
            $ curl https://john.myapp.devopsi.dev/hello-service/hello

            Hello, world!
    `}
              />
            ),
          },
          {
            description: (
              <SectionIntro
                title="All microservices can communicate using&nbsp;their&nbsp;names."
                intro="Local DNS will automatically resolve service names to the local IP address."
              />
            ),
            details: (
              <CodeSnippet
                language="javascript"
                fileName="myapp/other-service/handler.js"
                content={`
                const response = await fetch('http://hello-service/hello');
        `}
              />
            ),
          },
        ]}
      />
    </Holder>
  );
}
