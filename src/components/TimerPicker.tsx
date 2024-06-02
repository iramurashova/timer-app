import React from "react";
import styled from "styled-components";

interface TimePickerProps {

  onMinutesChange: (value: number) => void;
  onSecondsChange: (value: number) => void;
}

const PickerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;

`;

const Label = styled.div`
  color: white;
  font-size: 20px;
  margin: 0 10px;

  }
`;

const ScrollList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 195px;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  width: 100px;

  &::-webkit-scrollbar {
    width: 0px;
    background: transparent; /* Chrome/Safari/Webkit */
  }

  & {
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE 10+ */
  }

  div {
    width: 100%;
    min-height: 65px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgb(26, 31, 35);
    color: white;
    font-size: 40px;
    font-weight: 700;
    scroll-snap-align: start;
    cursor: pointer;
  }
`;


const addPaddingOptions = (options: JSX.Element[], paddingCount: number) => {
  const paddingOption = (key: string) => (
    <div key={key} style={{ visibility: "hidden" }}>
      {" "}
    </div>
  );
  return [
    ...Array(paddingCount)
      .fill(null)
      .map((_, i) => paddingOption(`padding-start-${i}`)),
    ...options,
    ...Array(paddingCount)
      .fill(null)
      .map((_, i) => paddingOption(`padding-end-${i}`)),
  ];
};

const TimePicker: React.FC<TimePickerProps> = ({

  onMinutesChange,
  onSecondsChange,
}) => {
  const minuteOptions = addPaddingOptions(
    Array.from({ length: 60 }, (_, i) => (
      <div key={`minute-${i}`} onClick={() => onMinutesChange(i)}>
        {i}
      </div>
    )),
    1
  );

  const secondOptions = addPaddingOptions(
    Array.from({ length: 60 }, (_, i) => (
      <div key={`second-${i}`} onClick={() => onSecondsChange(i)}>
        {i}
      </div>
    )),
    1
  );

  return (
    <PickerContainer>
      <ScrollList>
        {minuteOptions}
      </ScrollList>
      <Label>мин</Label>
      <ScrollList>
        {secondOptions}
      </ScrollList>
      <Label>сек</Label>
    </PickerContainer>
  );
};

export default TimePicker;


