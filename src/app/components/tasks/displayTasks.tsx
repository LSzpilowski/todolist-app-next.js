"use client"

import React, { useState } from "react";
import { AddTasks } from "./displayTasks/addTasks";
import { TodosList } from "./displayTasks/todoList";
import { DonesList } from "./displayTasks/doneList";

import { Card } from "@/components/ui/card";
import { TasksHistory } from "./displayTasks/tasksHistory";

interface Todo {
  text: string;
  isChecked: boolean;
}

interface Done {
  text: string;
  isChecked: boolean;
}

export const DisplayTasks: React.FC = () => {
  const [dones, setDones] = useState<Done[]>([]);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [historyTasks, setHistoryTasks] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingText, setEditingText] = useState<string>("");

  const latestHistoryTasks = historyTasks.slice(-10);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmedInput = inputValue.trim();
    if (trimmedInput.length >= 3) {
      setTodos([...todos, { text: trimmedInput, isChecked: false }]);
      setInputValue("");
    } else {
      return null;
    }
  }

  function handleDelete(index: number) {
    setHistoryTasks([...historyTasks, todos[index]]);
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  }

  function handleDone(index: number) {
    const task = todos[index];
    setDones([...dones, { ...task, isChecked: true }]);
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  }

  function handleCheckbox(index: number, checked: boolean) {
    if (!checked) {
      const doneTask = dones[index];
      setTodos([...todos, { ...doneTask, isChecked: false }]);
      const newDones = [...dones];
      newDones.splice(index, 1);
      setDones(newDones);
    } else {
      const newDones = [...dones];
      newDones[index].isChecked = true;
      setDones(newDones);
    }
  }

  function handleReUseButton(displayedIndex: number) {
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

  function handleEditStart(index: number) {
    setEditingIndex(index);
    setEditingText(todos[index].text);
  }

  function handleEditCancel() {
    setEditingIndex(null);
    setEditingText("");
  }

  function handleEditSave() {
    if (editingIndex !== null) {
      const newTodos = [...todos];
      newTodos[editingIndex] = { ...newTodos[editingIndex], text: editingText };

      setTodos(newTodos);
      handleEditCancel();
    }
  }

  function handleEditKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      handleEditSave();
    } else if (e.key === "Escape") {
      handleEditCancel();
    }
  }

  return (
    <Card className="border-hidden">
      <Card className="border-hidden">
      <AddTasks
        inputValue={inputValue}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        latestHistoryTasks={latestHistoryTasks}
        handleClearHistory={handleClearHistory}
        handleReUseButton={handleReUseButton}

      />
       </Card>
      <Card className="w-full flex flex-col md:flex-row justify-between gap-5 md:gap-10 p-5 md:p-10 border-hidden">
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
      </Card>
      <Card className="w-full flex flex-rw justify-center border-hidden my-5">
      <TasksHistory 
        latestHistoryTasks={latestHistoryTasks}
        handleClearHistory={handleClearHistory}
        handleReUseButton={handleReUseButton}
        />
        </Card>
    </Card>
  );
};
