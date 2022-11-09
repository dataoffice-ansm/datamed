import { useEffect, useState } from 'react';
import { Events, scroller } from 'react-scroll';
import type { SectionNavProps } from '../components/Layouts/EntityPageLayout/EntityPageLayout';

/**
 * hook to help mange tab selected index
 * @param items represents a Section Page list from a Side Menu
 * @param initState By default 0
 */
export function useTabSelected(items: SectionNavProps[], initState = 0) {
  const [selectedIndex, setSelectedIndex] = useState<number>(initState);

  const updateTabIndex = (index: number) => {
    setSelectedIndex(index);
  };

  useEffect(() => {
    Events.scrollEvent.register('begin', (scrollAnchor) => {
      setSelectedIndex(items.findIndex((item) => item.id === scrollAnchor));
    });
  }, [items]);

  /**
   * function to active scroll move when user use keyboard
   * @param index
   */
  const handleSelectedIndex = (index: number) => {
    updateTabIndex(index);
    scroller.scrollTo(items[index].id, null);
  };

  return [selectedIndex, updateTabIndex, handleSelectedIndex] as const;
}
