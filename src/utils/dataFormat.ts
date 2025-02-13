import { MarathonItem } from '@/service/marathon';
import { parseMonthFromData } from './formatDate';

const groupDataByMonth = (data?: MarathonItem[]) => {
  if (!data || data.length <= 0) return;
  return data.reduce((acc: Record<number, MarathonItem[]>, item) => {
    const month = parseMonthFromData(item.schedule);
    if (!acc[month]) {
      acc[month] = [];
    }
    acc[month].push(item);
    return acc;
  }, {});
};

export { groupDataByMonth };
