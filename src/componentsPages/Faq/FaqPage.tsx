/* eslint-disable react/no-danger */
import type { HTMLAttributes } from 'react';
import { useCallback, useState, useEffect, useMemo } from 'react';
import { EntityPageLayout } from '../../components/Layouts/EntityPageLayout/EntityPageLayout';
import { FullWidthRow } from 'components/FullWidthRow/FullWidthRow';
import { Accordion } from '../../components/Accordion/Accordion';
import { faqData } from './mock/faq-data';

import FaqSVG from '../../assets/images/faq.svg';
import SparkSVG from '../../assets/icons/spark/spark.svg';
import { useLayoutContext } from 'contexts/LayoutContext';

export type FaqType = {
  index: number;
  title: string;
  id: string;
  parts: FaqSectionPart[];
};

type FaqEntry = {
  title: string;
  content?: JSX.Element;
  disabled?: boolean;
};

type FaqSectionPart = {
  title: string;
  id: string;
  style: string;
  bubbleColor?: string;
  disabled?: boolean;
  entries: FaqEntry[];
};

const iconColor = (color?: string): string => {
  switch (color) {
    case 'red':
      return 'stroke-error';
    case 'green':
      return 'stroke-success';
    default:
      return 'stroke-grey';
  }
};

export const FaqEntryQuestion = ({
  title,
  color,
  children,
}: { title: string | HTMLElement; color?: string } & HTMLAttributes<HTMLDivElement>) => (
  <div>
    <div className="FaqEntryQuestion w-full flex gap-4 items-center font-medium justify-between px-8 py-6">
      <div className="FaqEntryQuestionLeftIcon h-8 w-8">
        <SparkSVG className={iconColor(color)} />
      </div>
      <span
        dangerouslySetInnerHTML={{
          __html: title,
        }}
        className="FaqEntryQuestionTitle text-left flex-1"
      />
    </div>
    <div className="px-8 text-sm pb-4">{children}</div>
  </div>
);

export const FaqContent = ({ search = '' }: { search?: string }) => {
  const formattedSearch = search.toLowerCase();
  const sections = useMemo(
    () =>
      faqData
        .reduce<FaqType[]>((faqTypes, faqType) => {
          const filteredParts = (faqType.parts as FaqSectionPart[]).reduce<FaqSectionPart[]>(
            (p2, n2) => {
              const entries = n2.entries.reduce<FaqEntry[]>(
                (p3, n3) => (n3.title.toLowerCase().includes(formattedSearch) ? [...p3, n3] : p3),
                []
              );
              if (entries.length > 0) {
                return [...p2, { ...n2, entries }];
              }

              return p2;
            },
            []
          );

          if (filteredParts.length > 0) {
            return [...faqTypes, { ...faqType, parts: filteredParts }];
          }

          return faqTypes;
        }, [])
        .map((section) => ({
          id: section.id,
          label: section.title,
          content: (
            <div className="bg-grey-50 p-8 rounded-lg">
              {section.parts.map((sectionPart: FaqSectionPart, index) => (
                <div key={`section-part-${index.toString()}-${section.id}`} className="my-2">
                  <div className="text-2xl py-4">{section.title}</div>
                  {sectionPart.style === 'accordion' ? (
                    <div>
                      {sectionPart.entries.map((value, index) => (
                        <div
                          key={`section-part-accordion-${index.toString()}-${value.title}`}
                          className="py-2"
                        >
                          <Accordion title={value.title} disabled={value.disabled}>
                            {value.content}
                          </Accordion>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-xl bg-white">
                      {sectionPart.entries.map(({ title, content }, index) => (
                        <FaqEntryQuestion
                          key={`section-part-question-${index.toString()}-${title}`}
                          color={sectionPart.bubbleColor}
                          title={title}
                        >
                          {content}
                        </FaqEntryQuestion>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ),
        })),
    [formattedSearch]
  );

  return (
    <div>
      {sections.length === 0 && (
        <div className="text-center font-medium text-grey-400">Aucun résultat trouvé</div>
      )}
      <EntityPageLayout
        className="pb-64"
        colorMenu="primary"
        sections={sections}
        render={(content) => content}
      />
    </div>
  );
};

export const FaqPage = () => {
  const [search, setSearch] = useState<string>('');
  const { setStickyHeroHeight } = useLayoutContext();

  useEffect(() => {
    setStickyHeroHeight(0);
  }, [setStickyHeroHeight]);

  const handleSearch = useCallback((value: string) => {
    setSearch(value);
  }, []);

  return (
    <FullWidthRow className="FaqPage bg-background" flexContent={false}>
      <div className="max-w-7xl m-auto">
        <div className="FaqHeader flex flex-col justify-center items-center py-16">
          <h1 className="text-center">Questions fréquemment posées</h1>
          <FaqSVG className="max-w-lg lg:max-w-xl xl:max-w-2xl" />
        </div>
        <div>
          <input
            className="w-full m-auto max-w-3xl my-16 px-4 py-3 rounded-lg border-grey-400"
            type="text"
            placeholder="Rechercher une question ou réponse"
            onChange={({ target }) => {
              handleSearch(target.value);
            }}
          />
        </div>
        <FaqContent search={search} />
        <FullWidthRow className="bg-background">
          <div className="h-96" />
        </FullWidthRow>
      </div>
    </FullWidthRow>
  );
};
