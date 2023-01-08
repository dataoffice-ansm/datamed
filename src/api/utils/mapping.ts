import {
  MedicalErrorApparitionStep,
  MedicalErrorNature,
} from '../graphql/__generated__/generated-types';
import { ExpositionLevel } from '../graphql/enums';

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
    case 0:
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
        label:
          'Erreur médicamenteuse survenant à l’étape de l’administration du médicament à un patient, quel qu’en soit l’auteur, y compris le patient lui-même, appréciée par toute déviation par rapport à la prescription, ou par rapport aux termes de l’Autorisation de Mise sur le Marché (RCP, notice).',
      };
    case 5:
      return {
        step: MedicalErrorApparitionStep.AfterSurveillanceStep,
        description:
          'Erreur médicamenteuse survenant après (à la suite ou à distance de l’étape d’administration) la mise en œuvre d’un traitement médicamenteux et concernant tout acte de soin relatif à la surveillance du médicament.',
      };
    default:
      return {
        step: MedicalErrorApparitionStep.OtherStep,
        description: 'Autre erreur médicamenteuse.',
      };
  }
};

export const getMedicalErrorNatureByNatureId = (natureErrorId: number) => {
  switch (natureErrorId) {
    case 0:
      return MedicalErrorNature.PreparationError;
    case 1:
      return MedicalErrorNature.DeliveranceError;
    case 2:
      return MedicalErrorNature.PrescriptionError;
    case 3:
      return MedicalErrorNature.AdministrationError;
    case 5:
      return MedicalErrorNature.TherapeuticCareError;
    default:
      return MedicalErrorNature.OtherError;
  }
};

//TODO end this + export FormType as union type
export const getPharmaFormTypeByLabel = (source: string) => {
  const findWordInText = (words: string[]) => words.some((w) => source.includes(w));

  if (findWordInText(['comprimé'])) {
    return 'caps';
  }

  if (findWordInText(['gélule'])) {
    return 'gelule';
  }

  if (findWordInText(['gel'])) {
    return 'gel';
  }

  if (findWordInText(['gel'])) {
    return 'gel';
  }

  if (findWordInText(['poudre'])) {
    return 'poudre';
  }

  if (findWordInText(['pansement'])) {
    return 'pansement';
  }

  if (findWordInText(['spray'])) {
    return 'spray';
  }

  if (findWordInText(['sirop'])) {
    return 'sirop';
  }

  if (findWordInText(['buvable'])) {
    return 'buvable';
  }

  if (findWordInText(['supositoire'])) {
    return 'supositoire';
  }

  return 'other';
};
