import {
  ExpositionLevel,
  MedicalErrorApparitionStep, MedicalErrorNature,
} from '../graphql/__generated__/generated-types';
import { type Maybe } from '../../graphql/__generated__/generated-documents';

export const getCisExpositionLevelMapping = (level: number) => {
  switch (level) {
    case 1:
      return ExpositionLevel.Verylow;
    case 2:
      return ExpositionLevel.Low;
    case 3:
      return ExpositionLevel.Modered;
    case 4:
      return ExpositionLevel.High;
    case 5:
      return ExpositionLevel.Veryhigh;
    case 0:
    default:
      return ExpositionLevel.Uknown;
  }
};

export const getCisExpositionLevelLabelMapping = (level?: Maybe<ExpositionLevel>) => {
  switch (level) {
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
    case 'UKNOWN':
    default:
      return 'Utilisation inconnue';
  }
};

export const getMedicalErrorApparitionStepMapping = (errorInitialId: number) => {
  switch (errorInitialId) {
    case 0:
    case 1:
      return MedicalErrorApparitionStep.SecondPrescriptionStep;
    case 2:
      return MedicalErrorApparitionStep.FirstPrescriptionStep;
    case 3:
      return MedicalErrorApparitionStep.AdministrationStep;
    case 5:
      return MedicalErrorApparitionStep.AfterSurveillanceStep;
    default:
      return MedicalErrorApparitionStep.OtherStep;
  }
};

export const getMedicalErrorApparitionStepLabelMapping = (
  errorInitial?: Maybe<MedicalErrorApparitionStep>
) => {
  switch (errorInitial) {
    case MedicalErrorApparitionStep.SecondPrescriptionStep:
      return 'Erreur médicamenteuse survenue à la 2ème étape du circuit du médicament sous la responsabilité du pharmacien, qui comprend l’analyse pharmaceutique de l’ordonnance si elle existe, la préparation éventuelle des doses à administrer, la mise à disposition d’informations et conseils nécessaires au bon usage du médicament ainsi que la délivrance en elle-même.';
    case MedicalErrorApparitionStep.FirstPrescriptionStep:
      return 'Erreur médicamenteuse survenant à la 1ère étape du circuit du médicament, c’est-à-dire de l’ensemble des activités assurées par un prescripteur habilité et aboutissant à la rédaction d’une prescription.';
    case MedicalErrorApparitionStep.AdministrationStep:
      return 'Erreur médicamenteuse survenant à l’étape de l’administration du médicament à un patient, quel qu’en soit l’auteur, y compris le patient lui-même, appréciée par toute déviation par rapport à la prescription, ou par rapport aux termes de l’Autorisation de Mise sur le Marché (RCP, notice).';
    case MedicalErrorApparitionStep.AfterSurveillanceStep:
      return 'Erreur médicamenteuse survenant après (à la suite ou à distance de l’étape d’administration) la mise en œuvre d’un traitement médicamenteux et concernant tout acte de soin relatif à la surveillance du médicament.';
    case MedicalErrorApparitionStep.OtherStep:
    default:
      return 'Autre erreur médicamenteuse.';
  }
};


export const getMedicalErrorNatureMapping = (errorNatureId: number) => {
  switch (errorNatureId) {
    case 0:
      return MedicalErrorNature.PreparationError
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
