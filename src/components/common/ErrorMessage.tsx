import ErrorIcons from '../icon/commonIcon/errorIcon.svg';

type Props = {
  text: string;
};

export default function ErrorMessage({ text }: Props) {
  return (
    <div className="flex items-center space-x-1">
      <ErrorIcons />
      <span className="text-body-sm text-system-r-R400 leading-body-sm">{text}</span>
    </div>
  );
}
