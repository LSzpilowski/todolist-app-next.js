import React, { useRef, useEffect, useState } from "react";
import * as S from "./Counter.styles";

export const Counter = () => {
  const [time, setTime] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timerIdRef = useRef();

  useEffect(() => {
    timerIdRef.current = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);

    return () => clearInterval(timerIdRef.current);
  }, []);

  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;

  const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  return (
    <S.Timer>
      <S.Text
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {isHovered ? formattedTime : "TIMER"}
      </S.Text>
    </S.Timer>
  );
};
