import React from "react";
import { Counter } from "./counter";

export const Header = () => {
  return (
    <div className="flex flex-row justify-between w-full mb-5 md:mb-0">
      <Counter />
      <h1 className="mt-5 text-3xl md:text-6xl w-5/12 text-center">ToDo List</h1>
      <div className="w-1/3" />
    </div>
  );
};
