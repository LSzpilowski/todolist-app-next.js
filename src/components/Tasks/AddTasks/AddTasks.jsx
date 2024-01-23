import React from 'react';
import * as S from './AddTasks.styles'


export const AddTasks = () => {
  return (
    <S.AddTasks>
      <input type='text' name='inputbox' value="" placeholder='What to do today?' />
      <input type='submit'  name='submitButton' value='Submit'/>
    </S.AddTasks>
  )
}