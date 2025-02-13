import CommonCheckBox from './CommonCheckBox';
import CommonRadioButton from './CommonRadioButton';

import { SelectItem } from '@/types/common';

interface Props {
  list: Readonly<SelectItem[]>;
  checkSize: 'lg' | 'md' | 'sm';
  selectIconType: 'radio' | 'checkbox';
  selectedItem?: SelectItem | null;
  selectedItems?: SelectItem[];
  isMultiSelect?: boolean;
  handleSelectItem: (item: SelectItem) => void;
}

export default function CommonSelector({
  handleSelectItem,
  list,
  checkSize,
  selectIconType,
  selectedItem,
  isMultiSelect,
  selectedItems,
}: Props) {
  const isItemSelected = (item: SelectItem) => {
    if (isMultiSelect) {
      return selectedItems?.some((selected) => selected.key === item.key);
    }
    return item.key === selectedItem?.key;
  };

  return (
    <ul className="mt-6 flex flex-col gap-8">
      {list.map((item) => (
        <li key={item.key} className="flex items-center gap-2">
          {selectIconType === 'radio' ? (
            <CommonRadioButton
              type={checkSize}
              handleCheck={() => handleSelectItem(item)}
              checked={isItemSelected(item)}
            />
          ) : (
            <CommonCheckBox
              type={checkSize}
              handleCheck={() => handleSelectItem(item)}
              isChecked={isItemSelected(item) ?? false}
            />
          )}
          <p className="text-title-md leading-title-md tracking-title-md text-black">{item.title}</p>
        </li>
      ))}
    </ul>
  );
}
