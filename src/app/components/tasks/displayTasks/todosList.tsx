import React from "react";
import { DropdownMenu } from "./dropdownMenu";

interface ITodos {
  text: string;
}

interface ITodosList {
  todos: ITodos[];
  editingIndex: number | null;
  editingText: string;
  setEditingText: (value: string) => void
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
    <fieldset className="w-[60%] overflow-auto mx-[15px] border border-solid border-[#005ba4] rounded-[10px] bg-[#f1f2f4]">
      <legend className="bg-transparent text-2xl font-bold transform transition-all duration-300 ease-in-out">
        Todos List {todos.length > 0 ? `(${todos.length})` : ""}
      </legend>
      <ul className="m-0 min-h-[250px] max-h-[380px] p-[5px]">
        {todos.map((todo, index) => (
          <li
            key={index}
            className="bg-[#3440ff] text-white hover:bg-[#0f0ade]"
          >
            <div className="flex flex-row justify-between items-center w-full">
              {editingIndex === index ? (
                <>
                  <input
                    className="text-base rounded-[7px] border border-[#005ba4] p-[0px_20px] w-[70%] hover:bg-lightblue transition-[200ms] ease-in-out"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    onKeyUp={handleEditKeyPress}
                  />
                  <div className="flex flex-row justify-evenly items-center m-0 p-0 w-[30%]">
                    <button className="btn" onClick={handleEditSave}>
                      Save
                    </button>
                    <button className="btn" onClick={handleEditCancel}>
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p
                    className="w-full m-0 overflow-hidden select-none"
                    onDoubleClick={() => handleEditStart(index)}
                  >
                    {index + 1}. {todo.text}
                  </p>
                  <DropdownMenu
                    onEdit={() => handleEditStart(index)}
                    onDone={() => handleDone(index)}
                    onDelete={() => handleDelete(index)}
                  />
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </fieldset>
  );
};
