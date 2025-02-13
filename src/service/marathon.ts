import { api } from './httpClient';

type MarathonListArgs = {
  locations?: string[];
  courses?: string[];
};

type MarathonListResponse = { marathons: MarathonItem[] };

const getMarathonList = async ({ locations, courses }: MarathonListArgs): Promise<MarathonListResponse> => {
  const params = new URLSearchParams();
  if (locations) {
    locations.forEach((location) => params.append('locations', location));
  }
  if (courses) {
    courses.forEach((course) => params.append('courses', course));
  }

  const result = await (
    await api.get(`/marathons`, {
      params,
    })
  ).data;

  return result;
};

const getMarathonDetail = async (marathonId: number): Promise<MarathonDetail> => {
  const result = await (await api(`/marathons/${marathonId}`)).data;
  return result;
};

const marathonBookmark = async (marathonId: number): Promise<{ marathonId: number }> => {
  const result = await (await api.post(`/marathons/bookmark/${marathonId}`, {})).data;
  return result;
};

const deleteMarathonBookmark = async (marathonId: number): Promise<{ marathonId: number }> => {
  const result = await (await api.delete(`/marathons/bookmark/${marathonId}`)).data;
  return result;
};

type MarathonItem = {
  marathonId: number;
  title: string;
  schedule: string;
  venue: string;
  course: string;
  isBookmarking: boolean;
};

type MarathonDetail = {
  marathonId: number;
  title: string;
  owner: string;
  email: string;
  schedule: string;
  contact: string;
  course: string;
  location: string;
  venue: string;
  host: string;
  duration: string;
  homepage: string;
  venueDetail: string;
  remark: string;
  registeredAt: Date;
  isDeleted: boolean;
  isBookmarking: boolean;
};

export { getMarathonList, getMarathonDetail, marathonBookmark, deleteMarathonBookmark };
export type { MarathonItem, MarathonListArgs, MarathonDetail, MarathonListResponse };
