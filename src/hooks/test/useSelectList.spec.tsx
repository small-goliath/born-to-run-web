import { act, renderHook } from '@testing-library/react';
import { useSelectItem, useSelectList } from '../useSelect';

describe('useSelectList', () => {
  it('handleSelectList를 호출하여 선택한 값을 누적해서 유지하고, 동일한 값을 다시 선택하면 제거된다.', async () => {
    const { result } = renderHook(() => useSelectList());
    act(() => {
      result.current.handleSelectItemList({ title: 'a', key: 1 });
    });
    expect(result.current.selectedItems).toEqual([{ title: 'a', key: 1 }]);

    act(() => {
      result.current.handleSelectItemList({ title: 'b', key: 2 });
    });
    expect(result.current.selectedItems).toEqual([
      { title: 'a', key: 1 },
      { title: 'b', key: 2 },
    ]);

    act(() => {
      result.current.handleSelectItemList({ title: 'a', key: 1 });
    });
    result.current.handleSelectItemList({ title: 'b', key: 2 });
  });
});

describe('useSelectItem', () => {
  it('초기 값을 설정하면 초기 데이터를 얻을 수 있다.', async () => {
    const { result } = renderHook(() =>
      useSelectItem({
        title: 'a',
        key: 1,
      })
    );
    expect(result.current.selectItem).toEqual({
      title: 'a',
      key: 1,
    });
  });

  it('handleSelectItem을 호출하여 선택한 값을 얻을 수 있다.', async () => {
    const { result } = renderHook(() =>
      useSelectItem({
        title: 'a',
        key: 1,
      })
    );

    expect(result.current.selectItem).toEqual({
      title: 'a',
      key: 1,
    });

    act(() => {
      result.current.handleSelectItem({
        title: 'b',
        key: 2,
      });
    });

    expect(result.current.selectItem).toEqual({
      title: 'b',
      key: 2,
    });
  });
});
