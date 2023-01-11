// 👇️ ts-nocheck ignores all ts errors in the file
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error

import { render } from '@testing-library/react';
import { FullWidthRow } from '../FullWidthRow';

describe(FullWidthRow.name, () => {
  test('should render', () => {
    const fixture = render(<FullWidthRow />);
    expect(fixture).toBeDefined();
  });

  test('should apply styles', async () => {
    const fixture = render(<FullWidthRow className="bg-secondary-light" />);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    expect(fixture.container).toContainHTML('m-[0_auto_0_-50vw] ');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    expect(fixture.container).toContainHTML('w-screen');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    expect(fixture.container).toContainHTML('left-1/2');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    expect(fixture.container).toContainHTML('relative');
  });

  test('should contain right structure', async () => {
    const fixture = render(<FullWidthRow className="bg-secondary-light" />);

    const rootItem = fixture.container.children.item(0);
    expect(rootItem?.className).toContain('relative');

    const children = rootItem?.children;
    expect(children?.length).toEqual(2);
    expect(children?.item(0)?.className).toEqual(
      'w-screen absolute h-full left-1/2 m-[0_auto_0_-50vw] bg-secondary-light'
    );
    expect(children?.item(1)?.className).toContain('relative');
  });
});
