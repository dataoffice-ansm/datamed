import { render, screen } from '@testing-library/react';
import React, { RefObject } from 'react';
import { useElementHeight } from '../../src/hooks/useElementHeight.hook';

describe(useElementHeight.name, () => {
  test('should trigger component height', async () => {
    let componentRef = {
      current: {
        offsetHeight: 32,
      },
    } as RefObject<HTMLDivElement>;

    const FakeComponent: React.FC = () => {
      const triggeredHeight = useElementHeight(componentRef);
      return <div data-testid="expected-height">{triggeredHeight}</div>;
    };

    const { rerender } = render(<FakeComponent />);
    expect((await screen.findByTestId('expected-height')).innerHTML).toEqual('32');

    componentRef = {
      current: {
        offsetHeight: 44,
      },
    } as RefObject<HTMLDivElement>;
    rerender(<FakeComponent />);

    expect((await screen.findByTestId('expected-height')).innerHTML).toEqual('44');
  });
});
