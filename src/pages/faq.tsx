import { FaqContent } from '../componentsPages/Faq/FaqPage';
import { useCallback, useLayoutEffect, useState } from 'react';
import { useLayoutContext } from '../contexts/LayoutContext';
import { FullWidthRow } from '../components/FullWidthRow/FullWidthRow';
import FaqSVG from '../assets/landing/faq.svg';

const PageFaq = () => {
  const [search, setSearch] = useState<string>('');
  const [count, setCount] = useState<number>();

  const { setStickyHeroHeight } = useLayoutContext();

  useLayoutEffect(() => {
    setStickyHeroHeight(0);
  }, [setStickyHeroHeight]);

  const handleSearch = useCallback((value: string) => {
    setSearch(value);
  }, []);

  const updateCountResults = useCallback((count: number) => {
    setCount(count);
  }, []);

  return (
    <FullWidthRow className="FaqPage bg-background" flexContent={false}>
      <div className="max-w-7xl m-auto">
        <div className="FaqHeader flex flex-col justify-center items-center py-16">
          <h1 className="text-center">Questions fréquemment posées</h1>
          <FaqSVG className="max-w-lg lg:max-w-xl xl:max-w-2xl" />
        </div>
        <div className="faqSearch my-12 px-4 py-3 ">
          <div className="flex flex-col m-auto max-w-3xl">
            <input
              className="w-full rounded-lg border-grey-400"
              type="text"
              placeholder="Rechercher une question ou une réponse"
              onChange={({ target }) => {
                handleSearch(target.value);
              }}
            />
            <span className="faqCount text-primary my-2">{count} résultats</span>
          </div>
        </div>

        <FaqContent search={search} notifyEntriesCount={updateCountResults} />
        <FullWidthRow className="bg-background">
          <div className="h-96" />
        </FullWidthRow>
      </div>
    </FullWidthRow>
  );
};

export default PageFaq;
