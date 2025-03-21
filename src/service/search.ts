import { api } from './httpClient';

export type SearchKeywordAll = {
  searchKeywords: string[];
};

export const searchKeywordAll = async () => {
  const result = await (await api.get<Promise<SearchKeywordAll>>('/recent-search-keywords')).data;
  return result;
};

export const searchKeywordPost = async (keyword: string) => {
  const result = await (await api.post<Promise<void>>(`/recent-search-keywords/${keyword}`, {})).data;
  return result;
};

export const searchKeywordDeleteAll = async () => {
  const result = await (await api.delete<Promise<void>>('/recent-search-keywords')).data;
  return result;
};

export const searchKeywordDelete = async (keyword: string) => {
  const result = await (await api.delete<Promise<void>>(`/recent-search-keywords/${keyword}`)).data;
  return result;
};
