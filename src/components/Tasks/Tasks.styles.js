import styled from 'styled-components';

// AddTasks
export const Form = styled.form.attrs({
  autoComplete: 'off',
})`
display: flex;
flex-direction: row;
justify-content: center;
padding: 15px;
margin-top: 50px;
`;

export const InputText = styled.input.attrs({
  type: 'text',
  id:'inputText',
  placeholder:'What to do today?',
  minLength: '3',
  maxLength: '50',
  required: true,
})`
font-size: 2em;
border-radius: 7px;
border: 1px solid #7D7D7D;
padding: 0px 20px;
`;

export const InputSubmit = styled.input.attrs({
  type: 'submit',
  value: 'Add Todo',
  id:'inputSubmit',
})`
font-size: 2em;
border-radius: 7px;
border: 1px solid #7D7D7D;
padding: 0px 20px;
`;

// DisplayTasks
export const UnorderdList = styled.ul`
max-width: 800px;
min-height: 33px;
max-height: 400px;
overflow: auto;

padding: 10px;
margin: 25px auto;
list-style-type: none;
max-items: 10;
border: 1px solid black;
`;

export const LiTask = styled.li`
font-size: 1.5em;
margin: 0;
`;

export const DelButton = styled.button`
margin: 0 0 0 10px;
font-size: 0.8em;
padding: 2px 10px;
border-radius: 5px;
border: 1px solid grey;
`;