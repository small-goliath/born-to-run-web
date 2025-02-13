import { create } from 'zustand';
import { v4 as uuid } from 'uuid';

export type ToastType = 'base' | 'success' | 'info' | 'error' | 'warn';

type ToastMessage = {
  id: string;
  message: string;
  type: ToastType;
};

type ToastInput = {
  message: string;
  type: ToastType;
};

export type ToastStore = {
  toasts: ToastMessage[];
  addToast: (toast: ToastInput) => string;
  removeToast: (id: string) => void;
  clearToast: () => void;
};

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  addToast: (toast) => {
    const id = uuid();
    const { message, type } = toast;
    set((state) => ({ toasts: [...state.toasts, { id, message, type }] }));
    return id;
  },
  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    }));
  },
  clearToast: () => {
    set(() => ({ toasts: [] }));
  },
}));
