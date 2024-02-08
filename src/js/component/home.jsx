import React, { useState, useEffect } from "react";

const Card = () => {
  const [timeCount, setTimeCount] = useState({
    seconds: 0,
    minutes: 0,
    hours: 0,
    days: 0,
    weeks: 0,
    months: 0,
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      const updatedTimeCount = { ...timeCount };
      let carryOver = 1;

      const deltaNames = [
        "months",
        "weeks",
        "days",
        "hours",
        "minutes",
        "seconds",
      ];

      for (
        let i = deltaNames.length - 1;
        i >= 0;
        i--
      ) {
        const delta = deltaNames[i];
        const currentValue =
          updatedTimeCount[delta] || 0;
        const newValue =
          (currentValue + carryOver) % 60; // Adjust for weeks and months as needed
        carryOver = Math.floor(
          (currentValue + carryOver) / 60
        );
        updatedTimeCount[delta] = newValue;
      }

      setTimeCount(updatedTimeCount);
    }, 1000); // Update every second

    return () => clearInterval(intervalId);
  }, [timeCount]);

  return (
    <div className='flexCenter text-white gap-3'>
      <div className='flexCenter bg-slategray-600 p-4 rounded border-start border-end fs-1 fw-bold'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='48'
          height='48'
          fill='currentColor'
          class='bi bi-clock'
          viewBox='0 0 16 16'
        >
          <path d='M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z' />
          <path d='M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0' />
        </svg>
      </div>
      {Object.entries(timeCount)
        .reverse()
        .map(([delta, value]) => (
          <div
            key={delta}
            className='flexCenter bg-slategray-600 p-4 rounded border-start border-end fs-1 fw-bold'
          >
            {value}
          </div>
        ))}
    </div>
  );
};

export default Card;
