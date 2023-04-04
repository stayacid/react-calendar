import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import weekday from 'dayjs/plugin/weekday';
import ru from 'dayjs/locale/ru';

dayjs.locale(ru);
dayjs.extend(weekday);
dayjs.extend(isoWeek);

export default dayjs;
