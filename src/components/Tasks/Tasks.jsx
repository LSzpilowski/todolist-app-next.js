import React, { useState } from "react";
import * as S from "./Tasks.styles";

import { AddTasks } from "./AddTasks/AddTasks";
import { TodosList } from "./DisplayTasks/TodosList/TodosList";
import { DonesList } from "./DisplayTasks/DonesList/DonesList";
import { TasksHistory } from "./DisplayTasks/TasksHistory/TasksHistory";

export const Tasks = () => {
  const [dones, setDones] = useState([]);
  const [todos, setTodos] = useState([]);

  const [historyTasks, setHistoryTasks] = useState([]);

  const [inputValue, setInputValue] = useState("");
  const [isToggled, setIsToggled] = useState(true);

  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState("");

  const onToggle = () => setIsToggled(!isToggled);
  const latestHistoryTasks = historyTasks.slice(-10);

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

  return (
    <S.Wrapper>
      <AddTasks
        inputValue={inputValue}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <S.DisplayTasks>
        <TodosList
          todos={todos}
          editingIndex={editingIndex}
          editingText={editingText}
          setEditingText={setEditingText}
          setEditingIndex={setEditingIndex}
          handleEditKeyPress={handleEditKeyPress}
          handleEditSave={handleEditSave}
          handleEditCancel={handleEditCancel}
          handleEditStart={handleEditStart}
          handleDone={handleDone}
          handleDelete={handleDelete}
        />
        <DonesList dones={dones} handleCheckbox={handleCheckbox} />
      </S.DisplayTasks>
      <TasksHistory
        historyTasks={historyTasks}
        latestHistoryTasks={latestHistoryTasks}
        onToggle={onToggle}
        isToggled={isToggled}
        handleClearHistory={handleClearHistory}
        handleReUseButton={handleReUseButton}
      />
    </S.Wrapper>
  );
};
