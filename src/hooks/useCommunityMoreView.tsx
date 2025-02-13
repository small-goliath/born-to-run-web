import { useToastStore } from '@/store/toastStore';
import { copyToClipboard } from '@/utils/textCopy';

interface CommunityMoreSettingArgs {
  onEdit: () => void;
  onReport?: () => void;
  onDeleteModal?: () => void;
  copyText?: string;
}

function useCommunityMoreView({ onEdit, copyText, onDeleteModal, onReport }: CommunityMoreSettingArgs) {
  const { addToast } = useToastStore();
  const handlePopUpItem = async (key?: string) => {
    switch (key) {
      case 'copy':
        if (copyText) {
          const isSuccess = await copyToClipboard(copyText);
          const toastMessage = isSuccess ? '텍스트를 복사했어요.' : '텍스트를 실패했어요.';
          addToast({
            type: isSuccess ? 'base' : 'error',
            message: toastMessage,
          });
        }
        break;
      case 'edit':
        onEdit();
        break;
      case 'report':
        onReport && onReport();
        break;
      case 'delete':
        onDeleteModal && onDeleteModal();
        break;
      default:
        break;
    }
  };

  return { handlePopUpItem };
}

export { useCommunityMoreView };
