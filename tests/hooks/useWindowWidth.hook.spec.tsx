import { fireEvent, renderHook } from '@testing-library/react';
import { useWindowWidth } from '../../src/hooks/useWindowWidth.hook';

describe(useWindowWidth.name, () => {
  test('should trigger component height', async () => {
    const width = renderHook(() => useWindowWidth());
    expect(width.result.current).toEqual(0);

    window.innerWidth = 120;
    fireEvent(window, new Event('resize'));

    width.rerender();
    expect(width.result.current).toEqual(120);
  });
});
