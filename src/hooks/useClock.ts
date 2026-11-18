import { useEffect, useState } from 'react';

const now = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

/** Current time as HH:MM, refreshed every 10 seconds. */
export function useClock(): string {
  const [time, setTime] = useState(now);
  useEffect(() => {
    const id = window.setInterval(() => setTime(now()), 10_000);
    return () => window.clearInterval(id);
  }, []);
  return time;
}
