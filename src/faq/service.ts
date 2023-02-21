import { config } from '../config/config';
import { faqQuery } from './query';
import axios from 'axios';
import { type Document } from '@contentful/rich-text-types';

export type FaqData = {
  title: string;
  sectionsCollection: {
    items: FaqSection[];
  };
};

export type FaqSection = {
  title: string;
  htmlId: string;
  disabled: boolean;
  sectionsCollection: {
    items: FaqSectionPart[];
  };
};

export type FaqSectionPart = {
  title: string;
  disabled: boolean;
  htmlId: string;
  style: 'accordion' | 'bubble';
  bubbleColor: 'green' | 'red';
  entriesCollection: {
    items: FaqSectionPartEntry[];
  };
};

export type FaqSectionPartEntry = {
  title: string;
  disabled: boolean;
  content: {
    json: Document;
  };
  subContent?: {
    json: Document;
  };
};

const fetchContentfulFAQ = async () => {
  if (!config.contentful.spaceId || !config.contentful.accessToken) {
    throw new Error('missing env');
  }

  return axios.post<{
    data: { websitefaq: FaqData };
  }>(
    `https://graphql.contentful.com/content/v1/spaces/${config.contentful.spaceId}`,
    { query: faqQuery, variables: { entryId: '6FJ4hehwNj24wiTICkNQTN' } },
    {
      headers: {
        Authorization: `Bearer ${config.contentful.accessToken}`,
        'content-type': 'application/json',
      },
    }
  );
};

export const handleFetchFAQ = async () =>
  fetchContentfulFAQ()
    .then((response) => response?.data?.data)
    .catch((err: any) => {
      throw new Error(err);
    });
