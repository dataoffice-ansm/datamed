import { FaqContent } from '../componentsPages/Faq/FaqPage';
import { useCallback, useEffect, useState } from 'react';
import { useLayoutContext } from '../contexts/LayoutContext';
import { FullWidthRow } from '../components/FullWidthRow';
import FaqSVG from '../assets/landing/landing-faq.svg';
import { type FaqData, handleFetchFAQ } from '../services/faq';

const PageFaq = ({ faqData }: { faqData: FaqData }) => {
  const [search, setSearch] = useState<string>('');
  const [count, setCount] = useState<number>();

  const { setStickyHeroHeight } = useLayoutContext();

  useEffect(() => {
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

        <FaqContent search={search} notifyEntriesCount={updateCountResults} faqData={faqData} />
        <FullWidthRow className="bg-background">
          <div className="h-96" />
        </FullWidthRow>
      </div>
    </FullWidthRow>
  );
};

export const getServerSideProps = async () => {
  try {
    const { websitefaq } = await handleFetchFAQ();

    if (websitefaq) {
      return {
        props: {
          faqData: websitefaq,
        },
      };
    }

    return {
      props: {
        err: 'missing data',
      },
    };
  } catch (err: unknown) {
    console.log(err);
    return {
      props: {
        err: err instanceof Error ? err.message : err,
      },
    };
  }
};

export default PageFaq;
