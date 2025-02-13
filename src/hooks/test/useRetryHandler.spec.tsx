import { act, renderHook } from '@testing-library/react';
import { useRetryHandler } from '../useRetryHandler';

const routerReplace = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      replace: routerReplace,
    };
  },
}));

it('handleRetry를 호출했을 때 초기 retryCount는 3회이며 이상일 경우 "/"으로 이동하게된다.', async () => {
  const { result } = renderHook(() => useRetryHandler({}));
  act(() => {
    result.current.handleRetry();
  });
  act(() => {
    result.current.handleRetry();
  });
  act(() => {
    result.current.handleRetry();
  });

  expect(result.current.retryCount).toBe(2);
  expect(result.current.isRetry).toBe(false);
  expect(routerReplace).toHaveBeenCalledWith('/');
});

it('retryCount를 5회로 설정할 경우 handlerRetry함수가 5회 이상일 경우 "/"으로 이동하게된다. ', async () => {
  const { result } = renderHook(() => useRetryHandler({ retryCount: 5 }));
  act(() => {
    result.current.handleRetry();
  });
  act(() => {
    result.current.handleRetry();
  });
  act(() => {
    result.current.handleRetry();
  });
  act(() => {
    result.current.handleRetry();
  });
  act(() => {
    result.current.handleRetry();
  });
  act(() => {
    result.current.handleRetry();
  });

  expect(result.current.retryCount).toBe(5);
  expect(result.current.isRetry).toBe(false);
  expect(routerReplace).toHaveBeenCalledWith('/');
});

it('설정한 retryCount 횟수보다 높지 않는다면  handler가 있다면 handler함수를 호출한다.', async () => {
  const handlerFn = jest.fn();
  const { result } = renderHook(() => useRetryHandler({ handler: handlerFn }));

  // 첫 번째 호출
  act(() => {
    result.current.handleRetry();
  });
  expect(result.current.retryCount).toBe(1);
  expect(handlerFn).toHaveBeenCalledTimes(1);
  expect(result.current.isRetry).toBe(true);

  // 두 번째 호출
  act(() => {
    result.current.handleRetry();
  });
  expect(result.current.retryCount).toBe(2);
  expect(handlerFn).toHaveBeenCalledTimes(2);
  expect(result.current.isRetry).toBe(true);

  // 세 번째 호출 - 이때부터는 handler가 호출되지 않아야 함
  act(() => {
    result.current.handleRetry();
  });
  expect(result.current.retryCount).toBe(2); // 여전히 2로 유지
  expect(handlerFn).toHaveBeenCalledTimes(2); // 호출 횟수 변하지 않음
  expect(result.current.isRetry).toBe(false);
});
