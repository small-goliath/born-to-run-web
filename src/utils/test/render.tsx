import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (component: React.ReactNode, options = {}) => {
  const user = userEvent.setup();

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
      },
      mutations: {
        retry: false,
      },
    },
  });

  return {
    user,
    ...render(<QueryClientProvider client={queryClient}>{component}</QueryClientProvider>),
  };
};
