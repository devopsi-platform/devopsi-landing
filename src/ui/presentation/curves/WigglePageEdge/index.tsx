import React, {
  ReactNode,
  useRef,
  RefObject,
  useEffect,
  useState,
} from 'react';
import styled from 'styled-components';
import { Curve } from './Curve';
import { useWindowEvent } from '~/hooks/dom';

const Holder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const ContentHolder = styled.div<{ backgroundColor: string }>`
  background-color: ${(props) => props.backgroundColor};
  margin-top: -1px;
`;

const ContentConpensation = styled.div``;

interface Props {
  children: ReactNode;
  color: string;
  spacingCompensationRatio?: number;
  heightRatio?: number;
}

function useElementRect(ref: RefObject<HTMLElement>) {
  const [rect, setRect] = useState(getRect());
  function getRect() {
    if (!ref.current) {
      return null;
    }
    return ref.current.getBoundingClientRect();
  }

  function update() {
    const newRect = getRect();
    const currentRect = rect;

    if (!newRect) {
      return;
    }

    if (!currentRect) {
      setRect(newRect);
      return;
    }

    const didSizeChange =
      newRect.width !== currentRect.width ||
      newRect.height !== currentRect.height;

    if (!didSizeChange) {
      return;
    }

    setRect(newRect);
  }
  useEffect(() => {
    update();
  }, []);

  useWindowEvent('resize', update, { throttle: 500 });

  return rect;
}

export function WigglePageEdge({
  children,
  color,
  spacingCompensationRatio = 0,
  heightRatio = 0.25,
}: Props) {
  const holderRef = useRef<HTMLDivElement>(null);

  const holderRect = useElementRect(holderRef);

  function getSpacingOffset() {
    if (!spacingCompensationRatio) {
      return 0;
    }

    if (!holderRect) {
      return 0;
    }

    return holderRect.height * heightRatio * spacingCompensationRatio;
  }

  return (
    <Holder ref={holderRef}>
      {holderRect && (
        <Curve
          width={holderRect.width}
          heightRatio={heightRatio}
          color={color}
          pointsCount={3}
        />
      )}

      <ContentHolder
        backgroundColor={color}
        // style={{ marginBottom: -getSpacingOffset() }}
      >
        <ContentConpensation
          style={{
            marginTop: -getSpacingOffset(),
            // marginBottom: -getSpacingOffset(),
          }}
        >
          {children}
        </ContentConpensation>
      </ContentHolder>
    </Holder>
  );
}
