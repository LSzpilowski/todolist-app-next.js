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
export const Form = styled.form.attrs({
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
  maxLength: '100',
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

export const TaskTable = styled.div`
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
font-size: 25px;
font-weight: bold;
`;



export const UnorderdList = styled.ul`
display: flex;
flex-direction: column;
justify-content: space-between;

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
    background: #115CA9;
    font-weight: bold;
`;

export const ToDoTask = styled.p`
list-style-type: bullet;
margin: 0;
width: 65%;
overflow: hidden;
`;

export const Buttons = styled.div`
display: flex;
flex-direction: row;
justify-content: space-evenly;
align-items: center;
width: 35%;


}
`;

export const DoneButton = styled.button`
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

export const DelButton = styled.button`
font-size: 0.75em;
border: 1px solid black;
border-radius: 5px;
padding: 5px 15px;
margin: 0;

&:hover {
border-radius: 50px;
background-color: firebrick;
transition: 300ms ease-in-out;
`;


export const LiDoneTasks = styled.li`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;

list-style-type: bullet;
margin: 5px;
padding: 5px 10px;
background-color: darkorange;
color: black;
border-radius: 10px;

&:hover {
    background: orange;
    font-weight: bold;
`;
export const DoneTask = styled.p`
list-style-type: bullet;
margin: 0;
width: 65%;
overflow: hidden;
`;