type Props = {
  title: string;
};

export default function ModalTitle({ title }: Props) {
  return <h2 className="text-title-lg text-secondary-N900 font-bold leading-title-lg">{title}</h2>;
}
