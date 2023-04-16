import { useLayoutEffect, useRef } from 'react';

export default function useLatest(value: any) {
  const valueRef = useRef(value);
  useLayoutEffect(() => {
    valueRef.current = value;
  }, [value]);

  return valueRef;
}
