import render from '@/utils/test/render';
import TextButton from '../commonButton/TextButton';
import { screen } from '@testing-library/dom';

it('text를 올바르게 노출한다.', async () => {
  await render(<TextButton text="test-text" type="back" />);
  expect(screen.getByText('test-text'));
});
it('type em일 경우 올바른 클래스를 갖는다.', async () => {
  await render(<TextButton text="test-text" type="em" />);
  expect(screen.getByText('test-text')).toHaveClass('text-system-r-R400');
});
it('type enabled일 경우 올바른 클래스를 갖는다.', async () => {
  await render(<TextButton text="test-text" type="enable" />);
  expect(screen.getByText('test-text')).toHaveClass('text-primary-G400');
});
it('type back일 경우 올바른 클래스를 갖는다.', async () => {
  await render(<TextButton text="test-text" type="back" />);
  expect(screen.getByText('test-text')).toHaveClass('text-secondary-N900');
});

it('type close일 경우 올바른 클래스를 갖는다.', async () => {
  await render(<TextButton text="test-text" type="close" />);
  expect(screen.getByText('test-text')).toHaveClass('text-secondary-N900');
});

it('hasBorder가 true일 경우 버튼에 border가 노출된다. ', async () => {
  await render(<TextButton hasBorder text="test-text" type="close" />);
  expect(screen.getByRole('button')).toHaveClass('border-[1px]');
});

it('onClick함수가 호출된다.', async () => {
  const onClickFn = jest.fn();
  const { user } = await render(<TextButton hasBorder text="test-text" type="close" onClick={onClickFn} />);
  await user.click(screen.getByRole('button'));
  expect(onClickFn).toHaveBeenCalledTimes(1);
});
