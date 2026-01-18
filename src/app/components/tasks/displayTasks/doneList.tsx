import React, { useState, useEffect } from "react";
import { CheckCircle2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area";

interface IDone {
  text: string;
  isChecked: boolean;
}

interface IDoneList {
  dones: IDone[];
  handleCheckbox: (index: number, isChecked: boolean) => void;
}

export const DonesList: React.FC<IDoneList> = ({ dones, handleCheckbox }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    React.startTransition(() => {
      setMounted(true);
    });
  }, []);

  // Show only last 10 completed tasks to keep UI clean
  const visibleDones = dones.slice(-10);
  const hiddenCount = dones.length - visibleDones.length;

  return (
    <Card className="w-full md:w-1/2 flex flex-col min-h-65 max-h-65 md:min-h-125 md:max-h-125 shadow-md border-2 transition-all hover:shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="text-2xl md:text-2xl font-semibold flex items-center gap-2">
          <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
          Completed
          {mounted && dones.length > 0 && (
            <span className="text-sm font-normal text-muted-foreground">
              ({dones.length})
            </span>
          )}
        </CardTitle>
        {mounted && hiddenCount > 0 && (
          <p className="text-xs text-muted-foreground mt-1">
            Showing last 10 completed tasks
          </p>
        )}
      </CardHeader>
      {mounted && visibleDones.length > 0 ? 
     <CardContent className="max-h-[500px] overflow-y-auto space-y-2">
      <ul className="flex flex-col gap-2">
        {visibleDones.map((done, index) => {
          const actualIndex = dones.length - visibleDones.length + index;
          return (
          <Card
            className="group transition-all hover:shadow-md border bg-green-50/50 dark:bg-green-950/20"
            key={actualIndex}
          >
            <div className="flex flex-row justify-between gap-2 items-center p-3">
              <s className="flex-1 text-base text-muted-foreground break-words min-w-0 overflow-hidden">
                {done.text}
              </s>
              <input
                type="checkbox"
                className="w-5 h-5 cursor-pointer accent-green-600 shrink-0"
                checked={done.isChecked}
                onChange={(e) => handleCheckbox(actualIndex, e.target.checked)}
                title="Uncheck to move back to active tasks"
                aria-label="Uncheck to restore task to active list"
              />
            </div>
          </Card>
        )})}
      </ul>
      </CardContent>  
    : (
      <CardContent className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-muted-foreground text-lg">No completed tasks yet</p>
        <p className="text-sm text-muted-foreground mt-1">Complete your first task!</p>
      </CardContent>
    )}
     
    </Card>
  );
};
