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
      return '< 500';
    case 'LOW':
      return '< 2 500';
    case 'MODERED':
      return '< 10 000';
    case 'HIGH':
      return '< 45 000';
    case 'VERYHIGH':
      return '>= 45 000';
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

export const getExpositionInfosByLevelId = (level: number | null) => {
  switch (level) {
    case 1:
      return {
        level: ExpositionLevel.VERYLOW,
        description: 'Utilisation très faible',
      };
    case 2:
      return { level: ExpositionLevel.LOW, description: 'Utilisation faible' };
    case 3:
      return { level: ExpositionLevel.MODERED, description: 'Utilisation modérée' };
    case 4:
      return { level: ExpositionLevel.HIGH, description: 'Utilisation élevée' };
    case 5:
      return { level: ExpositionLevel.VERYHIGH, description: 'Utilisation très élevée' };
    case 0:
    default:
      return { level: ExpositionLevel.UKNOWN, description: 'Utilisation inconnue' };
  }
};

export const getMedicalErrorApparitionStep = (initialErrorId: number) => {
  switch (initialErrorId) {
    case 1:
      return MedicalErrorApparitionStep.AdministrationStep;
    case 2:
      return MedicalErrorApparitionStep.PreparationStep;
    case 3:
      return MedicalErrorApparitionStep.PrescriptionStep;
    case 4:
      return MedicalErrorApparitionStep.DeliveranceStep;
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
