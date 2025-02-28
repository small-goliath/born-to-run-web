import { api } from './httpClient';

export const commentAll = async (feedId: number) => {
  const result = await (await api.get<Promise<CommentAll>>(`/comments/${feedId}`)).data;
  return result;
};

type CommentPost = {
  feedId: number;
  id?: number;
  contents: string;
};

export const commentDetail = async (commentId: number | null) => {
  if (!commentId) return;
  const result = await (await api.get<Promise<CommentDetailContent>>(`/comments/detail/${commentId}`)).data;
  return result;
};

export const commentPost = async ({ feedId, id: commentId, contents }: CommentPost) => {
  const result = await (
    await api.post(`/comments/${feedId}`, { contents, ...(commentId && { parentCommentId: commentId }) })
  ).data;
  return result;
};

export type CommentUpdate = {
  id: number;
  contents: string;
};

export const commentUpdate = async ({ id: commentId, contents }: CommentUpdate) => {
  const result = await (await api.put(`/comments/${commentId}`, { contents })).data;
  return result;
};

export const commentDelete = async (commentId?: number) => {
  if (!commentId) return;
  const result = await (await api.delete(`/comments/${commentId}`)).data;
  return result;
};

export type CommentDetailContent = {
  id: number;
  writer: CommentWriter;
  contents: string;
  registeredAt: Date;
  reComments: ReComment[];
};

export type ReComment = {
  id: number;
  userId: number;
  contents: string;
  registeredAt: Date;
  writer: CommentWriter;
  isMyComment: boolean;
};

export type CommentWriter = {
  userId: number;
  userName: string;
  crewName: string;
  profileImageUri: string;
  isAdmin: boolean;
  isManager: boolean;
};

export type CommentContent = {
  id: number;
  parentId: number;
  writer: CommentWriter;
  contents: string;
  registeredAt: Date;
  isMyComment: boolean;
  isReComment: boolean;
};

export type CommentAll = {
  comments: Comment[];
};

export type Comment = {
  reCommentQty: number;
  id: number;
  parentId: number;
  writer: CommentWriter;
  contents: string;
  registeredAt: Date;
  isMyComment: true;
  isReComment: true;
};
