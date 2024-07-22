import React from "react";
import { TasksHistory } from "./tasksHistory";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

interface ITask {
  text: string;
}

interface IAddTasks {
  inputValue: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  latestHistoryTasks: ITask[];
  handleClearHistory: () => void;
  handleReUseButton: (index: number) => void;
}

export const AddTasks = ({
  inputValue,
  handleChange,
  handleSubmit,
  latestHistoryTasks,
  handleClearHistory,
  handleReUseButton,
}: IAddTasks) => {
  return (
    <Card className="flex flex-row justify-center gap-2 border-hidden">
      <div className="hidden md:block">
      <TasksHistory
        latestHistoryTasks={latestHistoryTasks}
        handleClearHistory={handleClearHistory}
        handleReUseButton={handleReUseButton}
      />
      </div>
      <form
        autoComplete="off"
        onSubmit={handleSubmit}
        className="flex flex-row gap-1 md:gap-2"
      >
        <Input
          type="text"
          placeholder="What to do today?"
          minLength={3}
          maxLength={70}
          required={true}
          value={inputValue}
          onChange={handleChange}
          className="bg-primary rounded-md text-secondary text-lg md:w-96"
        />
        <Button type="submit" className="bg-primary">
          Add ToDo
        </Button>
      </form>
    </Card>
  );
};
