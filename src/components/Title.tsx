import styled from "styled-components";

export const Heading = styled.h1`
  color: rgb(255, 255, 255);
  font-size: 24px;
  font-weight: 700;
  line-height: 110%;
  letter-spacing: 0px;
  text-align: left;
`;
const Title = ({ text }: { text: string }) => {
  return <Heading>{text}</Heading>;
};

export default Title;
