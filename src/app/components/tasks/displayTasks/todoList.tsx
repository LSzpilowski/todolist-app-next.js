import React, { useState, useEffect } from "react";
import { ListTodo, Pencil, Check, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tooltip } from "@/components/ui/tooltip";
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

interface ITodos {
  text: string;
}

interface ITodosList {
  todos: ITodos[];
  editingIndex: number | null;
  editingText: string;
  setEditingText: (value: string) => void;
  setEditingIndex: (value: number | null) => void;
  handleEditKeyPress: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  handleEditSave: () => void;
  handleEditCancel: () => void;
  handleEditStart: (index: number) => void;
  handleDone: (index: number) => void;
  handleDelete: (index: number) => void;
}

export const TodosList: React.FC<ITodosList> = ({
  todos,
  editingIndex,
  editingText,
  setEditingText,
  handleEditKeyPress,
  handleEditSave,
  handleEditCancel,
  handleEditStart,
  handleDone,
  handleDelete,
}) => {
  const [mounted, setMounted] = useState(false);

  // This useEffect only runs on client after hydration
  useEffect(() => {
    // Use startTransition to avoid cascading render warning
    React.startTransition(() => {
      setMounted(true);
    });
  }, []);

  return (
    <Card className="w-full md:w-1/2 flex flex-col min-h-65 max-h-65 md:min-h-96 md:min-h-110 md:max-h-110 shadow-md border-2 transition-all hover:shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl md:text-2xl font-semibold flex items-center gap-2">
          <ListTodo className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          Active Tasks
          {mounted && todos.length > 0 && (
            <span className="text-sm font-normal text-muted-foreground">
              ({todos.length})
            </span>
          )}
        </CardTitle>
      </CardHeader>
      {mounted && todos.length > 0 ? 
     <CardContent className="flex-1 w-full overflow-y-auto space-y-2 min-h-0">
        <ul className="flex flex-col w-full gap-2">
          {todos.map((todo, index) => (
            <Card key={index} className="group transition-all hover:shadow-md hover:bg-black/10 dark:hover:bg-white/10 border">
              <div className="flex flex-row justify-between gap-2 items-center w-full p-3">
                {editingIndex === index ? (
                  <div className="flex flex-row w-full m-0 p-0 gap-2">
                    <Input
                      className="text-base focus-visible:ring-1 focus-visible:ring-offset-0"
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      onKeyUp={handleEditKeyPress}
                      autoFocus
                    />
                    <div className="flex flex-row justify-evenly items-center gap-1">
                      <Button className="bg-black/50 dark:bg-white text-white dark:text-black hover:bg-black/70 dark:hover:bg-white/90" size="sm" onClick={handleEditSave}>
                        Save
                      </Button>
                      <Button
                        className="hover:bg-black/10 dark:hover:bg-white/10"
                        size="sm"
                        variant="outline"
                        onClick={handleEditCancel}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <p
                      className="w-full m-0 overflow-hidden select-none text-base group-hover:text-primary transition-colors cursor-pointer break-words"
                      onDoubleClick={() => handleEditStart(index)}
                      title="Double click to edit"
                    >
                      <span className="font-semibold text-muted-foreground mr-2">{index + 1}.</span>
                      {todo.text}
                    </p>
                    <div className="flex gap-2 md:opacity-0 md:group-hover:opacity-100 opacity-100 transition-opacity shrink-0">
                      <Tooltip content="Edit">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 bg-white text-black"
                          onClick={() => handleEditStart(index)}
                          aria-label="Edit task"
                        >
                          <Pencil className="h-4 w-4 rounded" />
                        </Button>
                      </Tooltip>
                      
                      <Tooltip content="Mark as Done">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 bg-white text-black"
                          onClick={() => handleDone(index)}
                          aria-label="Mark task as done"
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                      </Tooltip>
                      
                      <AlertDialog>
                        <Tooltip content="Delete">
                          <AlertDialogTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 bg-white text-black"
                              aria-label="Delete task"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                        </Tooltip>
                        <AlertDialogContent className="bg-black text-white hover:bg-black/90 z-9999">
                          <AlertDialogHeader >
                            <AlertDialogTitle>Delete Task?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This task will be moved to history. You can restore it from there.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="hover:opacity-80">Cancel</AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={() => handleDelete(index)}
                              className="bg-white text-black hover:bg-white/80"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </>
                )}
              </div>
            </Card>
          ))}
        </ul>
      </CardContent>  
   : (
     <CardContent className="flex flex-col items-center justify-center py-12 text-center">
       <p className="text-muted-foreground text-lg">No active tasks</p>
       <p className="text-sm text-muted-foreground mt-1">Add a new task to get started!</p>
     </CardContent>
   )} 
     
    </Card>
  );
};
