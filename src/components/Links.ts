import { FamilyLink } from './models';

export const familyLinks: FamilyLink[] = [
  {
    title: 'Partenaires',
    links: [
      {
        name: 'Base de données publique du médicament',
        url: 'https://base-donnees-publique.medicaments.gouv.fr/',
      },
      {
        name: 'Etalab',
        url: 'https://www.etalab.gouv.fr/',
      },
      {
        name: 'DINUM',
        url: 'https://www.numerique.gouv.fr/dinum/',
      },
      {
        name: 'HDH',
        url: 'https://www.health-data-hub.fr/',
      },
    ],
  },
  {
    title: 'Le site',
    links: [
      {
        name: 'A propos',
        url: '/a-propos',
      },
      {
        name: 'Mentions légales',
        url: '/mentions-legales',
      },
      {
        name: 'Contact',
        url: '/contact',
      },
    ],
  },
];
