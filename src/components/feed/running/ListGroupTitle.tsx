import ChevronDownIcon from '@/components/icon/commonIcon/ChevronDownIcon';

interface Props {
  title: string;
}

export default function ListGroupTitle({ title }: Props) {
  return (
    <div className="flex items-center">
      <h1 className="text-title-lg leading-title-lg tracking-title-lg font-bold">{title}</h1>
      <div className="-rotate-90">
        <ChevronDownIcon size={20} />
      </div>
    </div>
  );
}
