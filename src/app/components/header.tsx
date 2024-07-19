import React from "react";
import { Counter } from "./counter";

export const Header = () => {
  return (
    <div className="mt-10 mb-20 mx-0 flex flex-row justify-around">
      <Counter />
      <h1 className="m-0 text-[55px] w-5/12 text-center">ToDo List</h1>
      <div className="w-1/3" />
    </div>
  );
};
