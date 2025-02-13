interface Props {
  size?: number;
  color?: string;
}

export default function CopyIcon({ size = 20, color = '#111111' }: Props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 20 20" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.5 11.25H3.75V2.5H12.5V1.25H3.75C3.0625 1.25 2.5 1.8125 2.5 2.5V11.25ZM13.3125 5.375L17.125 9.1875C17.375 9.4375 17.5 9.75 17.5 10.0625V17.5C17.5 18.1875 16.9375 18.75 16.25 18.75H7.5C6.8125 18.75 6.25 18.1875 6.25 17.5V6.25C6.25 5.5625 6.8125 5 7.5 5H12.5C12.8125 5 13.125 5.125 13.3125 5.375ZM16.1875 10L12.5 6.25V10H16.1875ZM7.5 6.25V17.5H16.25V11.25H12.5C11.8125 11.25 11.25 10.6875 11.25 10V6.25H7.5Z"
        fill={color}
      />
    </svg>
  );
}
