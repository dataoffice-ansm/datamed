import {
  NAVIGATION_ICON_SIZE,
  THRESHOLD_WIDTH_BREAKPOINT_MD,
} from '../../src/models/navigation.model';

describe('Navigation models', () => {
  test('should return right values', () => {
    expect(NAVIGATION_ICON_SIZE).toEqual(24);
    expect(THRESHOLD_WIDTH_BREAKPOINT_MD).toEqual(768);
  });
});
