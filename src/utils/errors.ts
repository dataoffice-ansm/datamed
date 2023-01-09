import { ApolloError } from '@apollo/client';
import { config } from '../config/config';

const errorsMessages = {
  INTERNAL_SERVER_ERROR: 'Une erreur est survenue lors du chargement de la page',
};

export const getServerSideErrors = (err: unknown) => {
  if (err instanceof ApolloError) {
    if (config.dev) {
      console.log('err.message:', err.message);
      console.log('err.networkError:', err.networkError);
      console.log('err.extraInfo:', err.extraInfo);
      console.log('err.clientErrors:', err.clientErrors);
      console.log('err.graphQLErrors:', err.graphQLErrors);
    }
  }

  return {
    props: {
      err: err instanceof ApolloError ? errorsMessages.INTERNAL_SERVER_ERROR : err,
    },
  };
};
