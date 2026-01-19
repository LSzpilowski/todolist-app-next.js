"use client"

import React, { useState } from "react";
import { AddTasks } from "./displayTasks/addTasks";
import { TodosList } from "./displayTasks/todoList";
import { DonesList } from "./displayTasks/doneList";
import { toast } from "sonner";
import { useTasksStore } from "@/store/tasksStore";
import { useAuthStore } from "@/store/authStore";

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
  const { user } = useAuthStore();
  const { tasks, doneTasks, addTask, updateTask, deleteTask, markAsDone, undoTask, deleteFromDone } = useTasksStore();
  
  const [inputValue, setInputValue] = useState<string>("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingText, setEditingText] = useState<string>("");
  const [historyTasks, setHistoryTasks] = useState<Todo[]>([]);

  const latestHistoryTasks = historyTasks.slice(-10);

  // Convert our Task[] to Todo[] format for compatibility with child components
  const todos: Todo[] = tasks.map(t => ({ text: t.text, isChecked: false }));
  const dones: Done[] = doneTasks.map(t => ({ text: t.text, isChecked: true }));

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmedInput = inputValue.trim();
    if (trimmedInput.length >= 3) {
      await addTask(trimmedInput, user?.id);
      setInputValue("");
      toast.success("Task added successfully!");
      if (tasks.length >= 7) {
        toast.info("You're doing great planning ahead! Consider completing a few tasks first to stay focused.", {
          duration: 5000,
        });
      }
    } else {
      toast.error("Task must be at least 3 characters long");
      return null;
    }
  }

  async function handleDelete(index: number) {
    const task = tasks[index];
    await deleteTask(task.id, user?.id);
    // Add to history (local only, not synced)
    setHistoryTasks([...historyTasks, { text: task.text, isChecked: false }]);
    toast.info("Task moved to history");
  }

  async function handleDone(index: number) {
    const task = tasks[index];
    await markAsDone(task.id, user?.id);
    toast.success("Task completed!");
  }

  async function handleCheckbox(index: number, checked: boolean) {
    if (!checked) {
      const doneTask = doneTasks[index];
      await undoTask(doneTask.id, user?.id);
      toast.info("Task restored to active list");
    }
  }

  async function handleReUseButton(displayedIndex: number) {
    const originalIndex = Math.max(historyTasks.length - 10, 0) + displayedIndex;
    if (originalIndex >= 0 && originalIndex < historyTasks.length) {
      await addTask(historyTasks[originalIndex].text, user?.id);
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

  async function handleEditStart(index: number) {
    setEditingIndex(index);
    setEditingText(tasks[index].text);
  }

  function handleEditCancel() {
    setEditingIndex(null);
    setEditingText("");
  }

  async function handleEditSave() {
    if (editingIndex !== null) {
      const task = tasks[editingIndex];
      await updateTask(task.id, editingText, user?.id);
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
