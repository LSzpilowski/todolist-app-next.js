import React from "react";
import * as S from "./Header.styles";
import { Counter } from "../Counter";

export const Header = () => {
  return (
    <S.Header>
      <Counter />
      <S.Title>ToDo List</S.Title>
      <S.Spacer />
    </S.Header>
  );
};
