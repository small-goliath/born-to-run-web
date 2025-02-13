import { act, renderHook } from '@testing-library/react';
import { useModal } from '../useModal';

it('isVisible 초기값은 false이다', async () => {
  const { result } = renderHook(() => useModal());
  expect(result.current.isVisible).toBe(false);
});

it('show함수가 호출되면 isVisible true가 된다.', async () => {
  const { result } = renderHook(() => useModal());
  act(() => {
    result.current.show();
  });
  expect(result.current.isVisible).toBe(true);
});

it('hide함수가 호출되면 isVisible false가 된다.', async () => {
  const { result } = renderHook(() => useModal());
  act(() => {
    result.current.hide();
  });
  expect(result.current.isVisible).toBe(false);
});

it('toggle 호출되면 isVisible toggling 된다.', async () => {
  const { result } = renderHook(() => useModal());
  act(() => {
    result.current.toggling();
  });
  expect(result.current.isVisible).toBe(true);

  act(() => {
    result.current.toggling();
  });

  expect(result.current.isVisible).toBe(false);
});
