import React, {
  ReactNode,
  createContext,
  useMemo,
  useContext,
  useRef,
  useState,
  useEffect,
  useLayoutEffect,
} from 'react';
import styled from 'styled-components';
import { LargeHeader } from '~/ui/typo';
import { Spacing } from '~/ui/layout';
import {
  useViewportScroll,
  useTransform,
  MotionValue,
  motion,
  useSpring,
  EasingFunction,
  motionValue,
} from 'framer-motion';
import { getElementCentralYPosition } from '~/services/dom/scroll';
import { medium } from '~/services/styles';

interface Feature {}

interface Props {
  description: ReactNode;
  details: ReactNode;
}

const Holder = styled.div`
  display: flex;
  align-items: stretch;

  ${medium`
    flex-direction: column;
  `}
`;
const DescriptionHolder = styled.div`
  flex-grow: 1;
  flex-basis: 0;

  max-width: 50%;

  ${medium`
    max-width: 100%;
    margin-bottom: 2rem;
    flex-basis: auto;

    & > div {
      opacity: 1 !important;
      transform: none !important;
    }
  `}
`;
const DetailsHolder = styled.div`
  flex-grow: 1;
  flex-basis: 0;
  display: flex;
  justify-content: flex-end;

  ${medium`
    flex-basis: auto;

    & > div {
      opacity: 1 !important;
      transform: none !important;
    }
  `}
`;

interface FeatureContext {
  showingProgress: MotionValue<number>;
  visibility: MotionValue<number>;
}

const featureContext = createContext<FeatureContext>({
  showingProgress: motionValue(0),
  visibility: motionValue(0),
});

export function useFeature() {
  return useContext(featureContext);
}

export function getViewportSize() {
  return {
    width: Math.max(
      document.documentElement.clientWidth,
      window.innerWidth || 0,
    ),
    height: Math.max(
      document.documentElement.clientHeight,
      window.innerHeight || 0,
    ),
  };
}

const VISIBILTY_OFFSET = 500;

function getDivCentralPositionOffset(div: HTMLDivElement) {
  getElementCentralYPosition(div);
  const viewportHeight = getViewportSize().height;
  const {} = div.getBoundingClientRect();
}

function easeInOutQuad(t: number) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

export function SingleFeature({ description, details }: Props) {
  const { scrollY } = useViewportScroll();

  const { height } = getViewportSize();

  const visibilityOffset = height / 2;

  const holderRef = useRef<HTMLDivElement>(null);

  const [holderCentralPosition, setElementCentralPosition] = useState(9999);

  useLayoutEffect(() => {
    setElementCentralPosition(getElementCentralYPosition(holderRef.current!));
  }, [holderRef]);

  const showingProgress = useTransform(
    scrollY,
    [
      holderCentralPosition - visibilityOffset,
      holderCentralPosition,
      holderCentralPosition + visibilityOffset,
    ],
    [-1, 0, 1],
    {
      clamp: true,
    },
  );

  const visibility = useTransform(
    showingProgress,
    [-1, -0.5, 0, 0.5, 1],
    [0, 1, 1, 1, 0],
    {
      clamp: true,
      ease: easeInOutQuad,
    },
  );

  const featureContextValue: FeatureContext = useMemo(() => {
    return { showingProgress, visibility };
  }, [showingProgress, visibility]);

  const featureDescriptionXTransform = useTransform(
    visibility,
    [0, 1],
    [-20, 0],
    { clamp: false },
  );

  const featureDetailsXTransform = useTransform(
    featureDescriptionXTransform,
    [-20, 0],
    [20, 0],
    { clamp: false },
  );

  return (
    <featureContext.Provider value={featureContextValue}>
      <Holder ref={holderRef}>
        <DescriptionHolder>
          <motion.div
            style={{
              opacity: visibility,
              translateX: featureDescriptionXTransform,
              // transformX:

              // y: featureYTransform,
            }}
          >
            {description}
          </motion.div>
        </DescriptionHolder>
        <DetailsHolder>
          <motion.div
            style={{
              width: `100%`,
              opacity: visibility,
              translateX: featureDetailsXTransform,
            }}
          >
            {details}
          </motion.div>
        </DetailsHolder>
      </Holder>
    </featureContext.Provider>
  );
}
