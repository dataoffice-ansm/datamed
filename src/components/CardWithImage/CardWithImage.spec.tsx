import { getByTestId, getByText, render } from '@testing-library/react';
import { CardWithImage } from './CardWithImage';

describe(CardWithImage.name, () => {
  test('should render', () => {
    const { container } = render(
      <CardWithImage
        title="fake_title"
        description="fake_description"
        href="fake_url"
        source="fake_source"
        className="testclassname"
        image={<div data-testid="fake_image" />}
      />
    );

    expect(getByTestId(container, 'fake_image'));
    expect(getByText(container, 'fake_title'));
    expect(getByText(container, 'fake_description'));
    expect(getByText(container, 'fake_source'));

    expect(container.getElementsByClassName('testclassname').length).toEqual(1);

    expect(container).toMatchSnapshot();
  });
});
