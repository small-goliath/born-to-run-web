import render from '@/utils/test/render';
import SolidButton from '../commonButton/SolidButton';
import { screen } from '@testing-library/dom';

it('title을 노출한다.', async () => {
  await render(<SolidButton height="h-[2.5rem]" title="test-title" />);
  expect(screen.getByText('test-title'));
});

it('isLoading일 경우 로딩 스피너를 보여준다.', async () => {
  await render(<SolidButton height="h-[2.5rem]" title="test-title" isLoading />);
  const loadingSpinner = screen.getByTestId('loading-spinner').querySelector('svg');
  expect(loadingSpinner).toBeInTheDocument();
});

it('클릭하면 onClick함수를 호출한다.', async () => {
  const onClickFn = jest.fn();
  const { user } = await render(<SolidButton height="h-[2.5rem]" title="test-title" onClick={onClickFn} />);
  const button = screen.getByRole('button');
  await user.click(button);
  expect(onClickFn).toHaveBeenCalledTimes(1);
});

it('disabled일 경우 비활성화되며 onClick함수를 호출하면 안된다.', async () => {
  const onClickFn = jest.fn();
  const { user } = await render(<SolidButton height="h-[2.5rem]" title="test-title" onClick={onClickFn} disabled />);
  const button = screen.getByRole('button');
  await user.click(button);
  expect(onClickFn).not.toHaveBeenCalled();
  expect(button).toBeDisabled();
});

it('height 2.5rem 속성에 따라 올바른 클래스가 적용된다', async () => {
  await render(<SolidButton height="h-[2.5rem]" title="test-title" />);
  expect(screen.getByRole('button')).toHaveClass('h-[2.5rem]');
});

it('height 3.5rem 속성에 따라 올바른 클래스가 적용된다', async () => {
  await render(<SolidButton height="h-[3.5rem]" title="test-title" />);
  expect(screen.getByRole('button')).toHaveClass('h-[3.5rem]');
});

it('isDanger라면 올바른 클래스가 적용된다.', async () => {
  await render(<SolidButton height="h-[3.5rem]" title="test-title" isDanger />);
  expect(screen.getByRole('button')).toHaveClass('bg-system-r-R400');
});
