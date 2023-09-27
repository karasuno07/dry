import { useLayoutEffect, useState } from 'react';

export default function useCountdown(seconds?: number) {
  const [secondsRemaining, setSecondsRemaining] = useState<number>(
    seconds || 5
  );

  useLayoutEffect(() => {
    if (secondsRemaining === 0) {
      return;
    }

    const timer = setInterval(() => {
      setSecondsRemaining((prevSecondsRemaining) => prevSecondsRemaining - 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [secondsRemaining]);

  return secondsRemaining;
}
