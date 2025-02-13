import { api } from './httpClient';

export const uploadFile = async ({ file, type }: UploadFileArg) => {
  if (!type) return;
  const result = await (
    await api.post<Promise<FileUpload>>(`/object-storage/${type}`, file, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  ).data;
  return result;
};

export const deleteFile = async ({ fileId, type }: DeleteFileArgs) => {
  if (!type || !fileId) return;
  const result = await (await api.delete<Promise<void>>(`/object-storage/${type}/${fileId}`, {})).data;
  return result;
};

export type UploadFile = {
  imageId: number;
  imageUri: string;
};

export type FileUpload = {
  fileId: number;
  fileUri: string;
};

export type UploadFileArg = {
  file: FormData;
  type: 'FEED' | 'PROFILE';
};

export type DeleteFileArgs = {
  fileId: number;
  type: 'FEED' | 'PROFILE';
};
