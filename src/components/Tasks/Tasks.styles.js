import styled from "styled-components";

// General
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;

  min-height: 80vh;
  margin: 0;
  padding: 0;
`;

// AddTasks
export const AddTask = styled.form.attrs({
  autoComplete: "off",
})`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const InputText = styled.input.attrs({
  type: "text",
  id: "inputText",
  placeholder: "What to do today?",
  minLength: "3",
  maxLength: "70",
  required: true,
})`
font-size: 2em;
border-radius: 7px;
border: 1px solid #005BA4;
padding: 0px 20px;

}
`;

export const InputSubmit = styled.input.attrs({
  type: "submit",
  value: "Add Todo",
  id: "inputSubmit",
})`
  font-size: 2em;
  border-radius: 7px;
  border: 1px solid #005ba4;
  padding: 0px 20px;
  max-width: 176px;
  background-color: blue;
  color: white;
  transition: 200ms ease-in-out;
  opacity: 0.7;

  &:hover {
    opacity: 1;
  }
`;

// DisplayTasks

export const DisplayTasks = styled.div`
  width: 90%;
  margin: 0;
  padding: 15px;
  display: flex;
  flex-orientation: row;
  justify-content: space-between;
`;

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

export const UnorderdList = styled.ul`
  box-sizing: border-box;
  font-size: 1.5em;
  padding: 5px;
  margin: 0;
  min-height: 250px;
  max-height: 380px;
`;

export const LiToDoTasks = styled.li`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding: 5px 10px;
  margin: 5px;
  background-color: #3440ff;
  color: white;
  border-radius: 10px;
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

export const ToDoTask = styled.p`
  width: 100%;
  margin: 0;
  overflow: hidden;

  user-select: none;
`;

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

export const Button = styled.button`
  font-size: 75%;
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
  @media (max-width: 600px) {
    font-size: 25%; // smaller font size for smaller screens
  }
`;

export const LiDoneTasks = styled.li`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;

margin: 5px;
padding: 5px 10px;
background-color: rgb(255, 165, 0);
opacity: 0.7;
color: black;
border-radius: 10px;

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

// Styling for TaskHistory

export const TaskHistory = styled.fieldset`
  position: relative;
  width: 60%;
  margin: 0;

  border: 1px solid #005ba4;

  min-height: 40px;
  max-height: 360px;
  padding-bottom: 10px;

  border-radius: 10px;
  background-color: #f1f2f4;

  overflow: ${(props) => (props.hasItems ? "auto" : "hidden")};
`;

export const UlHistory = styled.ul`
  display: flex;
  flex-direction: column;

  font-size: 1.5em;
  padding: 0;
  margin: 10px;
`;

export const LegendText = styled.p`
  margin: 0;
`;

export const HideShowButton = styled.button`
position: absolute;
top: 4px;
right: 100px;

font-size: 0.5em;
border: 1px solid black;
border-radius: 5px;
padding: 5px 15px;
margin: 0;

max-width: 88.5px;

&:hover {
border-radius: 50px;
font-weight: bold;
transition: 300ms ease-in-out;
background-color: orange;

&:hover {
border-radius: 50px;
font-weight: bold;
transition: 300ms ease-in-out;
background-color: orange;
`;

export const ClearButton = styled.button`
position: absolute;
top: 4px;
right: 10px;

font-size: 0.5em;
border: 1px solid black;
border-radius: 5px;
padding: 5px 15px;
margin: 0;

max-width: 88.5px;

&:hover {
border-radius: 50px;
font-weight: bold;
transition: 300ms ease-in-out;
background-color: orange;

&:hover {
border-radius: 50px;
font-weight: bold;
transition: 300ms ease-in-out;
background-color: orange;
`;

export const ReUseButton = styled.button`
font-size: 0.65em;
border: 1px solid black;
border-radius: 5px;
padding: 5px 15px;
margin: 0;
background-color: #D0D4DB;


&:hover {
border-radius: 50px;
font-weight: bold;
transition: 300ms ease-in-out;
background-color: orange;
`;

export const LiHistory = styled.li`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;

box-sizing: border-box;

margin: 5px;
padding: 5px 10px;
background-color: red;
color: black;
border-radius: 10px;
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
