import { getByText, render } from '@testing-library/react';
import { Button } from './Button';

describe(Button.name, () => {
  test.each<'primary' | 'secondary'>(['primary', 'secondary'])(
    'should render a link with %s theme',
    (theme) => {
      const { container } = render(
        <Button theme={theme} as="link" href="#">
          Link with theme {theme}
        </Button>
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
        <Button theme={theme} variant="contained" as="button" onClick={mockClick}>
          Button with theme primary and variant contained
        </Button>
      );

      expect(getByText(container, 'Button with theme primary and variant contained'));
      expect(container).toMatchSnapshot();
    }
  );

  test.each<'contained' | 'outlined'>(['contained', 'outlined'])(
    'should render a button with %s variant',
    (variant) => {
      const mockClick = jest.fn();
      const { container } = render(
        <Button theme="primary" variant={variant} as="button" onClick={mockClick}>
          Button with theme primary and variant {variant}
        </Button>
      );

      expect(getByText(container, `Button with theme primary and variant ${variant}`));
      expect(container).toMatchSnapshot();
    }
  );
});
