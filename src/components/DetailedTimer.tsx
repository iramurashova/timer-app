import React, { useEffect } from "react";
import styled from "styled-components";
import ControlButton from "./ControlButton";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useTimer, TimerType } from "../hooks/useTimer";

export interface TimerProps extends TimerType {
  updateTimer: (id: number, newProps: Partial<TimerType>) => void;
  closeTimer: () => void;
  deleteTimer: (id: number) => void;
}

const TimerContainer = styled.div`
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TimerDisplay = styled.div`
  font-size: 40px;
  color: #ffffff;
  margin-bottom: 20px;
`;

const Button = styled.button`
  width: 161px;
  margin: 0;
  font-size: 1em;
  color: #ffffff;
  border: none;
  border-radius: 32px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    outline: none;
  }
  &:focus {
    outline: none;
  }
`;
const ButtonsContainer = styled.div`
  padding-top: 39px;
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const PauseButton = styled(Button)`
  box-shadow: inset -4px -6px 5.5px 0px rgba(0, 0, 0, 0.25);
  background: rgb(249, 137, 28);
`;

const CancelButton = styled(Button)`
  box-shadow: inset -4px -6px 5.5px 0px rgba(0, 0, 0, 0.25);
  background: rgb(117, 118, 119);
`;

const DetailedTimer: React.FC<TimerProps> = ({
  id,
  duration,
  remaining,
  running,
  updateTimer,
  closeTimer,
  deleteTimer,
}) => {
  const { remaining: updatedRemaining, running: isRunning, pause, resume } = useTimer({
    id,
    duration,
    remaining,
    running,
    updateTimer,
  });

  useEffect(() => {
    if (updatedRemaining <= 0 && isRunning) {
      updateTimer(id, { running: false });
    }
  }, [updatedRemaining, isRunning, id, updateTimer]);

  const handlePauseResume = () => {
    if (isRunning) {
      pause();
    } else {
      resume();
    }
  };

  const reset = () => {
    closeTimer();
    deleteTimer(id);
  };

  return (
    <TimerContainer>
      <ControlButton text="Таймеры" onClick={closeTimer} />
      <CountdownCircleTimer
        isPlaying={isRunning}
        duration={duration}
        initialRemainingTime={updatedRemaining}
        colors={"#29A354"}
        trailColor="rgba(255,255,255, 0%)"
        size={257}
        strokeWidth={6}
      >
        {({ remainingTime }) => (
          <TimerDisplay>
            {`${Math.floor(remainingTime / 60)}:${remainingTime % 60 < 10 ? "0" : ""}${remainingTime % 60}`}
          </TimerDisplay>
        )}
      </CountdownCircleTimer>
      <ButtonsContainer>
        <PauseButton onClick={handlePauseResume}>
          {isRunning ? "Пауза" : "Возобновить"}
        </PauseButton>
        <CancelButton onClick={reset}>Отмена</CancelButton>
      </ButtonsContainer>
    </TimerContainer>
  );
};

export default DetailedTimer;


