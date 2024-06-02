import React, { useEffect } from "react";
import styled from "styled-components";
import IMAGES from "../assets/images";
import { useTimer } from "../hooks/useTimer";
import { TimerProps } from "../utils/types";

type TimerContainerProps = {
  jc: string;
  g: string;
};

const TimerContainer = styled.div<TimerContainerProps>`
  padding: 27px 0;
  display: flex;
  align-items: center;
  justify-content: ${(props) => props.jc};
  column-gap: ${(props) => props.g};
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const TimerDisplay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  font-weight: 700;
  height: 56px;
  color: #ffffff;
`;

const TimerDigits = styled.p`
  font-size: 36px;
  line-height: 1.1;
  margin: 0;
`;

const TimerDescription = styled.p`
  margin: 0;
  text-align: left;
  font-size: 10px;
`;

const ControlButton = styled.button`
  color: #ffffff;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
  margin: 0;
  &:hover {
    outline: none;
  }
  &:focus {
    outline: none;
  }
`;

const DeleteButton = styled(ControlButton)`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #dd363c;
  width: 20px;
  height: 20px;
  box-sizing: border-box;
  padding: 0;
  border-radius: 50%;

  &:hover {
    background-color: #c82333;
  }
`;

const Button = styled(ControlButton)`
  background-color: transparent;
  width: 56px;
  height: 56px;
  padding: 0;
`;

const ShortTimer: React.FC<TimerProps> = ({
  id,
  duration,
  remaining,
  running,
  updateTimer,
  isEditable,
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

  const deleted = () => {
    deleteTimer(id);
  };

  const handleResume = () => {
    if (updatedRemaining <= 0) {
      updateTimer(id, { remaining: duration, running: true });
    } else {
      resume();
    }
  };

  return (
    <TimerContainer
      jc={isEditable ? "flex-start" : "space-between"}
      g={isEditable ? "10px" : ""}
    >
      {isEditable && <DeleteButton onClick={deleted}>-</DeleteButton>}
      <TimerDisplay>
        {updatedRemaining > 0 ? (
          <TimerDigits>{`${Math.floor(updatedRemaining / 60)}:${
            updatedRemaining % 60 < 10 ? "0" : ""
          }${updatedRemaining % 60}`}</TimerDigits>
        ) : (
          <TimerDigits>{`${Math.floor(duration / 60)}:${
            duration % 60 < 10 ? "0" : ""
          }${duration % 60}`}</TimerDigits>
        )}
        <TimerDescription>{`${Math.round(
          duration / 60
        )} мин`}</TimerDescription>
      </TimerDisplay>
      {isRunning && !isEditable ? (
        <Button onClick={pause}>
          <img src={IMAGES.pause} alt="Пауза" />
        </Button>
      ) : (
        !isRunning &&
        !isEditable && (
          <Button onClick={handleResume}>
            <img src={IMAGES.play} alt="Возобновить" />
          </Button>
        )
      )}
    </TimerContainer>
  );
};

export default ShortTimer;
