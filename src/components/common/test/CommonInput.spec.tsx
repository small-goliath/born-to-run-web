import { FormProvider, useForm } from 'react-hook-form';
import CommonInput from '../CommonInput';
import render from '@/utils/test/render';
import { ChangeEvent } from 'react';
import { screen } from '@testing-library/dom';

type Props = {
  placeholder?: string;
  hasInputError?: boolean;
  isRequire?: boolean;
  isSelectorInput?: boolean;
  isSelectorInputComplete?: boolean;
  height?: string;
  minLength?: {
    value: number;
    message: string;
  };
  onClick?: (event?: React.MouseEvent) => void;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};

const TestInputWrapper = (props: Props) => {
  const method = useForm();
  return (
    <FormProvider {...method}>
      <div>
        <CommonInput {...props} inputName="test-input" placeholder="test-placeholder" />
      </div>
    </FormProvider>
  );
};

it('placeholder가 잘 노출된다.', async () => {
  await render(<TestInputWrapper />);
  expect(screen.getByPlaceholderText('test-placeholder'));
});

it('값을 입력하면 value가 노출된다.', async () => {
  const { user } = await render(<TestInputWrapper />);
  const input = screen.getByPlaceholderText('test-placeholder');
  await user.type(input, 'test-value');
  expect(input).toHaveValue('test-value');
});

it('값을 입력하면 onChange 호출된다.', async () => {
  const onChangeFn = jest.fn();
  const { user } = await render(<TestInputWrapper onChange={onChangeFn} />);
  const input = screen.getByPlaceholderText('test-placeholder');
  await user.type(input, 'test-value');
  expect(onChangeFn).toHaveBeenCalled();
});

it('onClick 함수가 설정된 경우 input을 클릭하면 onClick 호출된다.', async () => {
  const onClickFn = jest.fn();
  const { user } = await render(<TestInputWrapper onClick={onClickFn} />);
  const input = screen.getByPlaceholderText('test-placeholder');
  await user.click(input);
  expect(onClickFn).toHaveBeenCalled();
});

it('height을 커스텀하게 설정할 수 있다.', async () => {
  await render(<TestInputWrapper height="h-14" />);
  const input = screen.getByPlaceholderText('test-placeholder');
  expect(input).toHaveClass('h-14');
});

it('isSelectorInput이 설정된다면 input은 readOnly 상태가 된다.', async () => {
  await render(<TestInputWrapper isSelectorInput />);
  const input = screen.getByPlaceholderText('test-placeholder');
  expect(input).toHaveAttribute('readonly');
});

it('isSelectorInput이 설정되면 chevron-down-icon 아이콘이 노출된다.', async () => {
  await render(<TestInputWrapper isSelectorInput />);
  expect(screen.getByLabelText('chevron-down-icon')).toBeInTheDocument();
});

it('input에 값을 입력중일 때 input-reset-icon이 노출되며, 아이콘을 클릭하면 value가 비어있게 된다.', async () => {
  const onChangeFn = jest.fn();
  const { user } = await render(
    <TestInputWrapper isSelectorInputComplete={false} placeholder="test-placeholder" onChange={onChangeFn} />
  );
  const input = screen.getByPlaceholderText('test-placeholder');
  await user.type(input, 'test-value');

  const resetIcon = await screen.findByLabelText('input-reset-icon');
  expect(resetIcon).toBeInTheDocument();

  await user.click(resetIcon);
  expect(input).toHaveValue('');
});

it('input에 값을 입력중일 때 input-reset-icon이 노출되지만 input 외부를 클릭하게 되면 input-reset-icon이 사라진다.', async () => {
  const onChangeFn = jest.fn();
  const { user } = await render(<TestInputWrapper placeholder="test-placeholder" onChange={onChangeFn} />);
  const input = screen.getByPlaceholderText('test-placeholder');
  await user.type(input, 'test-value');

  const resetIcon = await screen.findByLabelText('input-reset-icon');
  expect(resetIcon).toBeInTheDocument();

  await user.click(document.body);
  expect(resetIcon).not.toBeInTheDocument();
});

it('input 에러가 발생하면 border색이 빨강색으로 변경된다. (className을 border-system-r-R400 갖는다.)', async () => {
  await render(<TestInputWrapper placeholder="test-placeholder" hasInputError />);
  const input = screen.getByPlaceholderText('test-placeholder');
  expect(input).toHaveClass('border-system-r-R400');
});
