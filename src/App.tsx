import React from "react";
import styled from "styled-components";
import AddTimer from "./components/AddTimer";
import DetailedTimer from "./components/DetailedTimer";
import ShortTimer from "./components/ShortTimer";
import ControlPoint from "./components/ControlPoint";
import useTimers from "./hooks/useTimers";
import Title from "./components/Title";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0;
`;

const App: React.FC = () => {
  const {
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
  } = useTimers();

  return (
    <>
      {!addTimerIsOpen && !isTimerOpen && (
        <Container>
          <ControlPoint
            onEdit={toggleEditMode}
            onAdd={openAddTimer}
            showDelete={showDelete}
          />
          <Title text="Таймеры" />
          <div>
            {timers.map((timer) => (
              <ShortTimer
                key={timer.id}
                {...timer}
                updateTimer={updateTimer}
                deleteTimer={deleteTimer}
                openTimer={openTimer}
                isEditable={showDelete}
              />
            ))}
          </div>
        </Container>
      )}

      {addTimerIsOpen && (
        <AddTimer
          addTimer={addTimer}
          toggle={closeAddTimer}
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
