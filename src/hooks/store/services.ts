import { useRef, useCallback } from 'react';
import { isEqual } from 'lodash';

export function removeArrayElement<T>(arr: T[], elem: T) {
  const index = arr.indexOf(elem);

  if (index === -1) {
    return;
  }

  arr.splice(index, 1);
}

export function useValueGetter<T>(currentValue: T) {
  const valueRef = useRef(currentValue);

  valueRef.current = currentValue;

  return useCallback(() => {
    return valueRef.current;
  }, [valueRef]);
}

export type InterestingBitsGetter<C> = (controller: C) => any[];

export type InterestingBitsDefinition<C> =
  | InterestingBitsGetter<C>
  | Array<keyof C>;

export function getDidInterestingBitsChange(oldBits: any[], newBits: any[]) {
  if (oldBits.length !== newBits.length) {
    return true;
  }

  const haveAllBitsTheSameByReference = oldBits.every((oldBit, index) => {
    const newBit = newBits[index];
    return oldBit === newBit;
  });

  if (haveAllBitsTheSameByReference) {
    return false;
  }

  return !isEqual(oldBits, newBits);
}

export function getInterestingBitsValues<C>(
  controller: C,
  interestingBitsDefinition: InterestingBitsDefinition<C>,
): any[] {
  if (Array.isArray(interestingBitsDefinition)) {
    return interestingBitsDefinition.map(
      (interstingBitName) => controller[interstingBitName],
    );
  }

  return interestingBitsDefinition(controller);
}
