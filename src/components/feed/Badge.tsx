import { cls } from '@/utils/cls';

interface Props {
  text: string;
  isCircle?: boolean;
  color?: 'rgreen' | 'green' | 'gray' | 'blue' | 'red' | 'yellow';
  type?: 'solid' | 'tint' | 'outLine';
  scale?: 'sm' | 'md' | 'lg';
}

type Color = 'rgreen' | 'green' | 'gray' | 'blue' | 'red' | 'yellow';

const solidStyles = {
  rgreen: { backgroundColor: '#50C85A', color: '#FFFFFF' },
  green: { backgroundColor: '#006644', color: '#FFFFFF' },
  gray: { backgroundColor: '#2A2A2A', color: '#FFFFFF' },
  blue: { backgroundColor: '#0747A6', color: '#FFFFFF' },
  red: { backgroundColor: '#BF2600', color: '#FFFFFF' },
  yellow: { backgroundColor: '#FF991F', color: '#FFFFFF' },
};

const tintStyles = {
  rgreen: { backgroundColor: '#EFEFEF', color: '#50C85A' },
  gray: { backgroundColor: '#EFEFEF', color: '#111111' },
  blue: { backgroundColor: '#DEEBFF', color: '#0747A6' },
  red: { backgroundColor: '#FFEBE6', color: '#DE350B' },
  yellow: { backgroundColor: '#FFFAE6', color: '#FF8B00' },
  green: { backgroundColor: '#E3FCEF', color: '#006644' },
};

const outlineStyles = {
  rgreen: { border: '1px solid #50C85A', backgroundColor: 'transparent', color: '#50C85A' },
  green: { border: '1px solid #006644', backgroundColor: 'transparent', color: '#006644' },
  gray: { border: '1px solid #2A2A2A', backgroundColor: 'transparent', color: '#2A2A2A' },
  blue: { border: '1px solid #0747A6', backgroundColor: 'transparent', color: '#0747A6' },
  red: { border: '1px solid #DE350B', backgroundColor: 'transparent', color: '#DE350B' },
  yellow: { border: '1px solid #FF8B00', backgroundColor: 'transparent', color: '#FF8B00' },
};

type StyleType = {
  [key in Color]: {
    backgroundColor?: string;
    color?: string;
    border?: string;
  };
};

const typeStyles: {
  solid: StyleType;
  tint: StyleType;
  outLine: StyleType;
} = {
  solid: solidStyles,
  tint: tintStyles,
  outLine: outlineStyles,
};

const scaleMap = {
  sm: { padding: '2px 4px', fontSize: '10px' },
  md: { padding: '2px 6px', fontSize: '12px' },
  lg: { padding: '2px 8px', fontSize: '14px' },
};

export default function Badge({ text, color = 'rgreen', isCircle = false, type = 'solid', scale = 'md' }: Props) {
  const combinedStyle = { ...typeStyles[type][color], ...scaleMap[scale] };

  return (
    <p className={cls(isCircle ? 'rounded-2xl' : 'rounded-sm', 'inline-block')} style={combinedStyle}>
      {text}
    </p>
  );
}
