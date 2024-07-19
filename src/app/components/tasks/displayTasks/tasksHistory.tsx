import React from 'react';


interface ITask {
  text: string;
}

interface ITasksHistory {
  latestHistoryTasks: ITask[];
  onToggle: () => void;
  isToggled: boolean;
  handleClearHistory: () => void;
  handleReUseButton: (index: number) => void;
}

export const TasksHistory: React.FC<ITasksHistory> = ({
  latestHistoryTasks,
  onToggle,
  isToggled,
  handleClearHistory,
  handleReUseButton,
}) => {
  return (
    <fieldset className={`relative ${latestHistoryTasks.length > 0 ? 'has-items' : ''}`}>
      <legend className="bg-transparent text-2xl font-bold transform transition-all duration-300 ease-in-out">
        <p className="m-0">Your Task History</p>
        {latestHistoryTasks.length > 0 && (
          <>
            <button
              id="toggle"
              onClick={onToggle}
              className="absolute top-1 right-[100px] max-w-[88.5px] text-xs"
            >
              {!isToggled ? "Hide" : "Show"}
            </button>
            <button
              onClick={handleClearHistory}
              className="absolute top-1 right-2 max-w-[88.5px] text-xs"
            >
              Clear
            </button>
          </>
        )}
      </legend>
      {!isToggled && latestHistoryTasks.length > 0 && (
        <ul className="flex flex-col">
          {latestHistoryTasks.map((task, index) => (
            <li
              key={index}
              className="bg-red-500 text-black opacity-70 hover:opacity-100"
            >
              <div className="flex justify-between items-center w-full overflow-hidden">
                {task.text}
                <button
                  onClick={(e) => handleReUseButton(index)}
                  className="text-sm"
                >
                  Re-Use
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </fieldset>
  );
};
