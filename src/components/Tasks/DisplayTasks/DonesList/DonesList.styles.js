import styled from "styled-components";
import { LiTasks, UnorderdList } from "../utils.styles";

export const DonesList = styled(UnorderdList)`
  margin: 0;
  min-height: 250px;
  max-height: 380px;
  padding: 5px;
`;

export const LiDoneTasks = styled(LiTasks)`
background-color: rgb(255, 165, 0);
opacity: 0.7;
color: black;

&:hover {
opacity: 1;
`;

export const DoneTask = styled.s`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  width: 100%;
  overflow: hidden;
`;

export const DoneCheckbox = styled.input.attrs({
  type: "checkbox",
  id: "doneCheckbox",
})`
  width: 17px;
  height: 17px;
`;
