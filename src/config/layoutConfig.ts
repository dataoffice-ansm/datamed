export type NavLinkItem = {
  title: string;
  url?: string;
  links?: NavLinkItem[];
};

export const navIconSize = 24;

export const navBarLinks: NavLinkItem[] = [
  {
    title: 'FAQ',
    url: '/faq',
  },
  {
    title: 'A propos',
    url: '/a-propos',
  },
  {
    title: 'Ruptures',
    url: '/ruptures',
  },
  {
    title: 'Pharmacovigilance',
    url: '/globaldec',
  },
  // {
  //   title: 'Statistiques globales',
  //   links: [
  //     {
  //       title: 'Ruptures',
  //       url: '/ruptures',
  //     },
  //     {
  //       title: 'Statistiques globales',
  //       url: '/globaldec',
  //     },
  //   ],
  // },
];

export const footerLinks: NavLinkItem[] = [
  {
    title: 'Partenaires',
    links: [
      {
        title: 'Base de données publique du médicament',
        url: 'https://base-donnees-publique.medicaments.gouv.fr/',
      },
      {
        title: 'Etalab',
        url: 'https://www.etalab.gouv.fr/',
      },
      {
        title: 'DINUM',
        url: 'https://www.numerique.gouv.fr/dinum/',
      },
      {
        title: 'HDH',
        url: 'https://www.health-data-hub.fr/',
      },
      {
        title: 'CNAM',
        url: 'https://assurance-maladie.ameli.fr/etudes-et-donnees/open-medic-base-complete-depenses-medicaments',
      },
    ],
  },
  {
    title: 'Le site',
    links: [
      {
        title: 'A propos',
        url: '/a-propos',
      },
      {
        title: 'Mentions légales',
        url: '/mentions-legales',
      },
      {
        title: 'Contact',
        url: '/contact',
      },
    ],
  },
];
