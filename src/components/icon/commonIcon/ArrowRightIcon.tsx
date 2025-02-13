interface Props {
  color?: string;
  width?: number;
  height?: number;
}

export default function ArrowRightIcon({ color = '#111', height = 10, width = 12 }: Props) {
  return (
    <svg width={width} height={height} viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 0L6.285 0.6965L10.075 4.5H0V5.5H10.075L6.285 9.2865L7 10L12 5L7 0Z" fill={color} />
    </svg>
  );
}
