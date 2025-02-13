import { useEffect, useState } from 'react';

function useAddressToCoordinate({ address }: { address?: string }) {
  const [result, setResult] = useState<{ x: number; y: number }>();

  useEffect(() => {
    if (!address) return;

    window.naver.maps.Service.geocode(
      {
        query: address,
      },
      (status, response) => {
        if (status === window.naver.maps.Service.Status.ERROR) {
          console.log('error');
        } else {
          if (response.v2.addresses.length <= 0) return;
          const { x, y } = response.v2.addresses[0];
          setResult({
            x: Number(x),
            y: Number(y),
          });
        }
      }
    );
  }, [address]);

  return {
    x: result?.x,
    y: result?.y,
  };
}

export { useAddressToCoordinate };
