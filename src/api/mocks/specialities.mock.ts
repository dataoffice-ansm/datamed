import type { Speciality } from '../interfaces/models';

export const mockSpecialitiesData: Speciality[] = [
  {
    id: '1111',
    name: 'Doliprane 500 mg, gélule',
    description:
      'Doliprane est un antalgique (calme la douleur) et un antipyrétique (fait baisser la fièvre). La substance active de ce médicament est le paracétamol. Il est utilisé pour traiter la douleur et/ou la fièvre par exemple en cas de maux de tête, d’état grippal, de douleurs dentaires, de courbatures, de règles douloureuses. Cette présentation est réservée à l’adulte et à l’enfant à partir de 27 kg (soit à partir d’environ 8 ans). lire attentivement la rubrique posologie.',
    pharmaForm: 'capsule',
    genderRepartition: {
      male: 0.3,
      female: 0.7,
    },
    ageRepartition: [
      { codePart: '0-19', value: 0.33 },
      { codePart: '20-59', value: 0.25 },
      { codePart: '60+', value: 0.41 },
    ],
  },
  {
    id: '2222',
    name: 'Levothyrox 25 microgrammes, comprimé sécable',
    description:
      'Il est préconisé dans les situations suivantes : · les hypothyroïdies (insuffisance de sécrétion de la glande thyroïde), · circonstances associées ou non à une hypothyroïdie où il est nécessaire de freiner la sécrétion de tsh (hormone qui stimule la glande thyroïde)',
    pharmaForm: 'capsule',
    genderRepartition: {
      male: 0.3,
      female: 0.7,
    },
    ageRepartition: [
      { codePart: '0-19', value: 0.33 },
      { codePart: '20-59', value: 0.25 },
      { codePart: '60+', value: 0.41 },
    ],
  },
];
