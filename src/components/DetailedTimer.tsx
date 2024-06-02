import React, { useEffect } from "react";
import styled from "styled-components";
import ControlButton from "./ControlButton";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useTimer } from "../hooks/useTimer";
import { TimerProps } from "../utils/types";

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

const ButtonsContainer = styled.div`
  padding-top: 39px;
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const PauseButton = styled.button`
  width: 161px;
  padding: 13px 0;
  margin: 0;
  font-size: 1em;
  color: #ffffff;
  border: none;
  border-radius: 32px;
  cursor: pointer;
  transition: background-color 0.3s;
  box-shadow: inset -4px -6px 5.5px 0px rgba(0, 0, 0, 0.25);
  background: rgb(249, 137, 28);
  &:hover {
    outline: none;
  }
  &:focus {
    outline: none;
  }
`;

const CancelButton = styled(PauseButton)`
  box-shadow: inset -4px -6px 5.5px 0px rgba(0, 0, 0, 0.25);
  background: rgb(117, 118, 119);
`;
const ControlDiv = styled.div`
  width: 100%;
  padding-bottom: 16px;
  text-align: left;
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
  const {
    remaining: updatedRemaining,
    running: isRunning,
    pause,
    resume,
  } = useTimer({
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
    isRunning ? pause() : resume();
    
  };

  const reset = () => {
    closeTimer && closeTimer();
    deleteTimer(id);
  };

  return (
    <TimerContainer>
      <ControlDiv>
        <ControlButton
          text="Таймеры"
          onClick={() => {
            closeTimer && closeTimer();
            updateTimer(id, { running: isRunning});
          }}
        />
      </ControlDiv>

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
            {`${Math.floor(remainingTime / 60)}:${
              remainingTime % 60 < 10 ? "0" : ""
            }${remainingTime % 60}`}
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
