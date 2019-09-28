import { useRef, useCallback } from 'react';

/**
 * Simple hooks that creates getter of any value passed to it.
 *
 * It's useful when using `useCallback` optimization and want to get
 * current value of some variable without re-computing callback itself (which would cause re-renders)
 */
export function useValueGetter<T>(currentValue: T) {
  const valueRef = useRef(currentValue);

  valueRef.current = currentValue;

  return useCallback(() => {
    return valueRef.current;
  }, [valueRef]);
}
