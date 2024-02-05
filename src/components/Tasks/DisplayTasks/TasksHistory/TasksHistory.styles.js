import styled from "styled-components";
import "../utils.styles";
import { Fieldset, LiTasks, UnorderdList, Button } from "../utils.styles";

export const TaskHistoryFieldset = styled(Fieldset)`
  position: relative;
  display: ${(props) => (props.$hasitems ? "block" : "none")};
`;

export const UlHistory = styled(UnorderdList)`
  display: flex;
  flex-direction: column;
`;

export const LiHistoryTask = styled(LiTasks)`
background-color: red;
color: black;
opacity: 0.7;

&:hover {
opacity: 1;
`;

export const HistoryTask = styled.p`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  width: 100%;
  overflow: hidden;
`;

export const HideShowButton = styled(Button)`
  position: absolute;
  top: 4px;
  right: 100px;
  max-width: 88.5px;
  font-size: 0.5em;
`;

export const ClearButton = styled(Button)`
  position: absolute;
  top: 4px;
  right: 10px;
  max-width: 88.5px;
  font-size: 0.5em;
`;

export const ReUseButton = styled(Button)`
  font-size: 0.65em;
`;
