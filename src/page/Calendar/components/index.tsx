import { CaretLeft } from "@phosphor-icons/react";
import { CaretRight } from "phosphor-react";
import React, { useEffect, useState } from "react";
import InputMask from "react-input-mask";
import Events from "./events";

interface dayObj {
  day: number;
  month: number;
  isCurrentMonth: boolean;
  isToday: boolean;
}

function PageCalendar() {
  const [date, setDate] = useState(new Date());
  const [today, setToday] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [desiredMonthYear, setDesiredMonthYear] = useState("");
  const [dayOfWeek, setDayOfWeek] = useState("");
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    // Atualize a data atual no estado "today" quando o componente for montado
    setToday(new Date());
    setDayOfWeek(
      new Date()
        .toLocaleDateString("pt-br", { weekday: "short" })
        .replace(".", "")
    );
    setFormattedDate(
      new Date().toLocaleDateString("pt-br", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    );
  }, []);

  const daysOfWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  const generateDaysInMonth = () => {
    const days = [];
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
      days.push({
        day: i,
        month: date.getMonth() - 1,
        isCurrentMonth: false,
        isToday: false,
      });
    }

    // Preencha os dias do mês atual
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const currentDate = new Date(date.getFullYear(), date.getMonth(), i);
      const isToday = currentDate.toDateString() === today.toDateString(); // Verifica se o dia é o dia atual
      days.push({
        day: i,
        month: date.getMonth(),
        isCurrentMonth: true,
        isToday,
      });
    }

    // Preencha os primeiros dias do próximo mês
    const daysToAddAfter = 7 - (days.length % 7); // Garante uma semana completa
    for (let i = 1; i <= daysToAddAfter; i++) {
      days.push({
        day: i,
        month: date.getMonth() + 1,
        isCurrentMonth: false,
        isToday: false,
      });
    }

    return days;
  };

  const handlePrevMonth = () => {
    const prevMonth = new Date(date);
    prevMonth.setMonth(date.getMonth() - 1);
    setDate(prevMonth);
    setSelectedDate(new Date());
  };

  const handleNextMonth = () => {
    const nextMonth = new Date(date);
    nextMonth.setMonth(date.getMonth() + 1);
    setDate(nextMonth);
    setSelectedDate(new Date());
  };

  const goToToday = () => {
    setDate(new Date()); // Atualiza a data para a data atual
    setSelectedDate(new Date());
  };

  const handleDayClick = (day: dayObj) => {
    const month = date.getMonth();

    if (day.isCurrentMonth && day.month === month) {
      setSelectedDate(new Date(date.getFullYear(), date.getMonth(), day.day));
    } else if (day.isCurrentMonth === false) {
      if (day.month === month + 1) {
        handleNextMonth();
      } else if (day.month === month - 1) {
        handlePrevMonth();
      }
    }
    if (day !== null) {
      const dayOfWeek = new Date(date.getFullYear(), date.getMonth(), day.day)
        .toLocaleDateString("pt-br", { weekday: "short" })
        .replace(".", "");

      const formattedDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        day.day
      ).toLocaleDateString("pt-br", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      setDayOfWeek(dayOfWeek);
      setFormattedDate(formattedDate);
    }
  };

  const handleGoToMonthYear = () => {
    const [desiredMonthStr, desiredYearStr] = desiredMonthYear.split("/");

    if (desiredMonthStr && desiredYearStr) {
      const desiredMonth = parseInt(desiredMonthStr, 10);
      const desiredYear = parseInt(desiredYearStr, 10);

      if (
        !isNaN(desiredMonth) &&
        !isNaN(desiredYear) &&
        desiredMonth >= 1 &&
        desiredMonth <= 12
      ) {
        const newDate = new Date(desiredYear, desiredMonth - 1, 1);
        setDate(newDate);
        setSelectedDate(new Date());
        setDesiredMonthYear("");
      } else {
        alert("Data inválida");
        setDesiredMonthYear("");
      }
    }
  };

  return (
    <div className="flex h-full gap-5">
      <section className="after:content-[''] after:bg-gray-3 after:h-[97%] after:w-[11px]  after:rounded-e-lg after:absolute after:top-[50%] after:right-[-11px] after:translate-y-[-50%] relative w-[60%] bg-white h-full rounded-lg ">
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
          <div className="grid grid-cols-7 text-center w-full h-[65%] ">
            {generateDaysInMonth().map((dayObj, index) => (
              <div
                key={index}
                className={`flex items-center justify-center m-auto font-medium cursor-pointer border-[1px] border-white w-full h-full  ${
                  dayObj.isCurrentMonth
                    ? "text-purple-2 hover:bg-purple-2 hover:text-white"
                    : "text-gray"
                } ${dayObj.isToday ? " text-3xl" : ""} ${
                  dayObj.isToday && !selectedDate
                    ? "text-white bg-purple-2 text-3xl"
                    : ""
                }${
                  dayObj.isCurrentMonth &&
                  selectedDate &&
                  dayObj.day === selectedDate.getDate()
                    ? "text-white bg-purple-2 text-3xl"
                    : ""
                }`}
                onClick={() => handleDayClick(dayObj)}
              >
                {dayObj.day !== null ? dayObj.day : ""}
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center m-3">
            <div className="go-to-month">
              <InputMask
                mask="99/9999"
                type="text"
                placeholder="MM/YYYY"
                value={desiredMonthYear}
                onChange={(e) => setDesiredMonthYear(e.target.value)}
                className="border-[1px] h-[30px] rounded-s-lg border-purple-2 px-[20px] text-purple-2 outline-none"
              />
              <button
                onClick={handleGoToMonthYear}
                className="border-[1px] rounded-e-lg border-purple-2 px-[10px] h-[30px] text-purple-2 cursor-pointer hover:bg-purple-2 hover:text-white "
              >
                Ir
              </button>
            </div>
            <button
              className="border-[1px] border-purple-2 px-1 py-2 text-purple-2 rounded-lg hover:bg-purple-2 hover:text-white"
              onClick={goToToday}
            >
              Hoje
            </button>
          </div>
        </div>
      </section>
      <Events diaSem={dayOfWeek} Date={formattedDate} />
    </div>
  );
}

export default PageCalendar;
