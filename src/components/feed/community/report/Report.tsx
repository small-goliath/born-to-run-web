import { Suspense } from 'react';
import MessageBox from '../../../common/MessageBox';
import PageHeader from '../../../header/PageHeader';

import ReportCheckIcon from '../../../icon/commonIcon/reportCheckIcon.svg';
import ReportForm from './RepotForm';
import LoadingSpinner from '../../../common/LoadingSpinner';

export default function Report() {
  return (
    <div>
      <PageHeader>
        <button>
          <ReportCheckIcon />
        </button>
      </PageHeader>

      <div className="p-4 space-y-2">
        <h2 className="text-title-xl font-bold leading-title-xl">신고하기</h2>
        <p className="text-secondary-N200 text-body-lg font-regular leading-body-lg tracking-body-lg">
          이 게시물 혹은 계정을 신고하는 이유를 알려주세요.
        </p>
        <div>
          <MessageBox type="info" text="신고인의 정보 및 신고 내용은 안전하게 보호되며 외부에 제공되지 않습니다." />
        </div>
      </div>

      <Suspense fallback={<LoadingSpinner />}>
        <ReportForm />
      </Suspense>
    </div>
  );
}
