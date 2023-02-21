type AppConfig = {
  dev: boolean;
  ssrMode: boolean;
  tokenName: string;
  appRoute: string;
  ssr?: {
    jwtToken: string;
    dbUrl: string;
    dbEnableSsl: boolean;
  };
  contentful: {
    spaceId?: string;
    accessToken?: string;
    previewToken?: string;
    entries: {
      faq?: string;
    };
  };
};

const dev = process.env.NODE_ENV !== 'production';
const ssrMode = typeof window === 'undefined';
const jwtToken = process.env.JWT_TOKEN_KEY ?? 'super duper secret key';
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const appRoute = process.env.NEXT_PUBLIC_PROD_WEB_ROOT!;

const contentful = {
  spaceId: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  previewToken: process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN,
  entries: {
    faq: process.env.CONTENFUL_FAQ_ENTRTY,
  },
};

let config: AppConfig = {
  tokenName: 'datamed_token',
  appRoute,
  dev,
  ssrMode,
  contentful,
};

if (ssrMode) {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const dbUrl = process.env.DATABASE_URL!;
  const dbEnableSsl = process.env.DATABASE_SSL ? process.env.DATABASE_SSL === 'ENABLED' : false;

  config = {
    ...config,
    dev,
    ssr: { dbUrl, dbEnableSsl, jwtToken },
  };
}

export { config };
