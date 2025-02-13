interface Props {
  title: string;
}

export default function DetailLabel({ title }: Props) {
  return (
    <p className="text-title-sm font-medium leading-title-sm tracking-title-sm text-secondary-N200 min-w-[40px] inline-block">
      {title}
    </p>
  );
}
