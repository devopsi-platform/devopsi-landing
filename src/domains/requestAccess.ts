import { createContext, useCallback } from 'react';
import { createBindingContext } from '~/services/context';
import { createStoreContext } from '~/hooks/store';

interface RequestAccessContext {
  isOpened: boolean;
  isSuccessful: boolean;
}

export const [RequestAccessProvider, useRequestAccess] = createStoreContext(
  {
    isOpened: false,
    isSuccessful: false,
  },
  (getState, setState) => {
    const { isOpened, isSuccessful } = getState();

    const open = useCallback(() => {
      setState({ isOpened: true });
    }, []);

    const close = useCallback(() => {
      setState({ isOpened: false });
    }, []);

    return {
      isOpened,
      isSuccessful,
      open,
      close,
    };
  },
  'RequestAccess',
);
