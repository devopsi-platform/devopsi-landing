function convertMaybeArrayToArray<T>(input: T | T[]): T[] {
  if (Array.isArray(input)) {
    return input;
  }

  return [input];
}

export function createElementEvent<K extends keyof HTMLElementEventMap>(
  element: HTMLElement,
  types: K | K[],
  callback: (event: HTMLElementEventMap[K]) => void,
  options?: AddEventListenerOptions,
) {
  const typesArray = convertMaybeArrayToArray(types);

  const cancellers = typesArray.map((type) => {
    element.addEventListener(type, callback, options);

    return () => element.removeEventListener(type, callback);
  });

  return () => {
    cancellers.forEach((cancel) => cancel());
  };
}

export function createWindowEvent<K extends keyof WindowEventMap>(
  types: K[] | K,
  callback: (event: WindowEventMap[K]) => void,
  options?: AddEventListenerOptions,
) {
  const typesArray = convertMaybeArrayToArray(types);

  const cancellers = typesArray.map((type) => {
    window.addEventListener(type, callback, options);

    return () => window.removeEventListener(type, callback);
  });

  return () => {
    cancellers.forEach((cancel) => cancel());
  };
}

export function createDocumentEvent<K extends keyof DocumentEventMap>(
  types: K[] | K,
  callback: (event: DocumentEventMap[K]) => void,
  options?: AddEventListenerOptions,
) {
  const typesArray = convertMaybeArrayToArray(types);

  const cancellers = typesArray.map((type) => {
    document.addEventListener(type, callback, options);

    return () => document.removeEventListener(type, callback);
  });

  return () => {
    cancellers.forEach((cancel) => cancel());
  };
}

export function createKeysEvent(keys: string[], callback: () => void) {
  return createDocumentEvent('keydown', (event) => {
    if (!keys.includes(event.key)) {
      return;
    }

    callback();
  });
}
