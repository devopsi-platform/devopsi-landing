import { MotionValue, motionValue, useTransform } from 'framer-motion';
import { useMemo } from 'react';

export function useMotionVelocity(motionValue: MotionValue<number>) {
  const velocity: MotionValue<number> = useTransform<number>(
    motionValue,
    (value: number) => motionValue.getVelocity(),
  );

  return velocity;
}
