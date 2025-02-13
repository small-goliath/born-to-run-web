import { MarathonItem } from '@/service/marathon';
import { groupDataByMonth } from '../dataFormat';

it('데이터가 없다면 undefined를 반환한다.', () => {
  const result = groupDataByMonth([]);
  expect(result).toBeUndefined();
});

it('데이터를 월별 데이터로 그릅화 하여 결과를 노출한다.', async () => {
  const mockData: MarathonItem[] = [
    {
      marathonId: 1,
      title: 'Marathon 1',
      schedule: '2023-07-10',
      venue: 'Venue 1',
      course: 'Course 1',
      isBookmarking: true,
    },
    {
      marathonId: 2,
      title: 'Marathon 2',
      schedule: '2023-07-20',
      venue: 'Venue 2',
      course: 'Course 2',
      isBookmarking: false,
    },
    {
      marathonId: 3,
      title: 'Marathon 3',
      schedule: '2023-08-15',
      venue: 'Venue 3',
      course: 'Course 3',
      isBookmarking: true,
    },
  ];
  const expectedResult = {
    7: [
      {
        marathonId: 1,
        title: 'Marathon 1',
        schedule: '2023-07-10',
        venue: 'Venue 1',
        course: 'Course 1',
        isBookmarking: true,
      },
      {
        marathonId: 2,
        title: 'Marathon 2',
        schedule: '2023-07-20',
        venue: 'Venue 2',
        course: 'Course 2',
        isBookmarking: false,
      },
    ],
    8: [
      {
        marathonId: 3,
        title: 'Marathon 3',
        schedule: '2023-08-15',
        venue: 'Venue 3',
        course: 'Course 3',
        isBookmarking: true,
      },
    ],
  };

  const result = groupDataByMonth(mockData);

  expect(result).toEqual(expectedResult);
});
