import localFont from 'next/font/local';

const pretendard = localFont({
  src: [
    {
      path: './Pretendard-Bold.woff',
      weight: '700',
    },
    {
      path: './Pretendard-Medium.woff',
      weight: '500',
    },
    {
      path: './Pretendard-Regular.woff',
      weight: '400',
    },
  ],
  display: 'swap',
  variable: '--font-pretendard',
});

export default pretendard;
