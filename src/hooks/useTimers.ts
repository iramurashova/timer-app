import { useState } from "react";
import { TimerType } from "../utils/types";

const useTimers = () => {
  const [timers, setTimers] = useState<TimerType[]>([]);
  const [addTimerIsOpen, setAddTimerIsOpen] = useState<boolean>(false);
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [isTimerOpen, setIsTimerOpen] = useState<boolean>(false);
  const [currentTimer, setCurrentTimer] = useState<TimerType | null>(null);

  const openAddTimer = () => setAddTimerIsOpen(true);
  const closeAddTimer = () => setAddTimerIsOpen(false);

  const openTimer = (timer: TimerType) => {
    setIsTimerOpen(true);
    setCurrentTimer(timer);
  };

  const closeTimer = () => {
    setIsTimerOpen(false);
    setCurrentTimer(null);
  };

  const addTimer = (duration: number) => {
    setTimers([
      ...timers,
      { id: Date.now(), duration, remaining: duration, running: true },
    ]);
    closeAddTimer();
  };

  const deleteTimer = (id: number) => {
    setTimers(timers.filter((timer) => timer.id !== id));
  };

  const updateTimer = (id: number, newProps: Partial<TimerType>) => {
    setTimers(
      timers.map((timer) =>
        timer.id === id ? { ...timer, ...newProps } : timer
      )
    );
  };

  const toggleEditMode = () => {
    setShowDelete((prev) => !prev);
  };

  return {
    timers,
    addTimerIsOpen,
    showDelete,
    isTimerOpen,
    currentTimer,
    openAddTimer,
    closeAddTimer,
    openTimer,
    closeTimer,
    addTimer,
    deleteTimer,
    updateTimer,
    toggleEditMode,
  };
};

export default useTimers;
