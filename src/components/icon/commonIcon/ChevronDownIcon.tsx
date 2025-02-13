interface Props {
  size?: number;
}

export default function ChevronDownIcon({ size = 24 }: Props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 16.5002L4.5 9.0002L5.55 7.9502L12 14.4002L18.45 7.9502L19.5 9.0002L12 16.5002Z" fill="#111111" />
    </svg>
  );
}
