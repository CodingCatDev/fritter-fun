import React, { useEffect, useState } from "react";

// const targetTime = new Date("2035-01-01").getTime();

export const Countdown = ({targetTime}:{targetTime:number}) => {
  const [currentTime, setCurrentTime] = useState(Date.now());

  const timeBetween = targetTime - currentTime;
  const seconds = Math.floor((timeBetween / 1000) % 60);
  const minutes = Math.floor((timeBetween / 1000 / 60) % 60);
  const hours = Math.floor((timeBetween / (1000 * 60 * 60)) % 24);
  const days = Math.floor(timeBetween / (1000 * 60 * 60 * 24));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <p className="counter">
        <span>{days}d </span>
        <span>{hours}h </span>
        <span>{minutes}min </span>
        <span>{seconds}s</span>
      </p>
    </>
  );
};