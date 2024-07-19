import React from "react";

interface IAddTasks {
  inputValue: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const AddTasks = ({ inputValue, handleChange, handleSubmit } : IAddTasks) => {
  return (
    <form
      autoComplete="off"
      onSubmit={handleSubmit}
      className="flex flex-row justify-center mt-[15px] mb-[30px]"
    >
      <input
        type="text"
        placeholder="What to do today?"
        minLength={3}
        maxLength={70}
        required={true}
        value={inputValue}
        onChange={handleChange}
        className="text-[2em] rounded-[7px] border-solid-[#005BA4] px-[20px]"
      />
      <input type="submit" value="Add Todo" className="text-[2em] rounded-[7px] border-solid-[#005BA4] px-[20px] max-w-[176px] bg-blue-600 text-white transform transition-all duration-200 ease-in-out opacity-70 hover:opacity-100"/>
    </form>
  );
};
