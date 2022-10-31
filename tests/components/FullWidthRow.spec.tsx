import { render } from '@testing-library/react';
import { FullWidthRow } from '../../src/components/FullWidthRow';

describe(FullWidthRow.name, () => {
  test('should render', () => {
    const fixture = render(<FullWidthRow />);
    expect(fixture).toBeDefined();
  });

  test('should apply styles', async () => {
    const fixture = render(<FullWidthRow className="bg-blue-20" />);
    expect(fixture.container).toContainHTML('m-[0_auto_0_-50vw] ');
    expect(fixture.container).toContainHTML('w-screen');
    expect(fixture.container).toContainHTML('left-1/2');
    expect(fixture.container).toContainHTML('relative');
    expect(fixture.container).toContainHTML('bg-blue-20');
  });

  test('should contain right structure', async () => {
    const fixture = render(<FullWidthRow className="bg-blue-20" />);

    const rootItem = fixture.container.children.item(0);
    expect(rootItem?.className).toContain('relative');

    const children = rootItem?.children;
    expect(children?.length).toEqual(2);
    expect(children?.item(0)?.className).toEqual(
      'w-screen absolute h-full left-1/2 m-[0_auto_0_-50vw] bg-blue-20'
    );
    expect(children?.item(1)?.className).toContain('relative');
  });
});
