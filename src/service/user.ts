import { api } from './httpClient';

export type User = {
  userId: number;
  userName: string;
  crewName: string;
  ageRange: string;
  birthday: string;
  gender: string;
  profileImageUri: string;
  isAdmin: boolean;
  isManager: boolean;
  yellowCardQty: number;
  isGenderPublic: boolean;
  isBirthdayPublic: boolean;
  isInstagramIdPublic: boolean;
  instagramUri: string;
};

export const myInfo = async () => {
  const result = await (await api.get<Promise<User>>('/users/my')).data;
  return result;
};

export type UserReportArgs = {
  targetUserId: number;
  reason: string;
  basis: string;
};

export const userReport = async ({ basis, targetUserId, reason }: UserReportArgs) => {
  const result = await (
    await api.post<Promise<void>>('/yellow-cards/yellow-card', {
      targetUserId,
      reason,
      basis,
    })
  ).data;
  return result;
};
