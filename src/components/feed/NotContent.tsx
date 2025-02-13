import NotContentIcon from '../icon/notContentIcon.svg';

export default function NotContent() {
  return (
    <div className="w-full flex flex-col justify-center items-center mt-20">
      <NotContentIcon />
      <div className="mt-[1.12rem] space-y-2 text-center">
        <h2 className="text-headLine-md font-bold leading-headLine-md">내용이 없어요</h2>
        <p className="text-body-lg leading-body-lg tracking-body-lg text-secondary-N200">
          첫 글을 작성해서 생각을 공유하는건 어떨까요?
        </p>
      </div>
    </div>
  );
}
