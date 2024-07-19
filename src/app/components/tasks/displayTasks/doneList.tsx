import React from "react";

interface IDone {
  text: string;
  isChecked: boolean;
}

interface IDoneList {
  dones: IDone[];
  handleCheckbox: (index: number, isChecked: boolean) => void;
}

export const DonesList: React.FC<IDoneList> = ({ dones, handleCheckbox }) => {
  return (
    <fieldset className="w-[60%] overflow-auto mx-[15px] border-solid-[#005ba4] rounded-[10px] bg-[#f1f2f4] ">
      <legend className="bg-transparent text-[2em] font-bold transform transition-all duration-300 ease-in-out">
        <p className="m-0">
          Whats Done {dones.length > 0 ? `(${dones.length})` : ""}
        </p>
      </legend>
      <ul className="m-0 min-h-[250px] max-h-[380px] p-[5px]">
        {dones.map((done, index) => (
          <li
            className="bg-[rgb(255, 165, 0)] opacity-70 text-black hover:opacity-100"
            key={index}
          >
            <s className="flex flex-row justify-between items-center m-0 w-[100%] overflow-hidden">
              {done.text}
              <input
                type="checkbox"
                className="w-[17px] h-[17px]"
                checked={done.isChecked}
                onChange={(e) => handleCheckbox(index, e.target.checked)}
              />
            </s>
          </li>
        ))}
      </ul>
    </fieldset>
  );
};
