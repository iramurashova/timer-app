export interface TimerType {
    id: number;
    duration: number;
    remaining: number;
    running: boolean;
  }

  export interface TimerProps extends TimerType {
    updateTimer: (id: number, newProps: Partial<TimerType>) => void;
    closeTimer?: () => void;
    deleteTimer: (id: number) => void;
    openTimer?: (timer: TimerType) => void;
    isEditable?: boolean;
  }