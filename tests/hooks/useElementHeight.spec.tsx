import { render, screen } from '@testing-library/react';
import type { RefObject } from 'react';
import React from 'react';
import { useRefHeight } from '../../src/hooks/useRefHeight';

describe(useRefHeight.name, () => {
  test('should trigger component height', async () => {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    let componentRef = {
      current: {
        offsetHeight: 32,
      },
    } as RefObject<HTMLDivElement>;

    const FakeComponent: React.FC = () => {
      const triggeredHeight = useRefHeight(componentRef);
      return <div data-testid="expected-height">{triggeredHeight}</div>;
    };

    const { rerender } = render(<FakeComponent />);
    expect((await screen.findByTestId('expected-height')).innerHTML).toEqual('32');

    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    componentRef = {
      current: {
        offsetHeight: 44,
      },
    } as RefObject<HTMLDivElement>;

    rerender(<FakeComponent />);

    expect((await screen.findByTestId('expected-height')).innerHTML).toEqual('44');
  });
});
