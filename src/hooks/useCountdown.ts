import { useLayoutEffect, useState } from 'react';

export default function useCountdown(seconds: number = 5) {
  const [secondsRemaining, setSecondsRemaining] = useState<number>(seconds);

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
