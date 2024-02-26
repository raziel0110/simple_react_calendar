import { useReducer } from "react";
import { useTheme } from "../context/ThemeContext";
import { WEEK_DAYS, CALENDAR_MONTHS, DAY_MILLI_SECONDS, } from "../helpers/utils";
import Button from "./Button";
import Cell from "./Cell";

const today = new Date();
const initialState = {
  currentMonth: today.getMonth(),
  currentYear: today.getFullYear(),
}

const reducer = (state, action) => {
  switch(action.type) {
    case "handleNextYear":
      return {...state, currentYear: state.currentYear + 1}
    case "handlePrevYear": 
      return {...state, currentYear: state.currentYear - 1}
    case "handlePrevMonth":
      if (state.currentMonth < 1) {
        return {currentYear: state.currentYear - 1, currentMonth: 11}
      } else {
        return {...state, currentMonth: state.currentMonth - 1}
      }
    case "handleNextMonth":
      if(state.currentMonth > 10) {
        return {currentYear: state.currentYear + 1, currentMonth: 0}
      } else {
        return {...state, currentMonth: state.currentMonth + 1}
      }
    default: 
      return state;
  }
} 

const DatePicker = () => {
  const {isDark, toggleTheme} = useTheme();
  const [{currentMonth, currentYear}, dispatch] = useReducer(reducer, initialState);

  const numOfDaysInMonth = new Date(currentYear, currentMonth + 1, 0);
  const oudatedDays = currentMonth < today.getMonth() || currentYear < today.getFullYear()

  const currentMonthDays = () => {
    return Array.from({length: numOfDaysInMonth.getDate()}).reduce((arr, _curr, index) => {
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
    dispatch({type: 'handlePrevMonth'})
  }

  const handleNextMonth = () => {
    dispatch({type: 'handleNextMonth'})
  }

  const handleNextYear = () => {
    dispatch({type: 'handleNextYear'})
  }

  const handlePrevYear = () => {
    dispatch({type: 'handlePrevYear'})
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
