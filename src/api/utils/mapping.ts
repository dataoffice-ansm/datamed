import {
  MedicalErrorApparitionStep,
  PharmaFormType,
} from '../graphql/__generated__/generated-types';
import { ExpositionLevel } from '../graphql/enums';

export const getCisPharmaFormType = (v: string) => {
  switch (v) {
    case 'collyre':
      return PharmaFormType.Collyre;
    case 'crème':
      return PharmaFormType.Creme;
    case 'comprimé':
      return PharmaFormType.Comprime;
    case 'liquide':
      return PharmaFormType.Liquide;
    case 'gaz':
      return PharmaFormType.Gaz;
    case 'granule':
      return PharmaFormType.Granule;
    case 'gélule':
      return PharmaFormType.Gelule;
    case 'poudre':
      return PharmaFormType.Poudre;
    case 'implant':
      return PharmaFormType.Implant;
    case 'seringue':
      return PharmaFormType.Seringue;
    case 'pansement':
      return PharmaFormType.Pansement;
    case 'sirop':
      return PharmaFormType.Sirop;
    case 'suppositoire':
      return PharmaFormType.Supositoire;
    case 'spray':
      return PharmaFormType.Spray;
    case 'multi':
      return PharmaFormType.Multi;
    case 'autre':
    default:
      return PharmaFormType.Autre;
  }
};

const getExpositionConsumptionCis = (exposition: keyof typeof ExpositionLevel) => {
  switch (exposition) {
    case 'VERYLOW':
      return '< 1 000';
    case 'LOW':
      return '1 000 - 5 000';
    case 'MODERED':
      return '5 000 - 15 000';
    case 'HIGH':
      return '15 000 - 50 000';
    case 'VERYHIGH':
      return '> 50 000';
    default:
      return 'Inconnu';
  }
};

const getExpositionConsumptionSub = (exposition: keyof typeof ExpositionLevel) => {
  switch (exposition) {
    case 'VERYLOW':
      return '< 5 000';
    case 'LOW':
      return '5 000 - 25 000';
    case 'MODERED':
      return '25 000 - 100 000';
    case 'HIGH':
      return '100 000 - 500 000';
    case 'VERYHIGH':
      return '> 500 000';
    default:
      return 'Inconnu';
  }
};

export const getExpositionDescription = (exposition: keyof typeof ExpositionLevel) => {
  switch (exposition) {
    case 'VERYLOW':
      return 'Utilisation très faible';
    case 'LOW':
      return 'Utilisation faible';
    case 'MODERED':
      return 'Utilisation modérée';
    case 'HIGH':
      return 'Utilisation élevée';
    case 'VERYHIGH':
      return 'Utilisation très élevée';
    default:
      return 'Utilisation inconnue';
  }
};

export const getExpositionConsumptionLabels = (
  exposition: keyof typeof ExpositionLevel,
  entityType: 'cis' | 'sub'
) => {
  const consumptionLabel =
    entityType === 'cis'
      ? getExpositionConsumptionCis(exposition)
      : getExpositionConsumptionSub(exposition);

  return {
    consumptionLabel,
    expositionLabel: getExpositionDescription(exposition),
  };
};

export const getExpositionByLevelId = (level: number | null) => {
  switch (level) {
    case 1:
      return {
        expositionLevel: ExpositionLevel.VERYLOW,
        description: 'Utilisation très faible',
      };
    case 2:
      return { expositionLevel: ExpositionLevel.LOW, description: 'Utilisation faible' };
    case 3:
      return { expositionLevel: ExpositionLevel.MODERED, description: 'Utilisation modérée' };
    case 4:
      return { expositionLevel: ExpositionLevel.HIGH, description: 'Utilisation élevée' };
    case 5:
      return { expositionLevel: ExpositionLevel.VERYHIGH, description: 'Utilisation très élevée' };
    case 0:
    default:
      return { expositionLevel: ExpositionLevel.UKNOWN, description: 'Utilisation inconnue' };
  }
};

export const getMedicalErrorApparitionStep = (initialErrorId: number) => {
  switch (initialErrorId) {
    case 1:
      return MedicalErrorApparitionStep.PreparationStep;
    case 2:
      return MedicalErrorApparitionStep.DeliveranceStep;
    case 3:
      return MedicalErrorApparitionStep.PrescriptionStep;
    case 4:
      return MedicalErrorApparitionStep.AdministrationStep;
    case 6:
      return MedicalErrorApparitionStep.SurveillanceStep;
    case 5:
    default:
      return MedicalErrorApparitionStep.OtherStep;
  }
};

export const getRuptureTypeLabel = (ruptureId: number) => {
  switch (ruptureId) {
    case 1:
      return 'Rupture';
    case 2:
      return 'Risque de rupture de stock';
    case 4:
      return 'Arrêt de commercialisation';
    case 5:
    default:
      return 'Autre';
  }
};

export const getRuptureActionTypeDescription = (actionType: string) => {
  switch (actionType) {
    // "Avec mesure": "Situation ayant nécessité la mise en place d’une ou plusieurs mesures pour pallier ou pour éviter la rupture.",
    // "Sans mesure": "Situation n’ayant pas nécessité la mise en place de mesures palliatives.",

    case 'Restriction du circuit de distribution':
      return 'Restriction de la distribution aux pharmacies de ville ou aux pharmacies hospitalières.';
    case 'Contingentement qualitatif':
      return 'Mise en place d’une priorisation de l’utilisation du médicament pour certaines populations de patients en accord avec l’ANSM après consultation des associations de patients et professionnels de santé.';
    case 'Contingentement quantitatif':
      return 'Mise en place d’une distribution limitée en quantité pour permettre une répartition harmonieuse des stocks.';
    case 'Importation':
      return 'Importation de médicaments identiques ou similaires de l’étranger autorisée par l’ANSM.';
    case 'Flexibilité réglementaire':
      return 'Dérogation ponctuelle à la réglementation';
    case 'Mise à disposition':
      return "Mise à disposition d'un médicament produit sur le territoire français et initialement destiné à un autre pays.";
    case "Mise en place d'un stock de dépannage":
      return 'Réserve d’un stock très limité afin de répondre aux besoins urgents.';
    default:
      return '';
  }
};

export const getPublicationsTypeLabel = (publishTypeId: number) => {
  switch (publishTypeId) {
    case 1:
      return "Point d'information";
    case 3:
      return 'Communiqué';
    case 2:
    default:
      return 'Autre';
  }
};
