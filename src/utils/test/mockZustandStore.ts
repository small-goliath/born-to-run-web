import { ToastStore, useToastStore } from '@/store/toastStore';
import { LoginInitialState, useLoginStateStore } from '@/store/useLoginStateStore';
import { MarathonFilterChipInitialState, useMarathonFilterChipStore } from '@/store/useMarathonFilterChipsStore';
import { StoreApi } from 'zustand';

const mockStore = <T>(hook: StoreApi<T>, state: Partial<T>) => {
  const initialStore = hook.getState();
  hook.setState({ ...initialStore, ...state });
};

const mockUseLoginStateStore = (state: Partial<LoginInitialState>) => {
  mockStore(useLoginStateStore, state);
};

const mockUseMarathonFilterChipStore = (state: Partial<MarathonFilterChipInitialState>) => {
  mockStore(useMarathonFilterChipStore, state);
};

const mockUseToastStore = (state: Partial<ToastStore>) => {
  mockStore(useToastStore, state);
};

export { mockUseLoginStateStore, mockUseMarathonFilterChipStore, mockUseToastStore };
