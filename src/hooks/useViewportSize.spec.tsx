import { renderHook } from '@testing-library/react';
import { useViewportSize } from './useViewportSize';

describe(useViewportSize.name, () => {
  it('should be defined', () => {
    expect(useViewportSize).toBeDefined();
  });

  function getHook() {
    return renderHook(() => useViewportSize());
  }

  it('should return current window dimensions', () => {
    const hook = getHook();

    expect(typeof hook.result.current).toBe('object');
    expect(typeof hook.result.current.height).toBe('number');
    expect(typeof hook.result.current.width).toBe('number');
  });
});
