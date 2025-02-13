/* 'use client';

import dayjs from 'dayjs';
import { useCheckLoggedIn } from '@/hooks/useCheckLoggedIn';
import { useCallback, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/queryKey';
import { holidayInfo } from '@/service/publicHoliday';
import { filterHoliday } from '@/utils/formatDate';
import { cls } from '@/utils/cls';

export default function Calendar() {
  useCheckLoggedIn();
  const [currentMonth, setCurrentMonth] = useState(dayjs().startOf('month'));
  const { data, error, isLoading } = useQuery(
    [QUERY_KEYS.PUBLIC.HOLIDAY, currentMonth.month()],
    () =>
      holidayInfo({
        month: (currentMonth.month() + 1).toString().padStart(2, '0'),
        year: currentMonth.year().toString(),
      }),
    {
      staleTime: 1000 * 60 * 60,
    }
  );

  const firstDayOfMonth = currentMonth.day();
  const daysInMonth = currentMonth.daysInMonth();

  const currentDate = currentMonth.format('YYYY년 MM월');
  const weekDays = ['일', '월', '화', '수', '목', '금', '토'];
  const dates = Array.from({ length: daysInMonth + firstDayOfMonth }, (_, i) =>
    i < firstDayOfMonth ? '' : currentMonth.add(i - firstDayOfMonth, 'day').date()
  );

  const filterDates = filterHoliday({
    dates,
    holidayItem: data?.response.body.items.item,
  });

  const incrementMonth = useCallback(() => {
    setCurrentMonth((current) => current.add(1, 'month'));
  }, []);

  const decrementMonth = useCallback(() => {
    setCurrentMonth((current) => current.subtract(1, 'month'));
  }, []);

  const incrementYear = useCallback(() => {
    setCurrentMonth((current) => current.add(1, 'year'));
  }, []);

  const decrementYear = useCallback(() => {
    setCurrentMonth((current) => current.subtract(1, 'year'));
  }, []);

  return (
    <div className="p-20 text-gray-50">
      Calendar
      <section className="mt-20 p-2">
        <div className="flex items-center justify-between">
          <h1>{currentDate}</h1>
          <div className="space-x-4">
            <span>월</span>
            <button onClick={incrementMonth} className="border-2 py-1 px-2 rounded-md">
              +
            </button>
            <button onClick={decrementMonth} className="border-2 py-1 px-2 rounded-md">
              -
            </button>
          </div>

          <div className="space-x-4">
            <span>년</span>
            <button onClick={incrementYear} className="border-2 py-1 px-2 rounded-md">
              +
            </button>
            <button onClick={decrementYear} className="border-2 py-1 px-2 rounded-md">
              -
            </button>
          </div>
        </div>

        <div className="mt-10">
          <header className="grid grid-cols-7">
            {weekDays.map((day) => (
              <div className="flex justify-center items-center" key={day}>
                {day}
              </div>
            ))}
          </header>
          {isLoading ? (
            <span>Loading...</span>
          ) : (
            <div className="grid grid-cols-7 mt-2">
              {filterDates.map((item, i) => (
                <div
                  className={cls(
                    'border-[1px] py-4 flex justify-center items-center',
                    item.isHoliday ? 'text-primary-G400' : ''
                  )}
                  key={i}
                >
                  {item.date}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
 */
