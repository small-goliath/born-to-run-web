import ChipsTab from '@/components/feed/ChipsTab';
import render from '@/utils/test/render';
import { screen } from '@testing-library/dom';

it('title이 올바르게 렌더링된다.', async () => {
  await render(<ChipsTab title="test" />);
  expect(screen.getByText('test')).toBeInTheDocument();
});

it('isChecked가 true라면 올바른 클래스가 적용되며 check 아이콘이 노출된다.', async () => {
  await render(<ChipsTab title="test" isChecked />);
  expect(screen.getByRole('button')).toHaveClass('border-primary-G400');
  expect(screen.getByTestId('checkIcon')).toBeInTheDocument();
});

it('isActive가 true라면 올바른 클래스가 적용된다.', async () => {
  await render(<ChipsTab title="test" isActive />);
  expect(screen.getByRole('button')).toHaveClass('border-0 bg-black');
});

it('isActive가 true라면 closeIcon이 노출되며 클릭하면 onClose함수가 호출된다.', async () => {
  const onCloseFn = jest.fn();
  const { user } = await render(<ChipsTab title="test" isActive onClose={onCloseFn} />);
  expect(screen.getByTestId('closeIcon')).toBeInTheDocument();
  await user.click(screen.getByTestId('closeIcon'));
  expect(onCloseFn).toHaveBeenCalledTimes(1);
});

it('isPuls가 true이고 isActive, isChecked가 false라면 plus 아이콘이 노출된다.', async () => {
  await render(<ChipsTab title="plusIcon" isPlus />);
  expect(screen.getByTestId('plusIcon')).toBeInTheDocument();
});
