import React from 'react';
import { Container, TopBar } from '~/ui';
import styled from 'styled-components';
import { Landing, RequestAccess } from './views';
import { RequestAccessProvider } from './domains/requestAccess';

import './bootstrap';

export function App() {
  return (
    <RequestAccessProvider>
      <RequestAccess />
      <TopBar />
      <Landing />
    </RequestAccessProvider>
  );
}
