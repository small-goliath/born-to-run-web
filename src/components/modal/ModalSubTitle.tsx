type Props = {
  subTitle: string;
};

export default function ModalSubTitle({ subTitle }: Props) {
  return (
    <p className="text-body-lg font-regular leading-body-lg tracking-body-lg text-secondary-N200 w-[16.5rem] md:w-full">
      {subTitle}
    </p>
  );
}
