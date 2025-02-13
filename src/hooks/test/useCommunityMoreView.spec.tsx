import { act, renderHook } from '@testing-library/react';
import { useCommunityMoreView } from '../useCommunityMoreView';
import { mockUseToastStore } from '@/utils/test/mockZustandStore';
import { copyToClipboard } from '@/utils/textCopy';

jest.mock('../../utils/textCopy.tsx');

const addToastMock = jest.fn();
const onEditMock = jest.fn();
const onReportMock = jest.fn();
const onDeleteModalMock = jest.fn();

describe('handlePopUpItem 함수 인자 key로 copy일 경우', () => {
  beforeEach(() => {
    mockUseToastStore({
      addToast: addToastMock,
    });
  });

  it('copyToClipboard가 성공되고 addToast가 base로 호출된다.', async () => {
    (copyToClipboard as jest.Mock).mockImplementation(() => Promise.resolve(true));

    const { result } = renderHook(() =>
      useCommunityMoreView({
        onEdit: onEditMock,
        copyText: 'test',
        onDeleteModal: onDeleteModalMock,
        onReport: onReportMock,
      })
    );
    await act(async () => {
      await result.current.handlePopUpItem('copy');
    });

    expect(copyToClipboard).toHaveBeenCalledWith('test');
    expect(addToastMock).toHaveBeenCalledWith({
      message: '텍스트를 복사했어요.',
      type: 'base',
    });
  });

  it('copyToClipboard가 실패하고 addToast가 error 호출된다.', async () => {
    (copyToClipboard as jest.Mock).mockImplementation(() => Promise.resolve(false));

    const { result } = renderHook(() =>
      useCommunityMoreView({
        onEdit: onEditMock,
        copyText: 'test',
        onDeleteModal: onDeleteModalMock,
        onReport: onReportMock,
      })
    );
    await act(async () => {
      await result.current.handlePopUpItem('copy');
    });

    expect(copyToClipboard).toHaveBeenCalledWith('test');
    expect(addToastMock).toHaveBeenCalledWith({
      message: '텍스트를 실패했어요.',
      type: 'error',
    });
  });
});

it('handlePopUpItem 함수 인자 key로 edit일 경우 onEdit()함수가 호출된다.', async () => {
  const { result } = renderHook(() =>
    useCommunityMoreView({
      onEdit: onEditMock,
      copyText: 'test',
      onDeleteModal: onDeleteModalMock,
      onReport: onReportMock,
    })
  );

  await act(async () => {
    await result.current.handlePopUpItem('edit');
  });

  expect(onEditMock).toHaveBeenCalledTimes(1);
});

it('handlePopUpItem 함수 인자 key로 report 경우 onReport()함수가 호출된다.', async () => {
  const { result } = renderHook(() =>
    useCommunityMoreView({
      onEdit: onEditMock,
      copyText: 'test',
      onDeleteModal: onDeleteModalMock,
      onReport: onReportMock,
    })
  );

  await act(async () => {
    await result.current.handlePopUpItem('report');
  });

  expect(onReportMock).toHaveBeenCalledTimes(1);
});

it('handlePopUpItem 함수 인자 key로 delete 경우 onDelete()함수가 호출된다.', async () => {
  const { result } = renderHook(() =>
    useCommunityMoreView({
      onEdit: onEditMock,
      copyText: 'test',
      onDeleteModal: onDeleteModalMock,
      onReport: onReportMock,
    })
  );

  await act(async () => {
    await result.current.handlePopUpItem('delete');
  });

  expect(onDeleteModalMock).toHaveBeenCalledTimes(1);
});
