interface Props {
  length?: number;
}

export default function RunningSkeleton({ length = 10 }: Props) {
  return (
    <div className="animate-pulse">
      <div className="flex items-center gap-2 py-1">
        <div className="w-[90px] h-8 bg-secondary-N40 rounded-lg" />
        <div className="w-[90px] h-8 bg-secondary-N40 rounded-lg" />
      </div>

      <div className="w-10 h-5 bg-secondary-N40 my-4 rounded-md" />

      <div className="w-full flex flex-col gap-4">
        {Array.from({ length }).map((_, index) => (
          <div key={index} className="w-full bg-secondary-N40 rounded-md h-[115px]" />
        ))}
      </div>
    </div>
  );
}
