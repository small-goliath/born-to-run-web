import render from '@/utils/test/render';
import OutlineButton from '../commonButton/OutlineButton';
import { screen, within } from '@testing-library/dom';

it('text가 올바르게 노출된다.', async () => {
  await render(<OutlineButton type="base" text="test-text" height="h-[2.5rem]" />);
  expect(screen.getByText('test-text')).toBeInTheDocument();
});

it('height 2.5rem 속성에 따라 올바른 클래스가 적용된다', async () => {
  await render(<OutlineButton type="base" text="test-text" height="h-[2.5rem]" />);
  expect(screen.getByRole('button')).toHaveClass('h-[2.5rem]');
});

it('height 3.5rem 속성에 따라 올바른 클래스가 적용된다', async () => {
  await render(<OutlineButton type="base" text="test-text" height="h-[3.5rem]" />);
  expect(screen.getByRole('button')).toHaveClass('h-[3.5rem]');
});

it('scale이 lg라면 텍스트는 올바른 클래스를 갖는다.', async () => {
  await render(<OutlineButton type="base" text="test-text" height="h-[3.5rem]" scale="lg" />);
  expect(screen.getByText('test-text')).toHaveClass('text-label-lg');
});

it('scale이 sm라면 텍스트는 올바른 클래스를 갖는다.', async () => {
  await render(<OutlineButton type="base" text="test-text" height="h-[3.5rem]" scale="sm" />);
  expect(screen.getByText('test-text')).toHaveClass('text-label-sm');
});

it('type이 active에 따른 올바른 클래스를 갖는다.', async () => {
  await render(<OutlineButton type="active" text="test-text" height="h-[3.5rem]" />);
  expect(screen.getByRole('button')).toHaveClass('border-primary-G400');
});

it('isLoading라면 로딩 스피너가 노출된다.', async () => {
  await render(<OutlineButton type="active" text="test-text" height="h-[3.5rem]" isLoading />);
  expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
});

it('disabled라면 비활성화되며 클릭할 수 없다.', async () => {
  const onClickFn = jest.fn();
  const { user } = await render(
    <OutlineButton disabled type="active" text="test-text" height="h-[3.5rem]" onClick={onClickFn} />
  );

  const button = screen.getByRole('button');
  await user.click(button);

  expect(onClickFn).not.toHaveBeenCalled();
  expect(button).toBeDisabled();
});
