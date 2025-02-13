type Props = {
  color?: string;
  size?: string;
};

export default function CloseIcon({ color, size = '24' }: Props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M18.75 6.30002L17.7 5.25002L12 10.95L6.29994 5.25L5.24994 6.3L10.95 12L5.24999 17.7L6.29999 18.75L12 13.05L17.7 18.75L18.75 17.7L13.05 12L18.75 6.30002Z"
        fill={color || '#111111'}
      />
    </svg>
  );
}
