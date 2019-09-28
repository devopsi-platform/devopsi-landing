import React from 'react';
import styled from 'styled-components';
import Prism from 'prismjs';
import outdent from 'outdent';

import { SyntaxHighlight } from './SyntaxHighlight';
import { motion } from 'framer-motion';
import { WiggleDrag } from '~/ui/interactions';

interface Props {
  content: string;
  language: string;
  fileName?: string;
}

const Holder = styled.div`
  background-color: #282a36;
  border-radius: 5px;
  overflow: hidden;
  position: relative;

  cursor: grab;

  &:active {
    cursor: grabbing;
  }
`;
const TitleLabel = styled.div`
  font-family: monospace;
  font-size: 12px;
  text-align: center;
  padding: 7px;
  background-color: #1d1e23;
  margin-bottom: 5px;
  font-weight: bold;
  position: relative;
`;

const WindowCircles = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  padding: 7px;
  align-items: center;
`;
const WindowCircle = styled.div<{ circleColor: string }>`
  width: 12px;
  height: 12px;
  border-radius: 16px;
  background-color: ${(props) => props.circleColor};
  margin-right: 4px;
`;

export function CodeSnippet({ content, fileName, language }: Props) {
  content = outdent.string(content);
  return (
    <WiggleDrag>
      <Holder>
        <TitleLabel>
          <WindowCircles>
            <WindowCircle circleColor="#FF625A" />
            <WindowCircle circleColor="#EAB236" />
            <WindowCircle circleColor="#D0D0D0" />
          </WindowCircles>
          {fileName}
        </TitleLabel>

        <WiggleDrag dragPropagation>
          <SyntaxHighlight code={content} language={language} />
        </WiggleDrag>
      </Holder>
    </WiggleDrag>
  );
}
