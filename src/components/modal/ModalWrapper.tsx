type Props = {
  children: React.ReactNode;
};

export default function ModalWrapper({ children }: Props) {
  return (
    <div className="p-6 pb-2 bg-whites bg-white space-y-4 shadow-elevation70 rounded-2xl max-w-[26.875rem] md:max-w-full absolute">
      {children}
    </div>
  );
}
