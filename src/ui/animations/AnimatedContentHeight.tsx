import React, { ReactNode, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

interface Props {
  children: ReactNode;
}

const Holder = styled.div`
  position: relative;
  will-change: height;
  transition: 0.15s height;
  overflow: hidden;
`;

const ContentHolder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`;
/**
 * This component just animates height of it's content.
 *
 * So eg. if initially it has no content
 *
 * and then at some point it'll have some - it'll animate itself height from 0 to new content height
 */
export function AnimatedContentHeight({ children }: Props) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);
  useEffect(() => {
    if (!contentRef.current) {
      return;
    }

    const newContentHeight = contentRef.current.clientHeight;

    if (newContentHeight === contentHeight) {
      return;
    }

    setContentHeight(newContentHeight);
  }, [children]);

  return (
    <Holder style={{ height: `${contentHeight}px` }}>
      <ContentHolder ref={contentRef}>{children}</ContentHolder>
    </Holder>
  );
}
