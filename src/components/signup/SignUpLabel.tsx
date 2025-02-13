type Props = {
  label: string;
  isRequire?: boolean;
};

export default function SignUpLabel({ isRequire, label }: Props) {
  return (
    <div className="flex items-center space-x-1">
      <label className="text-body-md leading-body-md text-secondary-N200">{label}</label>
      {isRequire ? (
        <span>
          <svg xmlns="http://www.w3.org/2000/svg" width="6" height="6" viewBox="0 0 6 6" fill="none">
            <path
              d="M1.513 5.76231L2.856 4.14731L4.199 5.76231L4.947 5.21831L3.859 3.4503L5.712 2.68531L5.423 1.81831L3.485 2.2773L3.315 0.237305H2.397L2.227 2.29431L0.289 1.81831L0 2.68531L1.836 3.4503L0.765 5.21831L1.513 5.76231Z"
              fill="#DE350B"
            />
          </svg>
        </span>
      ) : (
        <span className="text-body-sm leading-body-sm text-secondary-N60">(선택)</span>
      )}
    </div>
  );
}
