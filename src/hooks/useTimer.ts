import { useState, useEffect, useRef } from "react";

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
  const [timeRemaining, setTimeRemaining] = useState(remaining);
  const [isRunning, setIsRunning] = useState(running);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (isRunning && timeRemaining > 0) {
      intervalRef.current = window.setInterval(() => {
        setTimeRemaining((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(intervalRef.current!);
            updateTimer(id, { remaining: 0, running: false });
            return 0;
          }
          updateTimer(id, { remaining: prevTime - 1 });
          return prevTime - 1;
        });
      }, 1000);
    } else if (!isRunning) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeRemaining, id, updateTimer]);

  const pause = () => {
    setIsRunning(false);
    updateTimer(id, { running: false });
  };

  const resume = () => {
    setIsRunning(true);
    updateTimer(id, { running: true });
  };

  useEffect(() => {
    setTimeRemaining(remaining);
    setIsRunning(running);
  }, [remaining, running]);

  return {
    remaining: timeRemaining,
    running: isRunning,
    pause,
    resume,
  };
};

