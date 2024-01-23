import React from 'react'
import { useState } from 'react';
import * as S from './Tasks.styles';


export const Tasks = () => {

const [todos, setTodos] = useState([]);
const [inputValue, setInputValue] = useState('');

function handleChange(e){
  setInputValue(e.target.value)
}

function handleSubmit(e){
  if (inputValue.length >= '3') {
    e.preventDefault()
    setTodos([...todos, inputValue])
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

  return(
    <>
    <S.Form>
      <S.InputText value={inputValue} onChange={handleChange}/>
      <S.InputSubmit onClick={handleSubmit}/>
    </S.Form>
    <S.UnorderdList>
      {todos.map((todo, index) => (
          <S.LiTask key={index}>{todo}
          <S.DelButton onClick={() =>handleDelete(index)}>Delete</S.DelButton>
          </S.LiTask>
        ))}
    </S.UnorderdList>
    </>
  )
}