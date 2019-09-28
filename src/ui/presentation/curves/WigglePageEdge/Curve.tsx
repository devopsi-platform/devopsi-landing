import React, {
  ReactNode,
  useRef,
  RefObject,
  useEffect,
  useState,
} from 'react';
import styled from 'styled-components';

const Holder = styled.div``;

interface Props {
  width: number;
  color: string;
  pointsCount: number;
  heightRatio: number;
  smoothing?: number;
}

export function Curve({
  color,
  width,
  pointsCount,
  heightRatio,
  smoothing = 1,
}: Props) {
  const fullHeight = width * heightRatio;
  function getPath() {
    const pointHeight = fullHeight / pointsCount;
    const pointWidth = width / pointsCount;
    const pointsList = Array.from({ length: pointsCount });
    const smoothingRawDistance = pointWidth / 2;
    const smoothingDistance = smoothingRawDistance * smoothing;

    const curvePath = pointsList
      .map((_, index) => {
        const startPointModifier = `${smoothingDistance}, 0`;
        const endPointModifier = `${pointWidth -
          smoothingDistance}, ${pointHeight}`;
        const endPoint = `${pointWidth}, ${pointHeight}`;

        return `c ${startPointModifier} ${endPointModifier} ${endPoint}`;
        // return `c${pointWidth},${pointHeight} ${pointWidth},${pointHeight} ${pointWidth},${pointHeight}`;
      })
      .join('\n');

    const bottomLine = `c0,0 -${width},0 -${width},0`;

    return `
      m0,0
      ${curvePath}
      ${bottomLine}
      z
    `;
  }
  return (
    <svg width={width} height={fullHeight} xmlns="http://www.w3.org/2000/svg">
      <g>
        <path
          id="svg_2"
          d={getPath()}
          // d="
          //     m0,0
          //     c91,27 123,27 159,17
          //     c36,-10 135,15 134,14
          //     c0.5,0 0.5,111 0,111
          //     c0,0 -488,0 -489,0

          //     z"
          strokeWidth="0"
          fill={color}
        />
      </g>
    </svg>
  );
}
