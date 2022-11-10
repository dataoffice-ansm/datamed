import { render } from '@testing-library/react';
import { Autocomplete } from './Autocomplete';

jest.mock('../../services/specialities', () => ({
  useFetchSpecialities: () => ({
    data: { results: [] },
  }),
}));

jest.mock('../../services/substances', () => ({
  useFetchSubstances: () => ({
    data: { results: [] },
  }),
}));

// jest.mock('../../services/substances', () => ({
//   useFetchSubstances: []
// })

describe(Autocomplete.name, () => {
  it('should render', () => {
    const { container } = render(<Autocomplete />);
    expect(container).toBeDefined();
  });
});
