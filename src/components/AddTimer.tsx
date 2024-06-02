import React, { useState } from "react";
import styled from "styled-components";
import ControlButton from "./ControlButton";
import TimePicker from "./TimerPicker";
import { TimerType } from "../utils/types";
import Title from "./Title";

interface AddTimerProps {
  addTimer: (duration: number) => void;
  toggle: (a: boolean) => void;
  openTimer: (timer: TimerType) => void;
}

const ControlDiv = styled.div`
text-align: left;
`
const AddTimerContainer = styled.div`
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  color: white;
`;

const Button = styled.button`
  width: 206px;
  color: white;
  font-size: 20px;
  padding: 10px 20px;
  cursor: pointer;
  margin-top: 20px;
  border-radius: 32px;
  box-shadow: inset -4px -6px 5.5px 0px rgba(0, 0, 0, 0.25);
  background: rgb(41, 163, 84);
  border: none;
`;

const AddTimer: React.FC<AddTimerProps> = ({ addTimer, toggle, openTimer }) => {
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);

  const handleStart = () => {
    const duration = minutes * 60 + seconds;
    addTimer(duration);
    setMinutes(0);
    setSeconds(0);
    openTimer({ id: Date.now(), duration, remaining: duration, running: true });
  };
  const cancelTimer = () => {
    toggle(false);
  };

  return (
    <AddTimerContainer>
        <ControlDiv>
        <ControlButton text="Отменить" onClick={cancelTimer} />
        </ControlDiv>
     
        <Title text="Таймер" />
      <TimePicker
        minutes={minutes}
        seconds={seconds}
        onMinutesChange={(value) => setMinutes(value)}
        onSecondsChange={(value) => setSeconds(value)}
      />
      <Button onClick={handleStart}>Старт</Button>
    </AddTimerContainer>
  );
};

export default AddTimer;
