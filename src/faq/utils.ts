import {
  type FaqData,
  type FaqSection,
  type FaqSectionPart,
  type FaqSectionPartEntry,
} from './service';
import { toNormalForm } from '../utils/format';

export const filterFaqEntries = (faqData: FaqData) => {
  if (!faqData?.sectionsCollection?.items) {
    return [] as FaqSection[];
  }

  return faqData.sectionsCollection.items.reduce<FaqSection[]>((faqSections, faqSection) => {
    if (faqSection.disabled) {
      return faqSections;
    }

    const filteredSectionParts = faqSection.sectionsCollection.items.reduce<FaqSectionPart[]>(
      (sectionParts, sectionPart) => {
        if (sectionPart.disabled) {
          return sectionParts;
        }

        const filteredEntries = sectionPart.entriesCollection.items.reduce<FaqSectionPartEntry[]>(
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
};

export const findResultsInFaq = (faqSections: FaqSection[], formattedSearch: string) =>
  faqSections.reduce<FaqSection[]>((faqSections, faqSection) => {
    const filteredSectionParts = faqSection.sectionsCollection.items.reduce<FaqSectionPart[]>(
      (sectionParts, sectionPart) => {
        if (
          sectionPart.title &&
          toNormalForm(sectionPart.title.toLowerCase()).includes(toNormalForm(formattedSearch))
        ) {
          return [...sectionParts, sectionPart];
        }

        const filteredEntries = sectionPart.entriesCollection.items.reduce<FaqSectionPartEntry[]>(
          (sectionPartEntries, sectionPartEntry) => {
            if (
              sectionPartEntry.title &&
              toNormalForm(sectionPartEntry.title.toLowerCase()).includes(
                toNormalForm(formattedSearch)
              )
            ) {
              return [...sectionPartEntries, sectionPartEntry];
            }

            if (
              sectionPartEntry.title &&
              toNormalForm(sectionPartEntry.title.toLowerCase()).includes(
                toNormalForm(formattedSearch)
              )
            ) {
              return [...sectionPartEntries, sectionPartEntry];
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
