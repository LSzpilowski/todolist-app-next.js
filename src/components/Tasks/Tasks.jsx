import React from 'react'
import { useState } from 'react';
import * as S from './Tasks.styles';


export const Tasks = () => {

const [dones, setDones] = useState([]);
const [todos, setTodos] = useState([]);
const [inputValue, setInputValue] = useState('');

function handleChange(e){
  setInputValue(e.target.value)
}

function handleSubmit(e){
    e.preventDefault();
    const trimmedInput = inputValue.trim();
  if (trimmedInput.length >= 3) {
    setTodos([...todos, trimmedInput])
    setInputValue('')
  } else {
     return null;
  }
}

function handleDelete(index){
  const newTodos = [...todos]
  newTodos.splice(index, 1)
  setTodos(newTodos)
}

function handleDone(index) {
  setDones([...dones, todos[index]])
  const newTodos = [...todos]
  newTodos.splice(index, 1)
  setTodos(newTodos)
}

  return(
    <S.Wrapper>
    <S.Form onSubmit={handleSubmit}>
      <S.InputText value={inputValue} onChange={handleChange}/>
      <S.InputSubmit type='submit'/>
    </S.Form>
    <S.TaskTable>
      <S.Fieldset>
        <S.Legend>
        Todo's List ({todos.length})
        </S.Legend>
        <S.UnorderdList>
          {todos.map((todo, index) => (
            <S.LiToDoTasks key={index}>
            <S.ToDoTask>{index+1+'. '}{todo}</S.ToDoTask>
            <S.Buttons>
            <S.DoneButton onClick={() => handleDone(index)}>Done</S.DoneButton>
            <S.DelButton onClick={() =>handleDelete(index)}>Delete</S.DelButton>
            </S.Buttons>
            </S.LiToDoTasks>
          ))}
        </S.UnorderdList>
      </S.Fieldset>

      <S.Fieldset>
        <S.Legend>What's Done ({dones.length})</S.Legend>
        <S.UnorderdList>
          {dones.map((done, index) => (
            <S.LiDoneTasks key={index}>
            <S.ToDoTask>{done}</S.ToDoTask>
            </S.LiDoneTasks>
          ))}
        </S.UnorderdList>
      </S.Fieldset>
    </S.TaskTable>
    </S.Wrapper>
  )
}