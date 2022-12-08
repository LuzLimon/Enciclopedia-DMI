import styled from "styled-components/native";

const Title = styled.Text`
  font-size: ${({ size }) => size || 20}px;
  color: ${({ color }) => color || "black"};
  font-weight: ${({ bold }) => (bold ? "bold" : "normal")};
`;

export default Title;
