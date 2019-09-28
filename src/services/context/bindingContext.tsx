import React, {
  useState,
  Dispatch,
  SetStateAction,
  PropsWithChildren,
  createContext,
  useMemo,
  useContext,
  useCallback,
} from 'react';

type NewStateAction<T> = Partial<T> | ((oldState: T) => T);
type BindingContextValue<S> = readonly [S, Dispatch<NewStateAction<S>>];

export function createBindingContext<T, F>(initialState: T) {
  const context = createContext<BindingContextValue<T>>([
    initialState,
    () => {},
  ]);

  function BindingContextProvider({ children }: PropsWithChildren<{}>) {
    const [state, setState] = useState(initialState);

    const setStatePartial = useCallback(
      (stateAction: Partial<T> | ((oldState: T) => T)) => {
        if (typeof stateAction === 'function') {
          setState(stateAction);
        }
        setState({ ...state, ...stateAction });
      },
      [state],
    );

    const contextValue = useMemo(() => [state, setStatePartial] as const, [
      state,
    ]);

    return <context.Provider value={contextValue}>{children}</context.Provider>;
  }

  function useBindingContext() {
    return useContext(context);
  }

  return [BindingContextProvider, useBindingContext] as const;
}
