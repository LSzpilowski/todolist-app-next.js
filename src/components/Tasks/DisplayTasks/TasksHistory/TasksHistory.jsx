import React from 'react';
import * as S from './TasksHistory.styles';
import * as U from '../utils.styles';

export const TasksHistory = ({
  historyTasks,
  latestHistoryTasks,
  onToggle,
  isToggled,
  handleClearHistory,
  handleReUseButton,
}) => {
  return (
    <S.TaskHistoryFieldset $hasitems={latestHistoryTasks.length > 0}>
      <U.Legend>
        <U.LegendText>Your Task History</U.LegendText>
        {latestHistoryTasks.length > 0 && (
          <>
            <S.HideShowButton id="toggle" onClick={onToggle}>
              {!isToggled ? "Hide" : "Show"}
            </S.HideShowButton>
            <S.ClearButton onClick={handleClearHistory}>Clear</S.ClearButton>
          </>
        )}
      </U.Legend>
      {!isToggled && latestHistoryTasks.length > 0 && (
        <S.UlHistory>
          {latestHistoryTasks.map((task, index) => (
            <S.LiHistoryTask key={index}>
              <S.HistoryTask>
                {task.text}
                <S.ReUseButton onClick={(e) => handleReUseButton(index)}>
                  Re-Use
                </S.ReUseButton>
              </S.HistoryTask>
            </S.LiHistoryTask>
          ))}
        </S.UlHistory>
      )}
    </S.TaskHistoryFieldset>
  );
};

