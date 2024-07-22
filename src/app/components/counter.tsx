"use client"

import React, { useRef, useEffect, useState } from "react";

export const Counter: React.FC = () => {
  const [time, setTime] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const timerIdRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    timerIdRef.current = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);

    return () => {
      if (timerIdRef.current) {
        clearInterval(timerIdRef.current);
      }
    }
  }, []);

  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;

  const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  return (
    <div className="text-base md:text-xl font-bold w-1/3">
      <p className="pl-2 pt-2 w-1/5 cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {isHovered ? formattedTime : "TIMER"}
      </p>
    </div>
  );
};
