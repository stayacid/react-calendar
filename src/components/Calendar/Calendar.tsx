import './Calendar.css';
import dayjs from '@/plugins/dayjs';

interface ICalendarProps {
  date: Date;
}

const weekLength = 7;
const dayNames = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
const dayNamesFull = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
const monthNamesGenitive = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];

function Calendar(props: ICalendarProps) {
    const { date } = props;

    // NOTE: общие данные для календаря
    const currentDate = dayjs(date);
    const dayNumber = currentDate.date(); // getDate() возвращает день месяца от 1 до 31
    const day = currentDate.weekday(); // getDay() возвращает день недели от 0 до 6 (0 - понедельник)
    const month = currentDate.month(); // getMonth() возвращает месяц от 0 до 11
    const year = date.getFullYear();

    // NOTE: готовиим данные для шапки календаря
    const dayNameFull = dayNamesFull[day]; // Отобразит текущий день недели в шапке календаря
    const monthName = monthNames[month];  // Отобразит текущий месяц в шапке календаря
    const monthNameGenitive = monthNamesGenitive[month];

    // NOTE: готовим первую строку календаря
    const firstDayOfMonth = dayjs(`${year}-${month + 1}-01`).weekday(); // Узнаем, каким днем недели был 1-го числа текущего месяца (0 - понедельник)

    const pastMonthDates = []; // Начало недели из прошлого месяца, в датах
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
        const day = dayjs(`${year}-${month + 1}-01`).subtract(i + 1, 'day').format('D');
        pastMonthDates.push(day);
    }

    const currentMonthWeekStart = Array.from({length: weekLength - pastMonthDates.length}, (_, i) => i + 1); // Остаток недели из текущего месяца, в датах

    // NOTE: готовим основное тело календаря - строки кроме первой и, в некоторых случаях, последней
    const daysInMonth = dayjs(`${year}-${month + 1}`).daysInMonth();
    const monthDaysFromFullWeeks: string[] = [];
    const fullWeeks = [...Array(Math.floor((daysInMonth - currentMonthWeekStart.length) / weekLength)).keys()];

    for (let i = 0; i < fullWeeks.length; i++) {
        for (let j = 0; j < weekLength; j++) {
            const day = dayjs(`${year}-${month + 1}-01`).add(currentMonthWeekStart.length + i * weekLength + j, 'day').format('D');
            monthDaysFromFullWeeks.push(day);
        }
    }

    // NOTE: рисуем последную неделю месяца
    const currentMonthLastDates = []; // Остаток недели из текущего месяца, в датах
    const restDaysInCurrentMonth = daysInMonth - currentMonthWeekStart.length - monthDaysFromFullWeeks.length;
    if (restDaysInCurrentMonth) {
      for (let i = 0; i < restDaysInCurrentMonth; i++) {
        const day = dayjs(`${year}-${month + 1}-01`).add(currentMonthWeekStart.length + monthDaysFromFullWeeks.length + i, 'day').format('D');
        currentMonthLastDates.push(day);
      }
    }

    const nextMonthFirstDates = Array.from({length: weekLength - currentMonthLastDates.length}, (_, i) => i + 1); // Начало недели из следующего месяца, в датах

    // подсвечиваем текущий день
    const isItCurrentDay = (day: string) => Number(day) === dayNumber;

    return (
      <div className="ui-datepicker">
        <div className="ui-datepicker-material-header">
          <div className="ui-datepicker-material-day">{dayNameFull}</div>
          <div className="ui-datepicker-material-date">
            <div className="ui-datepicker-material-day-num">{dayNumber}</div>
            <div className="ui-datepicker-material-month">{monthNameGenitive}</div>
            <div className="ui-datepicker-material-year">{year}</div>
          </div>
        </div>
        <div className="ui-datepicker-header">
          <div className="ui-datepicker-title">
            <span className="ui-datepicker-month">{monthName}</span>&nbsp;<span className="ui-datepicker-year">{year}</span>
          </div>
        </div>

        <table className="ui-datepicker-calendar">
          <colgroup>
            <col></col>
            <col></col>
            <col></col>
            <col></col>
            <col></col>
            <col className="ui-datepicker-week-end"></col>
            <col className="ui-datepicker-week-end"></col>
          </colgroup>
          <thead>
            <tr>
              {
                dayNames.map((dayName, index) => {
                  return <th key={dayName} scope="col" title={dayNamesFull[index]}>{dayName}</th>
                })
              }
            </tr>
          </thead>
          <tbody>
            <tr>
            {pastMonthDates.map(
              (i) => <td key={i} className="ui-datepicker-other-month">{i}</td>
            )}
            {currentMonthWeekStart.map(
              (i) => <td key={i}>{i}</td>
            )}
            </tr>
            {
              fullWeeks.map((i) => {
                return (
                  <tr key={i}>
                    {monthDaysFromFullWeeks.slice(i * weekLength, i * weekLength + weekLength).map(
                      (j) => <td key={j} className={ isItCurrentDay(j) ? "ui-datepicker-today" : ''}>{j}</td>
                    )}
                  </tr>
                )
              })
            }
            {restDaysInCurrentMonth ? (
              <tr>
                {currentMonthLastDates.map(
                  (i) => <td key={i} className={ isItCurrentDay(i) ? "ui-datepicker-today" : ''}>{i}</td>
                )}
                {nextMonthFirstDates.map(
                  (i) => <td key={i} className="ui-datepicker-other-month">{i}</td>
                )}
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
  )
}

export default Calendar;
