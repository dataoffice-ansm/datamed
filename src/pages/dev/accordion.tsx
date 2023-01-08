/* eslint-disable react/no-unescaped-entities */
import type { AccordionProps } from '../../components/Accordion/Accordion';
import { Accordion } from '../../components/Accordion/Accordion';
import type { ReactNode } from 'react';
import { DevPageLayout } from '../../components/Layouts/DevPageLayout';

type AccordionDevPreview = {
  key: string;
  content: ReactNode;
} & AccordionProps;

const faq: AccordionDevPreview[] = [
  {
    key: 'faq_1',
    title: `Quelle est la différence entre le site de l'ANSM et data.ansm ?`,
    content: (
      <div>
        <p>
          L'ANSM possède un site (ansm.sante.fr) qui répertorie toutes les données éditoriales, les
          informations importantes relatives aux médicaments et aux produits de santé.
        </p>
        <p>
          data.ansm.sante.fr est un sous-domaine du site de l'Agence : il vient en complément du
          site principal (ansm.sante.fr) pour apporter un autre aspect des données relatives au
          médicament avec explications et statistiques par médicaments après commercialisaition dans
          un premier temps.
        </p>
        <p>
          À terme, data.ansm.sante.fr a pour mission de partager en open data l'ensemble des données
          exploitables par le grand public et respectant les données personnelles.
        </p>
      </div>
    ),
  },
  {
    forceDefaultOpen: true,
    key: 'faq_2',
    theme: 'primary',
    title: `Beaucoup des données sont basées sur de la déclaration, qu'est-ce que cela implique ? Les données sur les effets indésirables représentent-elles l'exhaustivité des cas ?`,
    content: (
      <div className="py-4">
        Les données affichées dans les pages de médicaments et les pages de substances actives sur
        les effets indésirables sont basées sur les déclarations spontanées par les patients et les
        professionnels de santé. La sous-déclaration des effets indésirables des médicaments est
        connue. Elle est importante, cependant les déclarations permettent de détecter des signaux
        en pharmacovigilance, même si non exhaustives.
      </div>
    ),
  },
  {
    key: 'faq_3',
    theme: 'success',
    title: 'Quelles données de la Cnam sont utilisées sur data.ansm ?',
    content: (
      <div className="py-4">
        La Caisse nationale de l'Assurance Maladie alimente la base de données du SNDS (Système
        national des données de santé). Il existe un libre accès à certaines de ses données
        présentes dans la base Open Medic. Data.ansm utilise des données des remboursements de
        médicaments dispensés en pharmacie.
      </div>
    ),
  },
  {
    key: 'faq_3',
    theme: 'warning',
    title: 'Quelles données de la Cnam sont utilisées sur data.ansm ?',
    content: (
      <div className="py-4">
        La Caisse nationale de l'Assurance Maladie alimente la base de données du SNDS (Système
        national des données de santé). Il existe un libre accès à certaines de ses données
        présentes dans la base Open Medic. Data.ansm utilise des données des remboursements de
        médicaments dispensés en pharmacie.
      </div>
    ),
  },
  {
    key: 'faq_3',
    theme: 'error',
    title: 'Quelles données de la Cnam sont utilisées sur data.ansm ?',
    content: (
      <div className="py-4">
        La Caisse nationale de l'Assurance Maladie alimente la base de données du SNDS (Système
        national des données de santé). Il existe un libre accès à certaines de ses données
        présentes dans la base Open Medic. Data.ansm utilise des données des remboursements de
        médicaments dispensés en pharmacie.
      </div>
    ),
  },
  {
    key: 'faq_3',
    theme: 'grey',
    title: 'Quelles données de la Cnam sont utilisées sur data.ansm ?',
    content: (
      <div className="py-4">
        La Caisse nationale de l'Assurance Maladie alimente la base de données du SNDS (Système
        national des données de santé). Il existe un libre accès à certaines de ses données
        présentes dans la base Open Medic. Data.ansm utilise des données des remboursements de
        médicaments dispensés en pharmacie.
      </div>
    ),
  },
];

export const AccordionPage = () => (
  <DevPageLayout title="Accordion">
    <div className="my-4 flex flex-col gap-4 m-auto max-w-2xl min-h-screen">
      {faq.map(({ title, content, key, forceDefaultOpen, theme }) => (
        <Accordion key={key} forceDefaultOpen={forceDefaultOpen} title={title} theme={theme}>
          {content}
        </Accordion>
      ))}
    </div>
  </DevPageLayout>
);

export default AccordionPage;
