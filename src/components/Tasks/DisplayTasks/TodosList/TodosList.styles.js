import styled from 'styled-components';
import { LiTasks } from '../utils.styles';

export const Buttons = styled.div`
display: flex;
flex-direction: row;
justify-content: space-evenly;
align-items: center;
margin: 0;
padding: 0;
width: 30%;
}
`;

export const LiTodosTasks = styled(LiTasks)`
background-color: #3440ff;
  color: white;
  &:hover {
    background-color: rgb(15, 10, 222);
}
`;

export const TodoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const ToDoTask = styled.p`
  width: 100%;
  margin: 0;
  overflow: hidden;
  user-select: none;
`;

export const InputEdit = styled.input`
  font-size: 1em;
  border-radius: 7px;
  border: 1px solid #005ba4;
  padding: 0px 20px;
  width: 70%;

  &:hover {
    background-color: lightblue;
    transition: 200ms ease-in-out;
  }
`;