import { useEffect, useRef } from "react";

export interface TimerType {
  id: number;
  duration: number;
  remaining: number;
  running: boolean;
}

interface UseTimerProps extends TimerType {
  updateTimer: (id: number, newProps: Partial<TimerType>) => void;
}

export const useTimer = ({ id, duration, remaining, running, updateTimer }: UseTimerProps) => {
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (running && remaining > 0) {
      intervalRef.current = window.setInterval(() => {
        updateTimer(id, { remaining: remaining - 1 });
      }, 1000);
    } else if (!running || remaining <= 0) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [running, remaining, updateTimer, id]);

  const pause = () => {
    updateTimer(id, { running: false });
  };

  const resume = () => {
    updateTimer(id, { running: true });
  };

  return {
    remaining,
    running,
    pause,
    resume,
    duration
  };
};
