import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Tooltip } from '../../src/components/Tooltip';

describe(Tooltip.name, () => {
  const expectOnMouseEnter = async (resultToFind: string) => {
    fireEvent(screen.getByText('test'), new MouseEvent('mouseenter', { bubbles: true }));
    await waitFor(() => screen.getByRole('tooltip'));
    expect(screen.getByRole('tooltip').className).toContain(resultToFind);
    // The positioning does not matter
    cleanup();
  };

  test('should render', async () => {
    render(
      <Tooltip content="content" title="title">
        <span>test</span>
      </Tooltip>
    );

    await expectOnMouseEnter('tooltip-container');
  });

  test.each<['white' | 'turquoise']>([['white'], ['turquoise']])(
    'should render %p theme',
    async (color: 'white' | 'turquoise') => {
      render(
        <Tooltip content="content" title="title" theme={color}>
          <span>test</span>
        </Tooltip>
      );
      await expectOnMouseEnter(`bg-${color}`);
    }
  );
});
