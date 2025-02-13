import { MARATHON_LOCATION_LIST } from '@/data';
import ChipsTab from '../ChipsTab';
import { SelectItem } from '@/types/common';

interface Props {
  handleSelectLocations: (item: SelectItem) => void;
  selectedLocations?: SelectItem[];
}

export default function LocationSelector({ handleSelectLocations, selectedLocations }: Props) {
  return (
    <ul className="grid grid-cols-4 gap-4">
      {MARATHON_LOCATION_LIST.map((item) => (
        <li key={item.key}>
          <ChipsTab
            title={item.title}
            isPlus
            onClick={() => handleSelectLocations(item)}
            isChecked={selectedLocations?.includes(item)}
          />
        </li>
      ))}
    </ul>
  );
}
