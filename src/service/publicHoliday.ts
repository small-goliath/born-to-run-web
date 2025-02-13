import axios, { AxiosError } from 'axios';
import HttpError from './httpError';

type HolidayArgs = { year: string; month: string };

export const holidayInfo = async ({ year, month }: HolidayArgs) => {
  try {
    const result = await (
      await axios<Promise<HolidayInfo>>(
        `http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getHoliDeInfo?solYear=${year}&solMonth=${month}&_type=json&ServiceKey=${process.env.NEXT_PUBLIC_HOLIDAY_KEY}`
      )
    ).data;
    return result;
  } catch (error) {
    if (error instanceof AxiosError) {
      const { response } = error;
      throw new HttpError(response?.status, response?.statusText);
    }
    throw new Error('네트워크 통신 에러 발생');
  }
};

type HolidayInfo = {
  response: {
    header: {
      resultCode: number;
      resultMsg: string;
    };
    body: {
      items: {
        item: HolidayItem[];
      };
      numOfRows: number;
      pageNo: number;
      totalCount: number;
    };
  };
};

export type HolidayItem = {
  dateKind: number;
  dateName: string;
  isHoliday: 'Y' | 'N';
  locdate: number;
  seq: number;
};
