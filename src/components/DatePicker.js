import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { WEEK_DAYS, CALENDAR_MONTHS, DAY_MILLI_SECONDS, } from "../helpers/utils";
import Button from "./Button";
import Cell from "./Cell";

const today = new Date();

const DatePicker = () => {
  const {isDark, toggleTheme} = useTheme();
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const numOfDaysInMonth = new Date(currentYear, currentMonth + 1, 0);
  const oudatedDays = currentMonth < today.getMonth() || currentYear < today.getFullYear()

  const currentMonthDays = () => {
    return Array.from({length: numOfDaysInMonth.getDate()}).reduce((arr, curr, index) => {
      arr.push(index + 1)
      return arr;
    }, []);
  }

  const daysBeforeFirstDayOfMonth = () => {
    const dates = [];
  
    const endDate = new Date(currentYear, currentMonth, 1)
    let startDate = endDate - (6 - (7 - endDate.getDay())) * DAY_MILLI_SECONDS
  
    while(new Date(endDate) > new Date(startDate)) {
      const d = new Date(startDate);
      dates.push(d.getDate())
      startDate = startDate + DAY_MILLI_SECONDS
    }

    return dates;
  }

  const fullMonthDays = [
    ...daysBeforeFirstDayOfMonth(),
    ...currentMonthDays(numOfDaysInMonth.getDate() + 1)
  ]

  const handlePrevMonth = () => {
    if(currentMonth < 1) {
      setCurrentYear((currentYear) => currentYear - 1);
      setCurrentMonth(12);
    }
    setCurrentMonth((currentMonth) => currentMonth - 1);
  }

  const handleNextMonth = () => {
    if(currentMonth > 10) {
      setCurrentYear((currentYear) => currentYear + 1);
      setCurrentMonth(0);
    } else {
      setCurrentMonth((currentMonth) => currentMonth + 1);
    }
  }

  const handleNextYear = () => {
    setCurrentYear((currentYear) => currentYear + 1);
  }

  const handlePrevYear = () => {
    setCurrentYear((currentYear) => currentYear - 1);
  }

  return (
    <>
      
      <div style={{width: '300px', backgroundColor: '#fff', padding: '15px', borderRadius: '10px'}}>
        <div style={{marginBottom: '5px'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '20px'}}>
            <div style={{display: 'flex'}}>
              <Button onHandle={handlePrevYear}>{`<<`}</Button>
              <Button onHandle={handlePrevMonth}>{`<`}</Button>
              <div style={{padding: '10px'}}>{CALENDAR_MONTHS[currentMonth]} - {currentYear} </div>
              <Button onHandle={handleNextMonth}>{`>`}</Button>
              <Button onHandle={handleNextYear}>{`>>`}</Button>
            </div>
            <Button onHandle={toggleTheme} styles={{width: 35}}>{isDark ? 'Dark' : 'Light'}</Button>
          </div>

          <div style={{display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
              {WEEK_DAYS.map(day => (
                <div key={day} style={{textAlign: 'center'}}>
                  {day}
                </div>
              ))}
          </div>
        </div>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', border: '1px solid black' }}>
          {fullMonthDays.map((day, idx) => (
            <div key={`${day}_${idx}`} style={{padding: '5px', border: '1px solid black', display: 'flex', justifyContent:'center', alignItems: 'center'}}>
              <Cell 
                day={day}
                month={currentMonth} 
                year={currentYear} 
                outdated={(fullMonthDays.indexOf(today.getDate()) > idx && today.getMonth() === currentMonth && today.getFullYear() === currentYear) || oudatedDays}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default DatePicker;
