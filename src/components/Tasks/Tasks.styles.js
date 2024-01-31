import styled from 'styled-components';

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
  autoComplete: 'off',
})`
display: flex;
flex-direction: row;
justify-content: center;
`;

export const InputText = styled.input.attrs({
  type: 'text',
  id:'inputText',
  placeholder:'What to do today?',
  minLength: '3',
  maxLength: '70',
  required: true,
})`
font-size: 2em;
border-radius: 7px;
border: 1px solid #005BA4;
padding: 0px 20px;

&:hover {
  background-color: lightblue;
  transition: 200ms ease-in-out;
}
`;

export const InputSubmit = styled.input.attrs({
  type: 'submit',
  value: 'Add Todo',
  id:'inputSubmit',
})`
font-size: 2em;
border-radius: 7px;
border: 1px solid #005BA4;
padding: 0px 20px;

&:hover {
  background-color: lightblue;
  transition: 200ms ease-in-out;
}
`;






// DisplayTasks

export const DisplayTasks = styled.div`
width: 90%;
height: 60vh;
padding: 15px;

display: flex;
flex-orientation: row;
justify-content: space-around;
`;

export const Fieldset = styled.fieldset`
width: 50%;
max-width: 600px;
min-height: 300px;
max-height: 450px;
overflow: auto;
border: 2px solid #005BA4;
background-color: lightblue;
`;

export const Legend = styled.legend`
background-color: transparent;
font-size: 25px;
font-weight: bold;

transition: 300ms ease-in-out;
`;




export const UnorderdList = styled.ul`
display: flex;
flex-direction: column;
justify-content: center;

max-height: inherit;
font-size: 1.5em;
padding: 0;
margin: 0;
`;

export const LiToDoTasks = styled.li`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;

list-style-type: bullet;
margin: 5px;
padding: 5px 10px;
background-color: #005BA4;
color: lightgrey;
border-radius: 10px;

&:hover {
    color: white;
    background: blue;
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
border: 1px solid #005BA4;
padding: 0px 20px;

&:hover {
  background-color: lightblue;
  transition: 200ms ease-in-out;
`;


export const ToDoTask = styled.p`
width: 100%;
margin: 0;
overflow: hidden;
`;

export const Buttons = styled.div`
display: flex;
flex-direction: row;
justify-content: space-evenly;
align-items: center;
margin: 0;
padding: 0;
width: 35%;
}
`;

export const Button = styled.button`
font-size: 0.75em;
border: 1px solid black;
border-radius: 5px;
padding: 5px 15px;
margin: 0;

&:hover {
border-radius: 50px;
background-color: darkorange;
transition: 300ms ease-in-out;
`;


export const LiDoneTasks = styled.li`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;

margin: 5px;
padding: 5px 10px;
background-color: darkorange;
color: black;
border-radius: 10px;

&:hover {
background: orange;
font-weight: bold;
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
  type: 'checkbox',
  id:'doneCheckbox',
})`

width: 17px;
height: 17px;
`;



// Styling for TaskHistory 


export const TaskHistory = styled.fieldset`
position: relative;
width: 60%;
margin: 0;

border: 2px solid #005BA4;

min-height: 40px;
max-height: 360px;
padding-bottom: 10px;


background-color: lightblue;

overflow: ${props => props.hasItems ? 'auto' : 'hidden'};
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
top: -2px;
right: 100px;

font-size: 0.75em;
border: 1px solid black;
border-radius: 5px;
padding: 5px 15px;
margin: 0;

&:hover {
border-radius: 50px;
background-color: darkorange;
transition: 300ms ease-in-out;
`;

export const ClearButton = styled.button`
position: absolute;
top: -2px;
right: 10px;

font-size: 0.75em;
border: 1px solid black;
border-radius: 5px;
padding: 5px 15px;
margin: 0;

&:hover {
border-radius: 50px;
background-color: darkorange;
transition: 300ms ease-in-out;
`;



export const LiHistory = styled.li`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;

box-sizing: border-box;

margin: 5px;
padding: 5px 10px;
background-color: darkorange;
color: black;
border-radius: 10px;

&:hover {
    background: orange;
    font-weight: bold;

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



export const MenuContainer = styled.div`
  position: relative;
  display: inline-block;
`;

export const DotsButton = styled.button`
  /* Add styles for your dots button here */
`;

export const Menu = styled.div`
  position: absolute;
  right: 0;
  background-color: white;
  border: 1px solid #ddd;
  z-index: 1;
`;

export const MenuItem = styled.div`
  padding: 8px 12px;
  cursor: pointer;
  &:hover {
    background-color: #f5f5f5;
  }
`;