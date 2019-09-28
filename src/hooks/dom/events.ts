import { useEffect } from 'react';
import { throttle } from 'lodash-es';

interface UseEventOptions {
  throttle?: number;
}

const defaultOptions: UseEventOptions = { throttle: 0 };

/**
 * Allows quickly adding widnow events without all
 * the hussle of registering/removing callbacks and adding throttle optimizations
 *
 * signature is same as addEventListener
 *
 * so in the component the only code you'd need is eg.
 *
 * @example
 * useWindowEvent('resize', () => { console.log('resized') }, { throttle: 500 })
 */
export function useWindowEvent<K extends keyof WindowEventMap>(
  type: K,
  callback: (event: WindowEventMap[K]) => void,
  options?: UseEventOptions,
) {
  const optionsWithDefault = {
    ...defaultOptions,
    ...options,
  } as UseEventOptions;
  useEffect(() => {
    const throttledCallback = throttle(callback, optionsWithDefault.throttle);
    window.addEventListener(type, throttledCallback);

    return () => {
      window.removeEventListener(type, throttledCallback);
      throttledCallback.cancel();
    };
  }, [type, callback]);
}

/**
 * Allows quickly adding document events without all
 * the hussle of registering/removing callbacks and adding throttle optimizations
 *
 * signature is same as addEventListener
 *
 * so in the component the only code you'd need is eg.
 *
 * @example
 * useDocumentEvent('click', () => { console.log('clicked') }, { throttle: 500 })
 */
export function useDocumentEvent<K extends keyof DocumentEventMap>(
  type: string,
  callback: (event: DocumentEventMap[K]) => void,
  options?: UseEventOptions,
) {
  const optionsWithDefault = {
    ...defaultOptions,
    ...options,
  } as UseEventOptions;
  useEffect(() => {
    const throttledCallback = throttle(callback, optionsWithDefault.throttle);
    // @ts-ignore
    document.addEventListener(type, throttledCallback);

    return () => {
      // @ts-ignore
      document.removeEventListener(type, throttledCallback);
      throttledCallback.cancel();
    };
  }, [type, callback]);
}
