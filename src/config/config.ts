type AppConfig = {
  ssr?: {
    dbUrl?: string;
    dbEnableSsl: boolean;
  };
  dev: boolean;
  appRoute: string;
  serverApiRoute: string;
  serverApiGraphRoute: string;
};

const dev = process.env.NODE_ENV !== 'production';

const buildConfig = (): AppConfig => {
  const dbUrl = process.env.DATABASE_URL;
  const dbEnableSsl = Boolean(process.env.DB_SSL ?? true);

  if (dev) {
    const port = process.env.PORT ?? 3000;
    const appRoute = `http://localhost:${port}`;

    return {
      dev,
      ssr: { dbUrl, dbEnableSsl },
      appRoute,
      serverApiRoute: `${appRoute}/api`,
      serverApiGraphRoute: `${appRoute}/api/graphql`,
    };
  }

  const appRoute = process.env.NEXT_PUBLIC_PROD_WEB_ROOT ?? null;

  if (!appRoute) {
    throw new Error('missing production app url in env');
  }

  return {
    dev,
    ssr: { dbUrl, dbEnableSsl },
    appRoute,
    serverApiRoute: `${appRoute}/api`,
    serverApiGraphRoute: `${appRoute}/api/graphql`,
  };
};

const config = buildConfig();

console.log(config);

export { config };
