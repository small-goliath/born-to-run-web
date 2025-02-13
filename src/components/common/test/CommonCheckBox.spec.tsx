import render from '@/utils/test/render';
import CommonCheckBox from '../CommonCheckBox';
import { screen } from '@testing-library/dom';

it('체크박스 type이 lg라면 w-6 h-6 클래스네임 스타일로 노출된다.', async () => {
  await render(<CommonCheckBox type="lg" isChecked handleCheck={() => {}} />);
  expect(screen.getByLabelText('checkbox')).toHaveClass('w-6 h-6');
});

it('체크박스 type이 md라면 w-5 h-5 클래스네임 스타일로 노출된다.', async () => {
  await render(<CommonCheckBox type="md" isChecked handleCheck={() => {}} />);
  expect(screen.getByLabelText('checkbox')).toHaveClass('w-5 h-5');
});

it('체크박스 type이 sm라면 w-4 h-4 클래스네임  스타일로 노출된다.', async () => {
  await render(<CommonCheckBox type="sm" isChecked handleCheck={() => {}} />);
  expect(screen.getByLabelText('checkbox')).toHaveClass('w-4 h-4');
});

it('체크가 되면 체크 아이콘이 노출된다.', async () => {
  await render(<CommonCheckBox type="lg" isChecked handleCheck={() => {}} />);
  expect(screen.getByTestId('checkIcon')).toBeInTheDocument();
});

it('체크가 되면 체크 아이콘이 노출되지 않는다.', async () => {
  await render(<CommonCheckBox type="lg" isChecked={false} handleCheck={() => {}} />);
  expect(screen.queryByTestId('checkIcon')).not.toBeInTheDocument();
});

it('체크박스를 클릭하면 handleCheck 함수가 호출된다.', async () => {
  const handleCheckFn = jest.fn();
  const { user } = await render(<CommonCheckBox type="lg" isChecked={false} handleCheck={handleCheckFn} />);
  const checkbox = screen.getByLabelText('checkbox');
  await user.click(checkbox);
  expect(handleCheckFn).toHaveBeenCalledTimes(1);
});
