/* eslint-disable react/no-danger */
import type { HTMLAttributes } from 'react';
import ReactDOMServer from 'react-dom/server';
import { useEffect, useMemo } from 'react';
import { faqData } from './faq-data';
import { toNormalForm } from '../../../utils/format';
import { Accordion } from '../../../components/Accordion';
import SparkSVG from '../../../assets/pictos/icons/spark.svg';
import { EntityPageLayout } from '../../../components/Layouts/EntityPageLayout/EntityPageLayout';

export type FaqType = {
  index: number;
  title: string;
  id: string;
  parts: FaqSectionPart[];
  disabled?: boolean;
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

const faq = faqData.reduce<FaqType[]>((faqSections, faqSection) => {
  if (faqSection.disabled) {
    return faqSections;
  }

  const filteredSectionParts = faqSection.parts.reduce<FaqSectionPart[]>(
    (sectionParts, sectionPart) => {
      if (sectionPart.disabled) {
        return sectionParts;
      }

      const filteredEntries = sectionPart.entries.reduce<FaqEntry[]>(
        (sectionPartEntries, sectionPartEntry) =>
          sectionPartEntry.disabled
            ? sectionPartEntries
            : [...sectionPartEntries, sectionPartEntry],
        []
      );

      return [...sectionParts, { ...sectionPart, entries: filteredEntries }];
    },
    []
  );

  return [...faqSections, { ...faqSection, parts: filteredSectionParts }];
}, []);

const FaqEntryQuestion = ({
  title,
  color,
  children,
}: { title: string | HTMLElement; color?: string } & HTMLAttributes<HTMLDivElement>) => (
  <div className="FaqEntryQuestion my-6 px-4">
    <div className="w-full flex gap-4 items-center font-medium justify-between">
      <div className="h-8 w-8">
        <SparkSVG className={iconColor(color)} />
      </div>
      <span
        dangerouslySetInnerHTML={{
          __html: title,
        }}
        className="text-left flex-1"
      />
    </div>
    {children && <div className="px-8 text-sm">{children}</div>}
  </div>
);

const filterSections = (formattedSearch: string) =>
  faq.reduce<FaqType[]>((faqSections, faqSection) => {
    const filteredSectionParts = faqSection.parts.reduce<FaqSectionPart[]>(
      (sectionParts, sectionPart) => {
        if (toNormalForm(sectionPart.title.toLowerCase()).includes(toNormalForm(formattedSearch))) {
          return [...sectionParts, sectionPart];
        }

        const filteredEntries = sectionPart.entries.reduce<FaqEntry[]>(
          (sectionPartEntries, sectionPartEntry) => {
            if (
              toNormalForm(sectionPartEntry.title.toLowerCase()).includes(
                toNormalForm(formattedSearch)
              )
            ) {
              return [...sectionPartEntries, sectionPartEntry];
            }

            if (sectionPartEntry.content) {
              if (
                ReactDOMServer.renderToString(sectionPartEntry.content).includes(
                  toNormalForm(formattedSearch)
                )
              ) {
                return [...sectionPartEntries, sectionPartEntry];
              }
            }

            return sectionPartEntries;
          },
          []
        );

        if (filteredEntries.length > 0) {
          return [...sectionParts, { ...sectionPart, entries: filteredEntries }];
        }

        return sectionParts;
      },
      []
    );

    if (filteredSectionParts.length > 0) {
      return [...faqSections, { ...faqSection, parts: filteredSectionParts }];
    }

    return faqSections;
  }, []);

export const FaqContentLegacy = ({
  search = '',
  notifyEntriesCount,
}: {
  notifyEntriesCount: (_count: number) => void;
  search: string;
}) => {
  const formattedSearch = search.toLowerCase();
  const filteredSections = useMemo(() => filterSections(formattedSearch), [formattedSearch]);

  const entriesLength = useMemo(
    () =>
      filteredSections.reduce<number>((countN1, faqSection) => {
        const partsLength = faqSection.parts.reduce<number>(
          (countN2, sectionPart) => countN2 + sectionPart.entries.length,
          0
        );
        return countN1 + partsLength;
      }, 0),
    [filteredSections]
  );

  const sections = useMemo(
    () =>
      filteredSections.map((section) => ({
        id: section.id,
        label: section.title,
        content: (
          <div className="bg-grey-50 p-8 rounded-lg">
            <h2 className="py-4 m-0">{section.title}</h2>
            {section.parts.map((sectionPart: FaqSectionPart, sectionPartIndex) => (
              <div
                key={`section-part-${sectionPartIndex.toString()}-${section.id}`}
                className="my-2"
              >
                <h3 className="py-4 m-0">{sectionPart.title}</h3>
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
                  <div className="SectionPartEntries rounded-xl bg-white p-2">
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
    [filteredSections]
  );

  useEffect(() => {
    notifyEntriesCount(entriesLength);
  }, [entriesLength, notifyEntriesCount]);

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
