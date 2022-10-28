jest.mock('../../src/hooks/useElementHeight.hook', () => ({
  useElementHeight: () => 84,
}));

import { render } from '@testing-library/react';
import { NavigationBar } from '../../src/components/Navigation/NavigationBar';

describe(NavigationBar.name, () => {
  test.skip('should render', () => {
    const { container } = render(<NavigationBar />);
    expect(container).toBeDefined();
  });

  // test('should render DATAMED logo', async () => {
  //   render(<NavBar />);

  //   const homeLink: HTMLImageElement = await screen.findByAltText('Logo DATAMED');
  //   expect(homeLink.src).toEqual(
  //     'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
  //   );
  // });

  // test('should render links', async () => {
  //   render(<NavBar />);

  //   const aboutLink: HTMLLinkElement = await screen.findByText('A propos');
  //   expect(aboutLink.href).toEqual('http://localhost/a-propos');

  //   const faqLink: HTMLLinkElement = await screen.findByText('FAQ');
  //   expect(faqLink.href).toEqual('http://localhost/faq');
  // });

  // test('should render search bar input', async () => {
  //   render(<NavBar />);

  //   const inputElement: HTMLInputElement = await screen.findByRole('textbox');
  //   expect(inputElement.placeholder).toEqual('Rechercher');
  // });

  // test('should add sticky header when window scrolled', async () => {
  //   render(<NavBar />);

  //   const containerBeforeTriggerScroll = await screen.findByRole('navigation');
  //   const containerClassNameBeforeTriggerScroll = containerBeforeTriggerScroll.className;

  //   act(() => {
  //     Object.defineProperty(global.window, 'scrollY', { value: 20 });
  //     fireEvent(window, new Event('scroll'));
  //   });

  //   expect(containerClassNameBeforeTriggerScroll).toContain('z-[1]');
  //   expect(containerClassNameBeforeTriggerScroll).toContain('fixed');
  //   expect(containerClassNameBeforeTriggerScroll).toContain('p-8');
  //   expect(containerClassNameBeforeTriggerScroll).toContain('left-0');
  //   expect(containerClassNameBeforeTriggerScroll).toContain('right-0');
  //   expect(containerClassNameBeforeTriggerScroll).toContain('flex');
  //   expect(containerClassNameBeforeTriggerScroll).toContain('justify-between');
  //   expect(containerClassNameBeforeTriggerScroll).toContain('items-center');
  //   expect(containerClassNameBeforeTriggerScroll).toContain('bg-white');
  //   expect(containerClassNameBeforeTriggerScroll).toContain('top-0');
  //   expect(containerClassNameBeforeTriggerScroll).toContain('ease-in-out');
  //   expect(containerClassNameBeforeTriggerScroll).toContain('duration-200');
  //   expect(containerClassNameBeforeTriggerScroll).toContain('transition-padding');
  //   expect(containerClassNameBeforeTriggerScroll).not.toContain('py-3');
  //   expect(containerClassNameBeforeTriggerScroll).not.toContain('shadow');

  //   act(() => {
  //     Object.defineProperty(global.window, 'scrollY', { value: 200 });
  //     fireEvent(window, new Event('scroll'));
  //   });

  //   const containerClassNameAfterTriggerScroll = await screen.findByRole('navigation');
  //   expect(containerClassNameAfterTriggerScroll.className).toContain('py-3');
  //   expect(containerClassNameAfterTriggerScroll.className).toContain('shadow');
  // });
});
