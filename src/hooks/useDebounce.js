import { useEffect, useState } from 'react';

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (debouncedValue !== value) setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay, debouncedValue]);

  return debouncedValue;
}

export default useDebounce;
