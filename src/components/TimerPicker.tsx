import React from "react";
import styled from "styled-components";

interface TimePickerProps {
  minutes: number;
  seconds: number;
  onMinutesChange: (value: number) => void;
  onSecondsChange: (value: number) => void;
}

const PickerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const Label = styled.div`
  color: white;
  font-size: 20px;
  margin: 0 10px;

  @media (max-width: 600px) {
    margin: 10px 0;
  }
`;

const SelectWrapper = styled.div`
  position: relative;
  height: 195px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 600px) {
    height: 150px;
  }
`;

const Select = styled.select<{ size: number }>`
  background: rgb(26, 31, 35);
  color: white;
  font-size: 40px;
  font-weight: 700;
  text-align: center;
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  overflow-y: scroll;
  height: 195px;
  border: none;
  scroll-snap-align: start;

  &::-webkit-scrollbar {
    width: 0px;
    background: transparent; /* Chrome/Safari/Webkit */
  }

  & {
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE 10+ */
  }

  &:focus {
    outline: none;
    background: transparent;
  }

  option {
    display: flex;
    justify-content: center;
    font-weight: 700;
    align-items: flex-end;
    background: rgb(26, 31, 35);
    height: 59px;
    color: white; /* Ensure that the text color is white for all options */
  }

  @media (max-width: 600px) {
    font-size: 30px;
    height: 150px;

    option {
      height: 50px;
    }
  }
`;

const addPaddingOptions = (options: JSX.Element[], paddingCount: number) => {
  const paddingOption = (key: string) => (
    <option key={key} disabled style={{ visibility: "hidden" }}>
      {" "}
    </option>
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
  minutes,
  seconds,
  onMinutesChange,
  onSecondsChange,
}) => {
  const minuteOptions = addPaddingOptions(
    Array.from({ length: 60 }, (_, i) => (
      <option key={`minute-${i}`} value={i}>
        {i}
      </option>
    )),
    1
  );

  const secondOptions = addPaddingOptions(
    Array.from({ length: 60 }, (_, i) => (
      <option key={`second-${i}`} value={i}>
        {i}
      </option>
    )),
    1
  );

  return (
    <PickerContainer>
      <SelectWrapper>
        <Select
          size={3}
          value={minutes}
          onChange={(e) => onMinutesChange(Number(e.target.value))}
        >
          {minuteOptions}
        </Select>
      </SelectWrapper>
      <Label>мин</Label>
      <SelectWrapper>
        <Select
          size={3}
          value={seconds}
          onChange={(e) => onSecondsChange(Number(e.target.value))}
        >
          {secondOptions}
        </Select>
      </SelectWrapper>
      <Label>сек</Label>
    </PickerContainer>
  );
};

export default TimePicker;
