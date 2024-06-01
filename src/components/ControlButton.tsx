import { FC } from "react";
import styled from "styled-components";
type ControlButtonProps = {
  text: string;
  onClick: () => void;
};
const Button = styled.button`
  color: rgb(41, 163, 84);
  padding: 0;
  font-size: 14px;
  font-weight: 700;
  line-height: 110%;
  letter-spacing: 0px;
  text-align: left;
  text-decoration-line: underline;
  background: none;
  border: none;
  &:hover {
    outline: none;
  }
  &:focus {
    outline: none;
  }
`;

const ControlButton: FC<ControlButtonProps> = ({ text, onClick }) => {
  return <Button onClick={onClick}>{text}</Button>;
};

export default ControlButton;
