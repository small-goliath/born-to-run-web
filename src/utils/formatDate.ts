import dayjs from 'dayjs';
import 'dayjs/locale/ko';

dayjs.locale('ko');

const convertToStandardDateFormat = (dateString: string) => {
  if (!dateString) return;
  return dateString.replace('년', '-').replace('월', '-').replace('일', '');
};

// 게시판 날짜 처리
const formatPostRegisterTime = (date: Date) => {
  const registeredAt = dayjs(date);
  const now = dayjs();

  const diffSeconds = now.diff(registeredAt, 'second');
  const diffMinutes = now.diff(registeredAt, 'minute');
  const diffHours = now.diff(registeredAt, 'hour');
  const diffDays = now.diff(registeredAt, 'day');
  const diffMonths = now.diff(registeredAt, 'month');

  if (diffSeconds < 60) {
    return '방금';
  } else if (diffMinutes < 60) {
    return `${diffMinutes}분 전`;
  } else if (diffHours < 24) {
    return `${diffHours}시간 전`;
  } else if (diffDays === 1) {
    return '하루 전';
  } else if (diffDays < 30) {
    return `${diffDays}일 전`;
  } else if (diffMonths < 12) {
    return `${diffMonths}개월 전`;
  } else {
    return registeredAt.format('YY-MM-DD');
  }
};

const parseMonthFromData = (date: string) => {
  const datePart = date.split(' ')[0].replace('년', '-').replace('월', '-').replace('일', '');
  const formattedDate = dayjs(datePart);
  const month = formattedDate.month() + 1;
  return month;
};

const parseDayOfWeek = (dateString: string, splitPart: string = ' ') => {
  if (!dateString) return;
  const [datePart] = dateString.split(splitPart);
  const standardDate = convertToStandardDateFormat(datePart);
  const date = dayjs(standardDate, 'YYYY-MM-DD');
  if (!date.isValid()) return;
  return date.format('dddd');
};

const addSpaceToDateParts = (dateString: string, splitPart: string = ' ') => {
  if (!dateString || !splitPart) return;
  const [datePart] = dateString.split(splitPart);
  if (!datePart) return;

  const yearMatch = datePart.match(/\d{4}년/);
  const monthMatch = datePart.match(/\d{1,2}월/);
  const dayMatch = datePart.match(/\d{1,2}일/);

  if (!yearMatch || !monthMatch || !dayMatch) return;

  const year = yearMatch[0].replace('년', '');
  const month = monthMatch[0].replace('월', '');
  const day = dayMatch[0].replace('일', '');

  const formattedDate = `${year}년 ${month}월 ${day}일 `;

  return formattedDate;
};

const daysUntilCurrentDate = (dateString: string) => {
  const standardDate = convertToStandardDateFormat(dateString);
  const targetDate = dayjs(standardDate);
  const now = dayjs();

  const daysDifference = targetDate.diff(now, 'day');
  return daysDifference > 0 ? daysDifference : 0;
};

export { parseMonthFromData, formatPostRegisterTime, addSpaceToDateParts, parseDayOfWeek, daysUntilCurrentDate };

/**
 * [보류] 공휴일 처리
 
import { HolidayItem } from '@/service/publicHoliday';
type FilteredDate = {
  isHoliday: boolean;
  date: string;
  dateName?: string;
};

type FilterHolidayArg = {
  dates: (number | string)[];
  holidayItem?: HolidayItem[] | HolidayItem;
};

const filterHoliday = ({ dates, holidayItem }: FilterHolidayArg): FilteredDate[] => {
  if (holidayItem && !Array.isArray(holidayItem)) {
    const holiday = dayjs(holidayItem?.locdate.toString(), 'YYYYMMDD').date();
    return dates.map((date) => {
      const isHoliday = Number(date) === holiday;
      return {
        isHoliday,
        date: date.toString(),
        dateName: isHoliday ? holidayItem?.dateName : undefined,
      };
    });
  }

  if (!holidayItem || holidayItem.length === 0) {
    return dates.map((date) => ({ isHoliday: false, date: date.toString(), dateName: undefined }));
  }

  const holidays = holidayItem.map((holiday) => ({
    holiday: dayjs(holiday.locdate.toString(), 'YYYYMMDD').date(),
    dateName: holiday.dateName,
  }));

  return dates.map((date) => {
    const holiday = holidays.find((h) => h.holiday === Number(date));
    const isHoliday = Boolean(holiday);

    return { isHoliday, date: date.toString(), dateName: holiday ? holiday.dateName : undefined };
  });
};

 */
