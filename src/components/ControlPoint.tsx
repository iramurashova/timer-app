import React from "react";
import styled from "styled-components";
import ControlButton from "./ControlButton";

const ControlPointContainer = styled.div`
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

interface ControlPointProps {
  onEdit: () => void;
  onAdd: () => void;
  showDelete: boolean;
}

const ControlPoint: React.FC<ControlPointProps> = ({
  onEdit,
  onAdd,
  showDelete,
}) => (
  <ControlPointContainer>
    <ControlButton onClick={onEdit} text={showDelete ? "Готово" : "Править"} />
    <AddButton onClick={onAdd}>+</AddButton>
  </ControlPointContainer>
);

export default ControlPoint;
