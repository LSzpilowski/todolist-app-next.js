import styled from 'styled-components';

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
  required: true,
})`
font-size: 2em;
border-radius: 7px;
border: 1px solid #7D7D7D;
color: red;
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