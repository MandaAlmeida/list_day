import { CaretLeft } from "@phosphor-icons/react";
import { CaretRight } from "phosphor-react";
import React, { useState } from "react";

interface days {
  day: number;
  isCurrentMonth: boolean;
}

function Meses() {
  const [date, setDate] = useState(new Date());

  const daysOfWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];

  const generateDaysInMonth = () => {
    const days: days[] = [];
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    // Preencha os últimos dias do mês anterior
    const lastMonthLastDay = new Date(date.getFullYear(), date.getMonth(), 0);
    const daysInLastMonth = lastMonthLastDay.getDate();
    const daysToAddBefore = firstDay.getDay();

    for (
      let i = daysInLastMonth - daysToAddBefore + 1;
      i <= daysInLastMonth;
      i++
    ) {
      days.push({ day: i, isCurrentMonth: false });
    }

    // Preencha os dias do mês atual
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push({ day: i, isCurrentMonth: true });
    }

    // Preencha os primeiros dias do próximo mês
    const daysToAddAfter = 7 - (days.length % 7); // Garante uma semana completa
    for (let i = 1; i <= daysToAddAfter; i++) {
      days.push({ day: i, isCurrentMonth: false });
    }

    return days;
  };

  const handlePrevMonth = () => {
    const prevMonth = new Date(date);
    prevMonth.setMonth(date.getMonth() - 1);
    setDate(prevMonth);
  };

  const handleNextMonth = () => {
    const nextMonth = new Date(date);
    nextMonth.setMonth(date.getMonth() + 1);
    setDate(nextMonth);
  };

  return (
    <div className="h-full px-[50px] flex flex-col">
      <div className="flex items-center  justify-between h-[15%]">
        <button aria-label="setaLeft" onClick={handlePrevMonth}>
          <CaretLeft size={32} color="#7b829a" weight="bold" />
        </button>
        <h2 className="text-xl font-medium capitalize text-gray-3 font-font-family">
          {date.toLocaleDateString("pt-br", { month: "long" })}{" "}
          {date.getFullYear()}
        </h2>
        <button aria-label="setaRight" onClick={handleNextMonth}>
          <CaretRight size={32} color="#7b829a" weight="bold" />
        </button>
      </div>
      <div className="h-[12%] flex items-center justify-between text-gray-3 font-medium">
        {daysOfWeek.map((day, index) => (
          <div key={index} className="w-[14.28%] text-center">
            {day}
          </div>
        ))}
      </div>
      <div className="flex justify-between w-full h-[65%] flex-wrap">
        {generateDaysInMonth().map((dayObj, index) => (
          <div
            key={index}
            className={`w-[14.28%] flex justify-center items-center font-medium cursor-pointer ${
              dayObj.isCurrentMonth ? "text-purple-2" : "text-gray"
            }`}
          >
            {dayObj.day}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Meses;
