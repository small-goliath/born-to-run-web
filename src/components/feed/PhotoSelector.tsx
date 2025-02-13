'use client';

import Image from 'next/image';
import { useCallback, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import useUser from '@/hooks/useUser';
import { useModal } from '@/hooks/useModal';

import ErrorMessage from '@/components/common/ErrorMessage';
import ErrorModal from '@/components/modal/ErrorModal';
import { cls } from '@/utils/cls';
import XmarkIcon from '../icon/commonIcon/xmarkIcon.svg';
import ActivePhotoIcon from '../icon/commonIcon/activePhotoIcon.svg';
import PhotoIcon from '../icon/commonIcon/photoIcon.svg';
import { UploadFile, deleteFile, uploadFile } from '@/service/file';
import { queryKeys } from '@/constants';

const LIMIT_FILE_SIZE = 10;

export type UploadFileState = {
  loading: boolean;
  images: UploadFile[];
  isError: boolean;
};

type Props = {
  onUploadFileState: (state: UploadFileState) => void;
  initialFiles: UploadFile[];
  isEditMode?: boolean;
};

export default function PhotoSelector({ onUploadFileState, initialFiles, isEditMode }: Props) {
  const { isLoggedIn, isUserError } = useUser();
  const modal = useModal();
  const [uploadFileError, setUploadFileError] = useState<string | null>(null);

  const {
    isPending: fileUploadLoading,
    mutate: uploadFileMutation,
    isError: isUploadFileError,
  } = useMutation({
    mutationKey: [queryKeys.FILE.UPLOAD],
    mutationFn: (file: FormData) => uploadFile({ file, type: 'FEED' }),
    onSuccess: (data) => {
      if (!data) return;
      const newFile = {
        imageId: data.fileId,
        imageUri: data.fileUri,
      };
      onUploadFileState({
        loading: false,
        images: [...initialFiles, newFile],
        isError: false,
      });
    },
    onError: () => {
      modal.show();
      onUploadFileState({
        loading: false,
        images: initialFiles,
        isError: true,
      });
    },
  });

  const {
    mutate: deleteFileMutate,
    isError: isDeleteFileError,
    isPending: isDeleteFileLoading,
  } = useMutation({
    mutationKey: [queryKeys.FILE.DELETE],
    mutationFn: (imageId: number) => deleteFile({ fileId: imageId, type: 'FEED' }),
    onSuccess: (data, imageId) => {
      const newFile = initialFiles?.filter((image) => image.imageId !== imageId);
      onUploadFileState({
        loading: false,
        images: newFile || [],
        isError: false,
      });
    },
    onError: () => {
      onUploadFileState({
        loading: false,
        images: initialFiles || [],
        isError: true,
      });
    },
  });

  const handleFileUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isLoggedIn || isUserError) {
        modal.show();
      }
      if (initialFiles.length >= 5 || fileUploadLoading) {
        return;
      }
      onUploadFileState({ images: initialFiles, isError: false, loading: true });
      const files = e.target.files;
      if (files && files.length > 0) {
        const file = files[0];
        if (file.size > LIMIT_FILE_SIZE * 1024 * 1024) {
          setUploadFileError('업로드 불가능한 파일이 있어요. 확장자와 용량을 확인해주세요.');
          return;
        }
        setUploadFileError(null);
        const formData = new FormData();
        formData.append('file', file);
        uploadFileMutation(formData);
      }
    },
    [fileUploadLoading, initialFiles, isLoggedIn, isUserError, modal, onUploadFileState, uploadFileMutation]
  );

  const removeFile = useCallback(
    (imageId: number) => {
      if (isDeleteFileLoading || isDeleteFileError || !imageId) return;
      deleteFileMutate(imageId);
    },
    [deleteFileMutate, isDeleteFileError, isDeleteFileLoading]
  );

  const isMaxFile = initialFiles?.length === 5;

  return (
    <>
      <div className="py-2 px-4 overflow-x-auto">
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2">
            <label
              className={cls(
                isMaxFile ? 'pointer-events-none' : 'cursor-pointer',
                'w-16 h-16 flex flex-col justify-center items-center rounded-md bg-secondary-N30'
              )}
            >
              <input onChange={handleFileUpload} type="file" className="hidden" accept=".jpg,.jpeg,.png" />
              {isMaxFile ? <ActivePhotoIcon /> : <PhotoIcon />}
              <span
                className={cls(
                  isMaxFile ? 'text-system-r-R400' : 'text-secondary-N200',
                  'text-body-sm font-regular leading-body-sm'
                )}
              >
                {initialFiles?.length}/5
              </span>
            </label>
            {initialFiles?.length === 0 && !fileUploadLoading && (
              <span className="text-label-sm font-bold tracking-label-sm text-secondary-N200">이미지 추가</span>
            )}
          </div>

          <ul className="flex items-center space-x-2 pr-4">
            {initialFiles?.length !== 0 &&
              initialFiles?.map((image) => (
                <li key={image.imageId} className="w-16 h-16 bg-transparent relative">
                  <Image
                    src={image.imageUri}
                    fill
                    alt="file"
                    className="rounded-md object-cover"
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mMsqgcAAWkA844c0PgAAAAASUVORK5CYII="
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <button
                    onClick={() => removeFile(image.imageId)}
                    type="button"
                    className="absolute w-5 h-5 flex justify-center items-center rounded-lg bg-black -top-[0.3rem] -right-[0.3rem]"
                  >
                    <XmarkIcon />
                  </button>
                </li>
              ))}
            {fileUploadLoading && (
              <div className="bg-secondary-N30 w-16 h-16 rounded-md flex justify-center items-center">
                <span className="text-xs font-bold">Loading...</span>
              </div>
            )}
          </ul>
        </div>
      </div>
      {uploadFileError && <ErrorMessage text={uploadFileError} />}
      {isUploadFileError && <ErrorModal isActive={modal.isVisible} closeModal={modal.hide} />}
    </>
  );
}
