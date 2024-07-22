import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface ITask {
  text: string;
}

interface ITasksHistory {
  latestHistoryTasks: ITask[];
  handleClearHistory: () => void;
  handleReUseButton: (index: number) => void;
}

export const TasksHistory: React.FC<ITasksHistory> = ({
  latestHistoryTasks,
  handleClearHistory,
  handleReUseButton,
}) => {


  return (
    <>
    {latestHistoryTasks.length > 0 ? 
      <Sheet>
      <SheetTrigger className="m-0">
        <Button>History List</Button>
      </SheetTrigger>
      <SheetContent className="max-h-screen w-full">
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="flex flex-col items-center justify-between gap-4">
              <p className="m-0 text-2xl font-bold">Your Task History</p>
              {latestHistoryTasks.length > 0 && (
                <Button
                  onClick={handleClearHistory}
                  className="size-6 px-8  "
                >
                  Clear all
                </Button>
              )}
            </CardTitle>
          </CardHeader>
          {latestHistoryTasks.length > 0 ? 
             <CardContent>
            {latestHistoryTasks.length > 0 && (
              <ul className="flex flex-col gap-3">
                {latestHistoryTasks.map((task, index) => (
                  <Card key={index} className="py-2 px-3 text-lg flex justify-between items-center w-full hover:bg-secondary">
                      {task.text}
                      <Button
                        onClick={(e) => handleReUseButton(index)}
                        className="size-6 px-8"
                      >
                        Re-Use
                      </Button>
                  </Card>
                ))}
              </ul>
            )}
          </CardContent>
          : null}
        </Card>
      </SheetContent>
    </Sheet>
      : <></>}
      </>
  );
};
