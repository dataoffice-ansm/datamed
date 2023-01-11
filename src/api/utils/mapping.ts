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

export const getExpositionByLevelId = (level: number | null) => {
  switch (level) {
    case 1:
      return { expositionLevel: ExpositionLevel.VERYLOW, description: 'Utilisation très faible' };
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
