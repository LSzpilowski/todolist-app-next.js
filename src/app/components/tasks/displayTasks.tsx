"use client"

import React, { useState } from "react";
import { AddTasks } from "./displayTasks/addTasks";
import { TodosList } from "./displayTasks/todoList";
import { DonesList } from "./displayTasks/doneList";
import { toast } from "sonner";
import { useTasksStore } from "@/store/tasksStore";
import { useAuthStore } from "@/store/authStore";
import { TasksHistory } from "./displayTasks/tasksHistory";
import { TemplateSheet } from "./displayTasks/templateSheet";
import type { Task } from "@/store/tasksStore";

interface Todo {
  id: string;
  text: string;
  isChecked: boolean;
}

interface Done {
  id: string;
  text: string;
  isChecked: boolean;
}

export const DisplayTasks: React.FC = () => {
  const { user } = useAuthStore();
  const { 
    getActiveTasks,
    getCompletedTasks, 
    getDeletedTasks,
    addTask, 
    updateTask, 
    deleteTask, 
    markAsCompleted, 
    undoTask,
    archiveTask,
    archiveAllCompleted,
    clearHistory
  } = useTasksStore();
  
  const [inputValue, setInputValue] = useState<string>("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingText, setEditingText] = useState<string>("");

  // Get tasks using new getters
  const activeTasks = getActiveTasks();
  const completedTasks = getCompletedTasks();
  const deletedTasks = getDeletedTasks();

  const todos: Todo[] = activeTasks.map(t => ({ id: t.id, text: t.text, isChecked: false }));
  const dones: Done[] = completedTasks.map(t => ({ id: t.id, text: t.text, isChecked: true }));
  const historyTasks: Todo[] = deletedTasks.slice(-10).map(t => ({ id: t.id, text: t.text, isChecked: false }));

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
      if (activeTasks.length >= 7) {
        toast.info("You're doing great planning ahead! Consider completing a few tasks first to stay focused.", {
          duration: 5000,
        });
      }
    } else {
      toast.error("Task must be at least 3 characters long");
    }
  }

  async function handleDelete(index: number) {
    const task = activeTasks[index];
    await deleteTask(task.id, user?.id);
    toast.info("Task moved to history");
  }

  async function handleDone(index: number) {
    const task = activeTasks[index];
    await markAsCompleted(task.id, user?.id);
    toast.success("Task completed!");
  }

  async function handleUndo(index: number) {
    const doneTask = completedTasks[index];
    await undoTask(doneTask.id, user?.id);
    toast.info("Task restored to active list");
  }

  async function handleArchive(index: number) {
    const task = completedTasks[index];
    await archiveTask(task.id, user?.id);
    toast.info("Task archived");
  }

  async function handleArchiveAll() {
    await archiveAllCompleted(user?.id);
    toast.success("All completed tasks archived");
  }

  async function handleReUseButton(index: number) {
    const deletedTasksList = getDeletedTasks();
    const last10 = deletedTasksList.slice(-10);
    const task = last10[index];
    if (task) {
      console.log('Restoring task from history:', task);
      await undoTask(task.id, user?.id);
      toast.success("Task restored from history");
    } else {
      console.error('Task not found at index:', index);
    }
  }

  function handleClearHistory() {
    clearHistory(user?.id);
    toast.success("History cleared");
  }

  async function handleEditStart(index: number) {
    setEditingIndex(index);
    setEditingText(activeTasks[index].text);
  }

  function handleEditCancel() {
    setEditingIndex(null);
    setEditingText("");
  }

  async function handleEditSave() {
    if (editingIndex !== null) {
      const task = activeTasks[editingIndex];
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
      <div className="w-full flex justify-center items-center gap-3 md:gap-4">
        <AddTasks
          inputValue={inputValue}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          historyTasks={historyTasks}
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
        <DonesList 
          dones={dones} 
          handleUndo={handleUndo}
          handleArchive={handleArchive}
          handleArchiveAll={handleArchiveAll}
        />
      </div>
      
      <div className="w-full flex justify-center gap-4 md:hidden">
        <TemplateSheet />
        <TasksHistory 
          latestHistoryTasks={historyTasks}
          handleClearHistory={handleClearHistory}
          handleReUseButton={handleReUseButton}
        />
      </div>
    </div>
  );
};
