/* eslint-disable react/no-danger */
import type { HTMLAttributes, ReactNode } from 'react';
import { useMemo } from 'react';
import { EntityPageLayout } from '../../components/Layouts/EntityPageLayout/EntityPageLayout';
import { FullWidthRow } from 'components/FullWidthRow/FullWidthRow';
import { Accordion } from '../../components/Accordion/Accordion';
import { faqData } from './mock/faq-data';

import FaqSVG from '../../assets/images/faq.svg';
import SparkSVG from '../../assets/icons/spark/spark.svg';

type FaqEntry = {
  title: string;
  content?: ReactNode | JSX.Element | string;
};

type FaqSectionPart = {
  title: string;
  id: string;
  style: string;
  bubbleColor?: string;
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
}: { title: string | HTMLElement; color?: string } & HTMLAttributes<HTMLDivElement>) => (
  <div className="FaqEntryQuestion w-full flex gap-4 items-center font-medium justify-between p-8">
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
);

export const FaqPage = () => {
  const sections = useMemo(
    () =>
      faqData.map((section) => ({
        id: section.id,
        label: section.title,
        content: (
          <div className="bg-grey-50 p-8 rounded-lg">
            {section.parts.map((sectionPart: FaqSectionPart, index) => (
              <div key={`section-part-${index.toString()}-${section.id}`} className="my-2">
                <div className="text-2xl py-4">{section.title}</div>
                {sectionPart.style === 'accordion' ? (
                  <div>
                    {sectionPart.entries.map((value) => (
                      <div
                        key={`section-part-accordion-${index.toString()}-${value.title}`}
                        className="py-2"
                      >
                        <Accordion title={value.title}>{value.content}</Accordion>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-xl bg-white">
                    {sectionPart.entries.map(({ title }) => (
                      <FaqEntryQuestion
                        key={`section-part-question-${index.toString()}-${title}`}
                        color={sectionPart.bubbleColor}
                        title={title}
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ),
      })),
    []
  );

  return (
    <FullWidthRow className="FaqPage bg-background">
      <div className="max-w-7xl m-auto">
        <div className="FaqHeader flex flex-col justify-center items-center py-16">
          <h1 className="text-center">Questions fréquemment posées</h1>
          <FaqSVG className="max-w-lg lg:max-w-xl xl:max-w-2xl" />
        </div>
        <EntityPageLayout
          className="pb-64"
          colorMenu="primary"
          sections={sections}
          render={(content) => content}
        />
        <FullWidthRow className="bg-background">
          <div className="h-96" />
        </FullWidthRow>
      </div>
    </FullWidthRow>
  );
};
