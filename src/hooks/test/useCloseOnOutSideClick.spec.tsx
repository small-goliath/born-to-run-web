import { renderHook } from '@testing-library/react';
import { useCloseOnOutSideClick } from '../useCloseOnOutsideClick';

it('refsArray에 포함되지 않는다면 onClose함수가 호출된다.', async () => {
  const onCloseFn = jest.fn();
  renderHook(() => useCloseOnOutSideClick(onCloseFn, []));
  const event = new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
  });
  document.dispatchEvent(event);

  expect(onCloseFn).toHaveBeenCalled();
});

it('refsArray에 포함된다면 onClose 함수가 호출되지 않는다.', async () => {
  const onCloseFn = jest.fn();
  const excludeRef = { current: document.createElement('div') };
  renderHook(() => useCloseOnOutSideClick(onCloseFn, [excludeRef]));

  excludeRef.current.click();

  expect(onCloseFn).not.toHaveBeenCalled();
});
