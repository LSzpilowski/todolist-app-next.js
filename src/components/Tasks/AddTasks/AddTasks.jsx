import React from "react";
import * as S from "./AddTasks.styles";

export const AddTasks = ({ inputValue, handleChange, handleSubmit }) => {
  return (
    <S.AddTask onSubmit={handleSubmit}>
      <S.InputText value={inputValue} onChange={handleChange} />
      <S.InputSubmit type="submit" />
    </S.AddTask>
  );
};
