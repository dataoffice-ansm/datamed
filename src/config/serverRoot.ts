const dev = process.env.NODE_ENV !== 'production';

export const serverApiRoute = dev ? 'http://localhost:3000' : 'https://data.ansm.sante.fr/';
