import { act } from '@testing-library/react';
import * as zustand from 'zustand';

const { create: actualCreate, createStore: actualCreateStore } = jest.requireActual<typeof zustand>('zustand');

const storeResetFn = new Set<() => void>();

const create = <T>(stateCreator: zustand.StateCreator<T>) => {
  const store = actualCreate(stateCreator);
  const initialState = store.getInitialState();
  storeResetFn.add(() => {
    store.setState(initialState, true);
  });
  return store;
};

afterEach(() => {
  act(() => storeResetFn.forEach((reset) => reset()));
});

export { create };
