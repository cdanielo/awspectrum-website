import { useState, useEffect } from 'react';

const TARGET = new Date('October 15, 2026 09:00:00').getTime();

interface Countdown {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
  expired: boolean;
}

export function useCountdown(): Countdown {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const diff = TARGET - now;
  if (diff <= 0) return { days: '000', hours: '00', minutes: '00', seconds: '00', expired: true };

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)).toString().padStart(3, '0'),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0'),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0'),
    seconds: Math.floor((diff % (1000 * 60)) / 1000).toString().padStart(2, '0'),
    expired: false,
  };
}
