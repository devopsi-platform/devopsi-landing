import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useRef,
  useEffect,
  ReactNode,
  memo,
} from 'react';

import {
  removeArrayElement,
  getDidInterestingBitsChange,
  InterestingBitsDefinition,
  getInterestingBitsValues,
} from './services';
import { StateUpdateRecipe, createNewState } from './state';
import { useValueGetter } from './useValueGetter';
import { useForceUpdate } from './useForceUpdate';
import { MemoizedChild } from './MemoChildren';
import { unstable_batchedUpdates } from 'react-dom';

type StoreUnsubscriber = () => void;
type StoreSubscribeCallback<C> = (controller: C) => void;

interface StoreContextValue<C> {
  controller: C;
  subscribe: (listener: StoreSubscribeCallback<C>) => StoreUnsubscriber;
}

export interface StoreContextHookOptions<C> {
  interestingParts?: InterestingBitsDefinition<C>;
  throttleUpdates?: number;
}

/**
 * This is VERY similar to React.createContext
 *
 * Basic, and very important difference is, that when using the context, component can
 * specify if it's interested in re-rendering after store change
 *
 * @example
 * // create store
 * interface Store { foo: string }
 * const initialState: Store = { foo: 'bar' };
 *
 * const [ContextProvider, useContext] = createStoreContext(initialState, 'contextNameForDevtools');
 *
 * // use store
 * // somewhere in the tree where context will be used
 *
 * function App() {
 *   return <ContextProvider foo="baz"><Anything /></ContextProvider>
 * }
 * //               ^^^ note you can overwrite initial state with props
 * // also note that `value` is managed under the hood, it will provide way to get/set it, when consuming context
 *
 * // now somewhere deeper in the tree
 *
 * const [storeState, setStoreState] = useContext();
 *
 *
 * return <Button onClick={() => setStoreState({ foo: 'baz' })} />
 * // after running `setStoreState` - all other components using the store will update
 *
 * // to avoid re-rendering on some updates:
 * const [storeState, setStoreState] = useContext({
 *   shouldUpdate(oldState, newState) => oldState.foo !== newState.foo // if this return false, component will not re-render after store is updated
 * });
 *
 * // Notes on store updating
 * // when calling store update function, provided new state will be shallowly merged with old one (exactly like with .setState of react classes)
 * // you can also call it with function argument and it will create mutable draft object (based on immer)
 * // that you can mutate and return eg.
 * setStoreState(state => {
 *   state.items.push('foo');
 *
 *   return state;
 * })
 */
export function createStoreContext<T, C>(
  defaultInitialStoreState: T,
  controllerFactory: (
    getCurrentState: () => T,
    setState: (recipe: StateUpdateRecipe<T>) => void,
  ) => C,
  contextDisplayName: string,
) {
  const Context = createContext<StoreContextValue<C>>(
    // we dont need default initial value as it'll be created inside provider
    null as any,
    /**
     * this one is important
     *
     * we dont want react to re-render all components using context every time
     * we'll manually handle updates at component level using subscribtion,
     *
     * this flag means context value will be updated, and delivered to components on next re-render
     * but re-render of consumer component will not be fired automatically
     */
    () => 0,
  );

  if (contextDisplayName) {
    Context.displayName = contextDisplayName;
  }

  interface ProviderProps {
    initialState?: T;
    state?: T;
    children: ReactNode;
  }

  // context provider component that will manage state and letting subscribers know about updates
  const StoreContextProvider = memo(
    ({
      children,
      initialState: initialStateFromProps,
      state: currentStateFromProps,
    }: ProviderProps) => {
      // initial store state for this instance of provider
      const providerInitialStoreState: T = {
        ...defaultInitialStoreState,
        ...initialStateFromProps,
        ...currentStateFromProps,
      };

      // local state keeping store state value
      const [storeState, setStoreState] = useState(providerInitialStoreState);

      // list of component currently listening to store state changes
      const storeListeners = useRef<StoreSubscribeCallback<C>[]>([]);

      /**
       * getter of current store state value
       * eg. if some component dont update on some store change, if it'd use just `state` variable
       * it would be outdated. this getter always returns current state
       */
      const getCurrentState = useValueGetter(storeState);

      // function allowing registering itself to store updates
      const subscribeToStore = useCallback(
        (listener: StoreSubscribeCallback<C>) => {
          storeListeners.current.push(listener);

          return () => {
            removeArrayElement(storeListeners.current, listener);
          };
        },
        [],
      );

      const update = useCallback((updateRecipe: StateUpdateRecipe<T>) => {
        unstable_batchedUpdates(() => {
          setStoreState((currentState) =>
            createNewState(currentState, updateRecipe),
          );
        });
      }, []);

      // we're getting controller inside the body of provider as it might use hooks etc
      // we cannot compute this value inside effects etc
      const controller = controllerFactory(getCurrentState, update);

      // now, final context raw value - with current controller and a way to subscribe to controller updates
      const storeValue: StoreContextValue<C> = {
        controller,
        subscribe: subscribeToStore,
      };

      // everytime state (and in result - controller) changes - let all subscribers know
      useEffect(() => {
        /**
         * operate on copy of current listeners as during updates, listeners might change
         * eg. because of unmounting or mounting new components
         */
        [...storeListeners.current].forEach((listener) => {
          listener(controller);
        });
      }, [controller]);

      // in case `state` prop of provider change - update store value
      useEffect(() => {
        if (!currentStateFromProps) {
          return;
        }
        setStoreState(currentStateFromProps);
      }, Object.values(currentStateFromProps || {}));

      return (
        <Context.Provider value={storeValue}>
          {/* if children didnt change - dont re-render them */}
          <MemoizedChild>{children}</MemoizedChild>
        </Context.Provider>
      );
    },
  );

  // hook used to use store controller
  function useStoreContext({
    interestingParts,
  }: StoreContextHookOptions<C> = {}) {
    /**
     * get current value of controller
     * note! it'll not update when context value changes as we disabled this in context options
     * we want to manually decide if some update is interesting for given consumer
     *
     * however, if consumer re-rendered for any other reason (eg props or local state)
     * it will always get 'fresh' version of context value here
     */
    const { controller, subscribe } = useContext(Context);

    // returns list of interesting parts of current store in case it's not interested in all store updates
    function getChangedBits() {
      if (!interestingParts) {
        return null;
      }

      return getInterestingBitsValues(controller, interestingParts);
    }

    /**
     * keep track of interesting bits from every render
     * so we can compare it to new ones when context informs there is update
     * so we can decide if re-render is needed
     */
    const getCurrentlyInterestingBits = useValueGetter(getChangedBits());

    // we need a way to force update when it's needed
    const forceUpdate = useForceUpdate();

    useEffect(() => {
      // subscribe to controller updates
      const unsubscribe = subscribe((newController) => {
        // get interesting parts from last render
        const oldInterestingBits = getCurrentlyInterestingBits();

        // component is updating on any store update
        if (!interestingParts) {
          return forceUpdate();
        }

        // compute interesting parts for new controller (note it's not yet "rendered")
        const newInterestingBits = getInterestingBitsValues(
          newController,
          interestingParts,
        );

        // if interesting parts changed - we know we want to render using new controller
        const didBitsChange = getDidInterestingBitsChange(
          oldInterestingBits || [],
          newInterestingBits,
        );

        if (didBitsChange) {
          return forceUpdate();
        }
      });

      // when unmounting - unsubscribe from changes
      return unsubscribe;
    }, []);

    // return current store controller
    return controller;
  }

  return [StoreContextProvider, useStoreContext] as const;
}
