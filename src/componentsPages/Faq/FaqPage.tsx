import { useEffect, useMemo } from 'react';
import { EntityPageLayout } from '../../components/Layouts/EntityPageLayout/EntityPageLayout';
import { Accordion } from '../../components/Accordion';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

import SparkSVG from '../../assets/pictos/icons/spark.svg';
import { type FaqData, type FaqSectionPart } from '../../services/faq';
import { filterFaqEntries, findResultsInFaq } from '../../utils/faq';
import { type Document } from '@contentful/rich-text-types';

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

const FaqEntryAccordion = ({ title, content }: { title: string; content?: Document }) => (
  <div className="py-2">
    <Accordion title={title}>{content ? documentToReactComponents(content) : ''}</Accordion>
  </div>
);

const FaqEntryText = ({
  title,
  color,
  content,
}: {
  title: Document;
  content?: Document;
  color?: string;
}) => (
  <div className="FaqEntryQuestion md:my-6 md:px-4">
    <div className="w-full flex gap-2 md:gap-4 items-center font-medium justify-between">
      <div className="h-8 w-8">
        <SparkSVG className={iconColor(color)} />
      </div>
      <span className="text-left flex-1">{title ? documentToReactComponents(title) : ''}</span>
    </div>
    {content && (
      <div className="px-8 text-sm">{content ? documentToReactComponents(content) : ''}</div>
    )}
  </div>
);

export const FaqContent = ({
  faqData,
  search = '',
  notifyEntriesCount,
}: {
  faqData: FaqData;
  notifyEntriesCount: (_count: number) => void;
  search: string;
}) => {
  const faq = filterFaqEntries(faqData);
  const formattedSearch = search.toLowerCase();
  const faqSections = useMemo(() => findResultsInFaq(faq, formattedSearch), [faq, formattedSearch]);

  const entriesLength = useMemo(
    () =>
      faqSections.reduce<number>((countN1, section) => {
        const partsLength = section.sectionsCollection.items.reduce<number>(
          (countN2, sectionPart) => countN2 + sectionPart.entriesCollection.items.length,
          0
        );
        return countN1 + partsLength;
      }, 0),
    [faqSections]
  );

  const sections = useMemo(
    () =>
      faqSections.map((section) => ({
        id: section.htmlId,
        label: section.title,
        content: (
          <div className="px-4 py-2 md:px-8 md:py-8 bg-grey-50 rounded-lg">
            <h2 className="py-2 md:py-4 m-0">{section.title}</h2>
            {section.sectionsCollection.items.map(
              (sectionPart: FaqSectionPart, sectionPartIndex) => (
                <div
                  key={`section-part-${sectionPartIndex.toString()}-${section.htmlId}`}
                  className="my-2"
                >
                  <h3 className="py-4 m-0">{sectionPart.title}</h3>
                  {sectionPart.style === 'accordion' ? (
                    <div>
                      {sectionPart.entriesCollection.items.map((entry, index) => (
                        <FaqEntryAccordion
                          key={`section-part-accordion-${index.toString()}`}
                          title={entry.title}
                          content={entry?.subContent?.json}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="SectionPartEntries rounded-xl bg-white p-2">
                      {sectionPart.entriesCollection.items.map((entry, index) => (
                        <FaqEntryText
                          key={`section-part-question-${index.toString()}-${entry.title}`}
                          color={sectionPart.bubbleColor}
                          title={entry.content.json}
                          content={entry?.subContent?.json}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )
            )}
          </div>
        ),
      })),
    [faqSections]
  );

  useEffect(() => {
    notifyEntriesCount(entriesLength);
  }, [entriesLength, notifyEntriesCount]);

  return (
    <div className="FaqContent">
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
