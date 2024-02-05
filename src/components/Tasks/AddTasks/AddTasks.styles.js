import styled from "styled-components";

export const AddTask = styled.form.attrs({
  autoComplete: "off",
})`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 15px 0 30px 0;
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
