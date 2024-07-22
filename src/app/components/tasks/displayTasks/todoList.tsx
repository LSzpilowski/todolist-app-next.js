import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { ScrollArea } from "@radix-ui/react-scroll-area";

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
  return (
    <Card className="w-full md:w-1/2 flex flex-col md:min-h-80">
      <CardHeader>
        <CardTitle>
          Todos List {todos.length > 0 ? `(${todos.length})` : ""}
        </CardTitle>
      </CardHeader>
      {todos.length > 0 ? 
     <CardContent className={`max-h-44 md:max-h-72 w-full ${todos.length > 3 ? "overflow-y-scroll" : null} ${todos.length > 5 ? "md:overflow-y-scroll" : null}` }>
        <ul className="flex flex-col w-full gap-3">
          {todos.map((todo, index) => (
            <Card key={index} className="py-2 px-3 text-lg">
              <div className="flex flex-row justify-between items-center w-full ">
                {editingIndex === index ? (
                  <div className="flex flex-row w-full m-0 p-0 gap-2">
                    <Input
                      className="border-none text-lg"
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      onKeyUp={handleEditKeyPress}
                    />
                    <div className="flex flex-row justify-evenly items-center gap-1">
                      <Button className="size-8 px-8" onClick={handleEditSave}>
                        Save
                      </Button>
                      <Button
                        className="size-8 px-8"
                        onClick={handleEditCancel}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <p
                      className="w-full m-0 overflow-hidden select-none"
                      onDoubleClick={() => handleEditStart(index)}
                    >
                      {index + 1}. {todo.text}
                    </p>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button>
                          <BsThreeDotsVertical className="md:size-6" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-48">
                        <DropdownMenuItem>
                          <button className="hover:bg-secondary w-full" onClick={() => handleEditStart(index)}>
                            <p className="text-left">Edit</p>
                          </button>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <button className="hover:bg-secondary w-full" onClick={() => handleDone(index)}>
                            <p className="text-left">Done</p>
                          </button>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <button className="hover:bg-secondary w-full" onClick={() => handleDelete(index)}>
                            <p className="text-left">Delete</p>
                          </button>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </>
                )}
              </div>
            </Card>
          ))}
        </ul>
      </CardContent>  
   : null} 
     
    </Card>
  );
};
