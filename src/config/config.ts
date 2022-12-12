type AppConfig = {
  dev: boolean;
  useLocalDb: boolean;
  dbUrl: string;
  appRoute: string;
  serverApiRoute: string;
  serverApiGraphRoute: string;
};

const dev = process.env.NODE_ENV !== 'production';

const buildConfig = (): AppConfig => {
  const port = process.env.PORT ?? 3000;
  const useLocalDb = Boolean(process.env.USE_LOCAL_DB ?? false);

  if (dev) {
    const appRoute = `http://localhost:${port}`;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const dbUrl = useLocalDb ? process.env.DATABASE_URL_LOCAL! : process.env.DATABASE_URL_DEV!;

    return {
      dev,
      useLocalDb,
      dbUrl,
      appRoute,
      serverApiRoute: `${appRoute}/api`,
      serverApiGraphRoute: `${appRoute}/api/graphql`,
    };
  }

  const useLocalDeploy = Boolean(process.env.USE_LOCAL_DEPLOY ?? false);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const appRoute = useLocalDeploy ? `http://localhost:${port}` : process.env.NEXT_PUBLIC_WEB_PROD!;
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const dbUrl = process.env.DATABASE_URL_PROD!;

  return {
    dev,
    useLocalDb,
    dbUrl,
    appRoute,
    serverApiRoute: `${appRoute}/api`,
    serverApiGraphRoute: `${appRoute}/api/graphql`,
  };
};

const config = buildConfig();
console.log(config);

export { config };
