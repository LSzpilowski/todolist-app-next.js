import React from "react";
import { useState } from "react";
import * as S from "./Tasks.styles";
import { DropdownMenu } from "./DisplayTasks/DropdownMenu/DropdownMenu";

export const Tasks = () => {
  const [dones, setDones] = useState([]);
  const [todos, setTodos] = useState([]);
  const [historyTasks, setHistoryTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isToggled, setIsToggled] = useState(true);

  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState("");

  function handleChange(e) {
    setInputValue(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const trimmedInput = inputValue.trim();
    if (trimmedInput.length >= 3) {
      setTodos([...todos, { text: trimmedInput, isChecked: false }]);
      setInputValue("");
    } else {
      return null;
    }
  }

  function handleDelete(index) {
    setHistoryTasks([...historyTasks, todos[index]]);

    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);


  }

  function handleDone(index) {
    const task = todos[index];
    setDones([...dones, { ...task, isChecked: true }]);

    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);


  }

  function handleCheckbox(index, checked) {
    if (!checked) {
      const doneTask = dones[index];
      setTodos([...todos, { ...doneTask, isChecked: false }]);
      const newDones = [...dones];
      newDones.splice(index, 1);
      setDones(newDones);
    } else {
      // Update the isChecked state for the item
      const newDones = [...dones];
      newDones[index].isChecked = true;
      setDones(newDones);
    }
  }

  function handleReUseButton(displayedIndex) {
    const originalIndex =
      Math.max(historyTasks.length - 10, 0) + displayedIndex;
    if (originalIndex >= 0 && originalIndex < historyTasks.length) {
      setTodos([...todos, historyTasks[originalIndex]]);
      const newHistoryTasks = [...historyTasks];
      newHistoryTasks.splice(originalIndex, 1);
      setHistoryTasks(newHistoryTasks);
    }
  }

  function handleClearHistory() {
    setHistoryTasks([]);
  }

  function handleEditStart(index) {
    setEditingIndex(index);
    setEditingText(todos[index].text);
  }

  function handleEditCancel() {
    setEditingIndex(null);
    setEditingText("");
  }

  function handleEditSave() {
    const newTodos = [...todos];
    newTodos[editingIndex] = { ...newTodos[editingIndex], text: editingText };

    setTodos(newTodos);
    handleEditCancel();
  }

  function handleEditKeyPress(e) {
    if (e.key === "Enter") {
      handleEditSave();
    } else if (e.key === "Escape") {
      handleEditCancel();
    }
  }

  const onToggle = () => setIsToggled(!isToggled);

  const latestHistoryTasks = historyTasks.slice(-10);

  return (
    <S.Wrapper>
      <S.AddTask onSubmit={handleSubmit}>
        <S.InputText value={inputValue} onChange={handleChange} />
        <S.InputSubmit type="submit" />
      </S.AddTask>

      <S.DisplayTasks>
        <S.Fieldset>
          <S.Legend>
            Todo's List {todos.length > 0 ? `(${todos.length})` : ""}
          </S.Legend>

          <S.UnorderdList>
            {todos.map((todo, index) => (
              <S.LiToDoTasks key={index}>
                <S.TodoContainer>
                  {editingIndex === index ? (
                    <>
                      <S.InputEdit
                        value={editingText}
                        onChange={(e) => setEditingText(e.target.value)}
                        onKeyUp={handleEditKeyPress}
                      />
                      <S.Button onClick={handleEditSave}>Save</S.Button>
                      <S.Button onClick={handleEditCancel}>Cancel</S.Button>
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
              </S.LiToDoTasks>
            ))}
          </S.UnorderdList>
        </S.Fieldset>

        <S.Fieldset>
          <S.Legend>
            <S.LegendText>
              What's Done {dones.length > 0 ? `(${dones.length})` : ""}
            </S.LegendText>
          </S.Legend>
          <S.UnorderdList>
            {dones.map((done, index) => (
              <S.LiDoneTasks key={index}>
                <S.DoneTask>
                  {done.text}
                  <S.DoneCheckbox
                    checked={done.isChecked}
                    onChange={(e) => handleCheckbox(index, e.target.checked)}
                  />
                </S.DoneTask>
              </S.LiDoneTasks>
            ))}
          </S.UnorderdList>
        </S.Fieldset>
      </S.DisplayTasks>

      <S.TaskHistory hasItems={historyTasks.length > 0}>
        <S.Legend>
          <S.LegendText>Your Task History</S.LegendText>
          {latestHistoryTasks.length > 0 && (
            <>
              <S.HideShowButton id="toggle" onClick={onToggle}>
                {!isToggled ? "Hide" : "Show"}
              </S.HideShowButton>
              <S.ClearButton onClick={handleClearHistory}>Clear</S.ClearButton>
            </>
          )}
        </S.Legend>
        {!isToggled && (
          <S.UlHistory>
            {latestHistoryTasks.map((task, index) => (
              <S.LiHistory key={index}>
                <S.HistoryTask>
                  {task.text}
                  <S.Button onClick={(e) => handleReUseButton(index)}>
                    Re-Use
                  </S.Button>
                </S.HistoryTask>
              </S.LiHistory>
            ))}
          </S.UlHistory>
        )}
      </S.TaskHistory>
    </S.Wrapper>
  );
};
