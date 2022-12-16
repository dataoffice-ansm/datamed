type AppConfig = {
  ssr?: {
    jwtToken: string;
    dbUrl: string;
    dbEnableSsl: boolean;
  };
  dev: boolean;
  appRoute: string;
  serverApiRoute: string;
  serverApiGraphRoute: string;
};

const dev = process.env.NODE_ENV !== 'production';

const ssrMode = typeof window === 'undefined';

const port = process.env.NEXT_PUBLIC_PORT ?? process.env.PORT ?? 3000;

const jwtToken = process.env.JWT_TOKEN_KEY ?? 'super duper secret key';

const appRoute = process.env.NEXT_PUBLIC_PROD_WEB_ROOT
  ? process.env.NEXT_PUBLIC_PROD_WEB_ROOT
  : `http://localhost:${port}`;

let config: AppConfig = {
  dev,
  appRoute,
  serverApiRoute: `${appRoute}/api`,
  serverApiGraphRoute: `${appRoute}/api/graphql`,
};

if (ssrMode) {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const dbUrl = process.env.DATABASE_URL!;
  const dbEnableSsl = process.env.DATABASE_SSL ? process.env.DATABASE_SSL === 'ENABLED' : false;

  config = {
    ...config,
    ssr: { dbUrl, dbEnableSsl, jwtToken },
  };
}

export { config };
