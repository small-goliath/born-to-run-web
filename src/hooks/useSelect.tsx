import { useCallback, useState } from 'react';

function useSelectList<T>() {
  const [selectedItems, setSelectedItems] = useState<T[] | undefined>();

  const handleSelectItemList = useCallback((item: T | null) => {
    setSelectedItems((prev = []) => {
      if (!item) return [];
      if (prev.includes(item)) {
        return prev.filter((i) => i !== item);
      } else {
        return [...prev, item];
      }
    });
  }, []);

  return {
    selectedItems,
    handleSelectItemList,
  };
}

function useSelectItem<T>(initialItem: T) {
  const [selectItem, setSelectItem] = useState<T>(initialItem);

  const handleSelectItem = useCallback((item: T) => {
    setSelectItem(item);
  }, []);

  return {
    selectItem,
    handleSelectItem,
  };
}

export { useSelectList, useSelectItem };
