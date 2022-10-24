import { renderHook } from '@testing-library/react';
import { useTabSelected } from '../../src/hooks/useTabSelected.hook';

describe(useTabSelected.name, () => {
  const menu = [
    {
      id: 'tab-1',
      label: 'tab 1',
    },
    {
      id: 'tab-2',
      label: 'tab 2',
    },
  ];

  test('should return index 0', () => {
    const { result } = renderHook(() => useTabSelected(menu, 0));
    const [index] = result.current;
    expect(index).toEqual(0);
  });
});
