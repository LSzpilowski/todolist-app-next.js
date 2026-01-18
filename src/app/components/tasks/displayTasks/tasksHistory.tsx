import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { History, RotateCcw } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    React.startTransition(() => {
      setMounted(true);
    });
  }, []);

  return (
    <>
    {mounted && latestHistoryTasks.length > 0 ? 
      <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="lg" className="gap-2" aria-label="Open task history">
          <History className="h-5 w-5" />
          History
          <span className="text-xs bg-primary text-primary-foreground rounded-full px-2 py-0.5">
            {latestHistoryTasks.length}
          </span>
        </Button>
      </SheetTrigger>
      <SheetContent className="max-h-screen w-full sm:max-w-lg bg-black">
        <SheetHeader>
          <SheetTitle>Task History</SheetTitle>
          <SheetDescription>
            Recently deleted tasks. You can reuse them.
          </SheetDescription>
          <p className="text-xs text-muted-foreground mt-2">
            Showing last 10 deleted tasks
          </p>
        </SheetHeader>
        <Card className="flex flex-col h-full border-0 shadow-none mt-6">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="flex flex-col items-center justify-between gap-4">
              {latestHistoryTasks.length > 0 && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="w-full bg-black/50 dark:bg-white text-white dark:text-black hover:bg-black/70 dark:hover:bg-white/90"
                      aria-label="Clear all task history"
                    >
                      Clear All History
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-black text-white hover:bg-black/90 z-9999">
                    <AlertDialogHeader>
                      <AlertDialogTitle>Clear All History?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently delete all {latestHistoryTasks.length} task{latestHistoryTasks.length > 1 ? 's' : ''} from history. This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="hover:opacity-80" >Cancel</AlertDialogCancel>
                      <AlertDialogAction 
                        onClick={handleClearHistory}
                        className="bg-white text-black hover:bg-white/80"
                      >
                        Clear All
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </CardTitle>
          </CardHeader>
          {latestHistoryTasks.length > 0 ? 
             <CardContent className="px-0 overflow-y-auto">
            {latestHistoryTasks.length > 0 && (
              <ul className="flex flex-col gap-2">
                {latestHistoryTasks.map((task, index) => (
                  <Card key={index} className="group transition-all hover:shadow-md hover:bg-black/10 dark:hover:bg-white/10 border-2">
                    <div className="py-3 px-4 text-base flex justify-between items-center w-full">
                      <span className="flex-1 overflow-hidden break-words min-w-0">{task.text}</span>
                      <Button
                        onClick={(e) => handleReUseButton(index)}
                        size="sm"
                        variant="secondary"
                        className="ml-3 gap-2 shrink-0"
                        aria-label="Restore task from history"
                      >
                        <RotateCcw className="h-4 w-4" />
                        Reuse
                      </Button>
                    </div>
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
