import render from '@/utils/test/render';
import CommonRadioButton from '../CommonRadioButton';
import { screen } from '@testing-library/dom';

it('체크박스 type이 lg라면 w-6 h-6 클래스네임 스타일로 노출된다.', async () => {
  await render(<CommonRadioButton type="lg" checked handleCheck={() => {}} />);
  expect(screen.getByLabelText('radiobutton')).toHaveClass('w-6 h-6');
});

it('체크박스 type이 md라면 w-5 h-5 클래스네임 스타일로 노출된다.', async () => {
  await render(<CommonRadioButton type="md" checked handleCheck={() => {}} />);
  expect(screen.getByLabelText('radiobutton')).toHaveClass('w-5 h-5');
});

it('체크박스 type이 sm라면 w-4 h-4 클래스네임  스타일로 노출된다.', async () => {
  await render(<CommonRadioButton type="sm" checked handleCheck={() => {}} />);
  expect(screen.getByLabelText('radiobutton')).toHaveClass('w-4 h-4');
});

it('체크가 되면 체크 아이콘이 노출된다.', async () => {
  await render(<CommonRadioButton type="lg" checked handleCheck={() => {}} />);
  expect(screen.getByTestId('radioIcon')).toBeInTheDocument();
});

it('체크가 되면 체크 아이콘이 노출되지 않는다.', async () => {
  await render(<CommonRadioButton type="lg" checked={false} handleCheck={() => {}} />);
  expect(screen.queryByTestId('radioIcon')).not.toBeInTheDocument();
});

it('체크박스를 클릭하면 handleCheck 함수가 호출된다.', async () => {
  const handleCheckFn = jest.fn();
  const { user } = await render(<CommonRadioButton type="lg" checked={false} handleCheck={handleCheckFn} />);
  const checkbox = screen.getByLabelText('radiobutton');
  await user.click(checkbox);
  expect(handleCheckFn).toHaveBeenCalledTimes(1);
});
