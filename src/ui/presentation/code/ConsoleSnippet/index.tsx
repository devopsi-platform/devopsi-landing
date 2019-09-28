import React from 'react';
import styled from 'styled-components';

interface Props {
  content: string;
  fileName?: string;
}

const Holder = styled.div``;

export function ConsoleSnippet({ content, fileName }: Props) {
  return <Holder>{content}</Holder>;
}
