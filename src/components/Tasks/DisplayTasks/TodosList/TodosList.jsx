import React from "react";
import * as S from "./TodosList.styles";
import * as U from "../utils.styles";

import { DropdownMenu } from "../DropdownMenu/DropdownMenu";

export const TodosList = ({
  todos,
  editingIndex,
  editingText,
  setEditingText,
  handleEditKeyPress,
  handleEditSave,
  handleEditCancel,
  handleEditStart,
  handleDone,
  handleDelete,
}) => {
  return (
    <U.Fieldset>
      <U.Legend>
        Todo's List {todos.length > 0 ? `(${todos.length})` : ""}
      </U.Legend>
      <S.TodosList>
        {todos.map((todo, index) => (
          <S.LiTodosTasks key={index}>
            <S.TodoContainer>
              {editingIndex === index ? (
                <>
                  <S.InputEdit
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    onKeyUp={handleEditKeyPress}
                  />
                  <S.Buttons>
                    <U.Button onClick={handleEditSave}>Save</U.Button>
                    <U.Button onClick={handleEditCancel}>Cancel</U.Button>
                  </S.Buttons>
                </>
              ) : (
                <>
                  <S.ToDoTask onDoubleClick={() => handleEditStart(index)}>
                    {index + 1 + ". "}
                    {todo.text}
                  </S.ToDoTask>
                  <DropdownMenu
                    onEdit={() => handleEditStart(index)}
                    onDone={() => handleDone(index)}
                    onDelete={() => handleDelete(index)}
                  />
                </>
              )}
            </S.TodoContainer>
          </S.LiTodosTasks>
        ))}
      </S.TodosList>
    </U.Fieldset>
  );
};
