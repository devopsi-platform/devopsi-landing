import React from 'react';
import styled from 'styled-components';
import { DetailsSection, SectionIntro } from '~/ui/presentation';
import { CodeSnippet } from '~/ui/presentation/code';
import { FilesTree } from '~/ui/presentation/code/FilesTree';
import { DevopsiConfig } from './DevopsiConfig';

interface Props {}

const Holder = styled.div``;

export function AddDatabase({  }: Props) {
  return (
    <Holder>
      <DetailsSection
        title="Add Database with a&nbsp;single&nbsp;line&nbsp;of&nbsp;config."
        features={[
          {
            description: (
              <SectionIntro
                title="Create simple Devopsi config file to&nbsp;define microservice requirements."
                intro="Every microservice can have its own config file that will be used by Devopsi to create additional services."
              />
            ),
            details: <DevopsiConfig />,
          },
          {
            description: (
              <SectionIntro
                title="Start with the basic config. Add&nbsp;details&nbsp;if&nbsp;you&nbsp;need&nbsp;them."
                intro="Writing only one line of config is enough to provide your service with the working database. If you'll need to be more specific (eg. using the exact version of your database), you can define it later."
              />
            ),
            details: (
              <CodeSnippet
                language="yaml"
                fileName="myapp/products/devopsi.yml"
                content={`
                  database="postgres"
            `}
              />
            ),
          },
          {
            description: (
              <SectionIntro
                title="Database credentials are&nbsp;injected to microservice automatically."
                intro="Use your favorite database client. Initialize it with variables in your environment (db url, db name, password etc.)."
              />
            ),
            details: (
              <CodeSnippet
                language="javascript"
                fileName="myapp/products/server.js"
                content={`
                  const { Client } = require('pg');
                  
                  // DB_URL is automatically injected, both on your local machine and in the cloud
                  const dbClient = new Client(process.env.DB_URL);
                  const results = await dbClient.query('SELECT * FROM products');
              `}
              />
            ),
          },

          {
            description: (
              <SectionIntro
                title="Seed your database or&nbsp;define&nbsp;migrations."
                intro="You can create SQL files inside the 'database' folder of your service. Those files can include seed data or migrations. They will be executed automatically when needed."
              />
            ),
            details: (
              <CodeSnippet
                language="sql"
                fileName="myapp/products/database/seed.sql"
                content={`
                DROP TABLE IF EXISTS products;

                CREATE TABLE products(id SERIAL PRIMARY KEY, name VARCHAR(255), price INT);
                INSERT INTO products(name, price) VALUES('Shoes', 99);
                INSERT INTO products(name, price) VALUES('T-Shirt', 20);
    `}
              />
            ),
          },
        ]}
      />
    </Holder>
  );
}
