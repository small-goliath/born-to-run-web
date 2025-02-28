import { api } from './httpClient';
import HttpError from './httpError';

export const communityAll = async ({ ...data }: CommunityAllArgs) => {
  const { category, myCrew, searchKeyword, lastFeedId, token } = data;

  const result = await (
    await api.get<Promise<CommunityAll>>('/feeds', {
      params: {
        category: category === 'ALL' ? '' : category,
        isMyCrew: myCrew,
        lastFeedId,
        size: 10,
        ...(searchKeyword && { searchKeyword }),
      },
      ...(token && {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    })
  ).data;
  return result;
};

export const communityDetail = async (feedId: number) => {
  const result = await (await api.get<Promise<CommunityDetail>>(`/feeds/${feedId}`)).data;
  return result;
};

export const communityLike = async (feedId: number) => {
  if (!feedId) throw new HttpError(400, '올바르지 않은 게시판입니다.');
  return await (
    await api.post<Promise<void>>(`/recommendations/FEED/${feedId}`)
  ).data;
};

export const communityDeleteLike = async (feedId: number) => {
  if (!feedId) throw new HttpError(400, '올바르지 않은 게시판입니다.');
  return await (
    await api.delete<Promise<void>>(`/recommendations/FEED/${feedId}`)
  ).data;
};

export type CommunityForm = {
  imageIds?: number[];
  contents: string;
  category: string;
  accessLevel: CrewPublic;
};

export const communityPost = async (data: CommunityForm) => {
  const result = await (await api.post('/feeds', data)).data;
  return result;
};

export const communityDelete = async (feedId: number) => {
  const result = await (await api.delete(`/feeds/${feedId}`)).data;
  return result;
};

export type CrewPublic = 'ALL' | 'IN_CREW';
export type CommunityUpdateArgs = {
  feedId: number;
} & Partial<CommunityForm>;

export const communityUpdate = async ({ feedId, ...rest }: CommunityUpdateArgs) => {
  const result = await (await api.put(`/feeds/${feedId}`, rest)).data;
  return result;
};

export type CommunityDetail = {
  id: number;
  contents: string;
  images: [
    {
      imageId: number;
      imageUri: string;
    }
  ];
  category: 'COMMUNITY' | 'MARKET';
  accessLevel: CrewPublic;
  viewQty: number;
  recommendationQty: number;
  commentQty: number;
  registeredAt: Date;
  writer: {
    userName: string;
    crewName: string;
    profileImageUri: string;
    isAdmin: boolean;
    isManager: boolean;
  };
  viewer: {
    hasMyRecommendation: boolean;
    hasMyComment: boolean;
  };
};

export type CommunityWriter = {
  userName: string;
  crewName: string;
  profileImageUri: string;
  isAdmin: boolean;
  isManager: boolean;
};

export type CommunityContent = {
  id: number;
  imageUris: string[];
  contents: string;
  viewQty: number;
  recommendationQty: number;
  commentQty: number;
  registeredAt: Date;
  accessLevel: CrewPublic;
  writer: CommunityWriter;
  viewer: {
    hasMyRecommendation: boolean;
    hasMyComment: boolean;
  };
};

export type CommunityAllArgs = {
  category: string;
  searchKeyword?: string | null;
  myCrew: boolean;
  lastFeedId?: number;
  size?: number;
  token?: string | null;
};

export type CommunityAll = {
  totalPages: number;
  totalElements: number;
  size: number;
  content: CommunityContent[];
  number: number;
  sort: {
    unsorted: boolean;
    sorted: boolean;
    empty: boolean;
  };
  pageable: {
    offset: number;
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    };
    paged: boolean;
    pageNumber: number;
    pageSize: number;
    unpaged: boolean;
  };
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
};
