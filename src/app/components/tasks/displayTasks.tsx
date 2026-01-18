"use client"

import React, { useState } from "react";
import { AddTasks } from "./displayTasks/addTasks";
import { TodosList } from "./displayTasks/todoList";
import { DonesList } from "./displayTasks/doneList";
import { toast } from "sonner";
import { useLocalStorage } from "@/hooks/useLocalStorage";

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
  const [dones, setDones] = useLocalStorage<Done[]>("todolist-dones", []);
  const [todos, setTodos] = useLocalStorage<Todo[]>("todolist-todos", []);
  const [historyTasks, setHistoryTasks] = useLocalStorage<Todo[]>("todolist-history", []);
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
      toast.success("Task added successfully!");
      if (todos.length >= 7) {
        toast.info("You're doing great planning ahead! Consider completing a few tasks first to stay focused.", {
          duration: 5000,
        });
      }
    } else {
      toast.error("Task must be at least 3 characters long");
      return null;
    }
  }

  function handleDelete(index: number) {
    const taskText = todos[index].text;
    setHistoryTasks([...historyTasks, todos[index]]);
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
    toast.info("Task moved to history");
  }

  function handleDone(index: number) {
    const task = todos[index];
    setDones([...dones, { ...task, isChecked: true }]);
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
    toast.success("Task completed!");
  }

  function handleCheckbox(index: number, checked: boolean) {
    if (!checked) {
      const doneTask = dones[index];
      setTodos([...todos, { ...doneTask, isChecked: false }]);
      const newDones = [...dones];
      newDones.splice(index, 1);
      setDones(newDones);
      toast.info("Task restored to active list");
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
      toast.success("Task restored from history");
    }
  }

  function handleClearHistory() {
    setHistoryTasks([]);
    toast.success("History cleared");
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
      toast.success("Task updated successfully");
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
    <div className="flex flex-col gap-6 md:gap-8 w-full mt-18 md:mt-24">
      <div className="w-full flex justify-center">
        <AddTasks
          inputValue={inputValue}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          latestHistoryTasks={latestHistoryTasks}
          handleClearHistory={handleClearHistory}
          handleReUseButton={handleReUseButton}
        />
      </div>
      
      <div className="w-full flex flex-col md:flex-row justify-between gap-4 md:gap-6">
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
      </div>
      
      <div className="w-full flex justify-center md:hidden">
        <TasksHistory 
          latestHistoryTasks={latestHistoryTasks}
          handleClearHistory={handleClearHistory}
          handleReUseButton={handleReUseButton}
        />
      </div>
    </div>
  );
};
