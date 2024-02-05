import React from "react";
import * as S from "./DonesList.styles";
import * as U from "../utils.styles";

export const DonesList = ({ dones, handleCheckbox }) => {
  return (
    <U.Fieldset>
      <U.Legend>
        <U.LegendText>
          What's Done {dones.length > 0 ? `(${dones.length})` : ""}
        </U.LegendText>
      </U.Legend>
      <S.DonesList>
        {dones.map((done, index) => (
          <S.LiDoneTasks key={index}>
            <S.DoneTask>
              {done.text}
              <S.DoneCheckbox
                checked={done.isChecked}
                onChange={(e) => handleCheckbox(index, e.target.checked)}
              />
            </S.DoneTask>
          </S.LiDoneTasks>
        ))}
      </S.DonesList>
    </U.Fieldset>
  );
};
