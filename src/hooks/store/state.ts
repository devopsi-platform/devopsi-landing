import produce from 'immer';

type StateUpdaterFunction<T> = (draft: T) => void;
export type StateUpdateRecipe<T> = Partial<T> | StateUpdaterFunction<T>;

export function createNewState<S>(
  currentState: S,
  recipe: StateUpdateRecipe<S>,
): S {
  if (typeof recipe === 'function') {
    return produce(currentState, recipe as StateUpdaterFunction<S>);
  }

  return {
    ...currentState,
    ...(recipe as S),
  };
}
