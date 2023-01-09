import {
  MedicalErrorApparitionStep,
  MedicalErrorNature,
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

export const getCisExpositionByLevelId = (level: number | null) => {
  switch (level) {
    case 1:
      return { level: ExpositionLevel.VERYLOW, description: 'Utilisation très faible' };
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
      return {
        step: MedicalErrorApparitionStep.SecondPrescriptionStep,
        description:
          'Erreur médicamenteuse survenue à la 2ème étape du circuit du médicament sous la responsabilité du pharmacien, qui comprend l’analyse pharmaceutique de l’ordonnance si elle existe, la préparation éventuelle des doses à administrer, la mise à disposition d’informations et conseils nécessaires au bon usage du médicament ainsi que la délivrance en elle-même.',
      };
    case 2:
      return {
        step: MedicalErrorApparitionStep.FirstPrescriptionStep,
        description:
          'Erreur médicamenteuse survenant à la 1ère étape du circuit du médicament, c’est-à-dire de l’ensemble des activités assurées par un prescripteur habilité et aboutissant à la rédaction d’une prescription.',
      };
    case 3:
      return {
        step: MedicalErrorApparitionStep.AdministrationStep,
        description:
          'Erreur médicamenteuse survenant à l’étape de l’administration du médicament à un patient, quel qu’en soit l’auteur, y compris le patient lui-même, appréciée par toute déviation par rapport à la prescription, ou par rapport aux termes de l’Autorisation de Mise sur le Marché (RCP, notice).',
      };
    case 5:
      return {
        step: MedicalErrorApparitionStep.AfterSurveillanceStep,
        description:
          'Erreur médicamenteuse survenant après (à la suite ou à distance de l’étape d’administration) la mise en œuvre d’un traitement médicamenteux et concernant tout acte de soin relatif à la surveillance du médicament.',
      };
    case 5:
    default:
      return {
        step: MedicalErrorApparitionStep.OtherStep,
        description: 'Autre erreur médicamenteuse.',
      };
  }
};
