import React, { useState } from "react";
import AddTimer from "./components/AddTimer";
import DetailedTimer from "./components/DetailedTimer";
import ShortTimer from "./components/ShortTimer";
import styled from "styled-components";
import ControlButton from "./components/ControlButton";
import "./App.css";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0;
`;

const ControlPoint = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const AddButton = styled.button`
  color: rgb(41, 163, 84);
  font-size: 32px;
  font-weight: 700;
  line-height: 110%;
  letter-spacing: 0px;
  text-align: left;
  background: none;
  border: none;
  outline: none;
  padding: 0;
`;

export const Title = styled.h1`
  color: rgb(255, 255, 255);
  font-size: 24px;
  font-weight: 700;
  line-height: 110%;
  letter-spacing: 0px;
  text-align: left;
`;

export interface TimerType {
  id: number;
  duration: number;
  remaining: number;
  running: boolean;
}

const App: React.FC = () => {
  const [timers, setTimers] = useState<TimerType[]>([]);
  const [addTimerIsOpen, setAddTimerIsOpen] = useState<boolean>(false);
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [isTimerOpen, setIsTimerOpen] = useState<boolean>(false);
  const [currentTimer, setCurrentTimer] = useState<TimerType | null>(null);

  const openAddTimer = () => {
    setAddTimerIsOpen(true);
  };

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
    setAddTimerIsOpen(false);
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

  const editTimerList = () => {
    setShowDelete((showDelete) => !showDelete);
  };

  return (
    <>
      {!addTimerIsOpen && !isTimerOpen && (
        <Container>
          <ControlPoint>
            <ControlButton
              onClick={editTimerList}
              text={showDelete ? "Готово" : "Править"}
            />
            <AddButton onClick={openAddTimer}>+</AddButton>
          </ControlPoint>
          <Title>Таймеры</Title>

          <div>
            {timers.map((timer) => (
              <ShortTimer
                key={timer.id}
                {...timer}
                updateTimer={updateTimer}
                deleteTimer={deleteTimer}
                isEditable={showDelete}
              />
            ))}
          </div>
        </Container>
      )}

      {addTimerIsOpen && (
        <AddTimer
          addTimer={addTimer}
          toggle={setAddTimerIsOpen}
          openTimer={openTimer}
        />
      )}
      {isTimerOpen && currentTimer && (
        <DetailedTimer
          {...currentTimer}
          updateTimer={updateTimer}
          closeTimer={closeTimer}
          deleteTimer={deleteTimer}
        />
      )}
    </>
  );
};

export default App;

