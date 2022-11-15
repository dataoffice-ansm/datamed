import { getByText, render } from '@testing-library/react';
import { CallToAction } from './CallToAction';

describe(CallToAction.name, () => {
  test.each<'primary' | 'secondary'>(['primary', 'secondary'])(
    'should render a link with %s theme',
    (theme) => {
      const { container } = render(
        <CallToAction theme={theme} as="link" href="#">
          Link with theme {theme}
        </CallToAction>
      );

      const classNameExpected =
        theme === 'primary'
          ? 'text-primary hover:decoration-primary'
          : 'text-secondary hover:decoration-secondary';

      expect(getByText(container, `Link with theme ${theme}`));
      expect(container.children[0].className).toContain(classNameExpected);
      expect(container).toMatchSnapshot();
    }
  );

  test.each<'primary' | 'secondary'>(['primary', 'secondary'])(
    'should render a button with %s theme',
    (theme) => {
      const mockClick = jest.fn();
      const { container } = render(
        <CallToAction theme={theme} variant="contained" as="button" onClick={mockClick}>
          Button with theme primary and variant contained
        </CallToAction>
      );

      let classNameExpected = '';
      if (theme === 'primary') {
        classNameExpected =
          'bg-primary text-white hover:bg-primary-500 focus:bg-primary-500 cursor:pointer py-2 px-4 rounded hover:text-white focus:text-white';
      }

      if (theme === 'secondary') {
        classNameExpected =
          'bg-secondary-800 text-white hover:bg-secondary focus:bg-secondary cursor:pointer py-2 px-4 rounded hover:text-white focus:text-white';
      }

      expect(getByText(container, 'Button with theme primary and variant contained'));
      expect(container.children[0].className).toContain(classNameExpected);
      expect(container).toMatchSnapshot();
    }
  );
  test.each<'contained' | 'outlined'>(['contained', 'outlined'])(
    'should render a button with %s variant',
    (variant) => {
      const mockClick = jest.fn();
      const { container } = render(
        <CallToAction theme="primary" variant={variant} as="button" onClick={mockClick}>
          Button with theme primary and variant {variant}
        </CallToAction>
      );

      let classNameExpected = '';
      if (variant === 'contained') {
        classNameExpected =
          'bg-primary text-white hover:bg-primary-500 focus:bg-primary-500 cursor:pointer py-2 px-4 rounded hover:text-white focus:text-white';
      } else {
        classNameExpected = 'border-primary text-primary hover:bg-primary';
      }

      expect(getByText(container, `Button with theme primary and variant ${variant}`));
      expect(container.children[0].className).toContain(classNameExpected);
      expect(container).toMatchSnapshot();
    }
  );
});
