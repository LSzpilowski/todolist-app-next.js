import styled from "styled-components";

export const Fieldset = styled.fieldset`
  width: 60%;
  overflow: auto;
  margin: 0 15px;
  border: 1px solid #005ba4;
  border-radius: 10px;
  background-color: #f1f2f4;
  box-sizing: border-box;
`;

export const Legend = styled.legend`
  background-color: transparent;
  font-size: 2em;
  font-weight: bold;
  transition: 300ms ease-in-out;
`;

export const LegendText = styled.p`
  margin: 0;
`;

export const UnorderdList = styled.ul`
  box-sizing: border-box;
  font-size: 1.5em;
  padding: 0;
`;

export const Button = styled.button`
  font-size: 0.75em;
  border: 1px solid black;
  border-radius: 5px;
  padding: 5px 15px;
  margin: 0;
  background-color: #d0d4db;
  max-width: 50%;

  &:hover {
    border-radius: 50px;
    font-weight: bold;
    transition: 300ms ease-in-out;
    background-color: orange;
    cursor: pointer;
  }
`;

export const LiTasks = styled.li`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 5px;
  padding: 5px 10px;
  border-radius: 10px;
`;
