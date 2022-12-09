import ErrorAdministration from '../assets/images/errorAdministration.svg';
import ErrorDelivrance from '../assets/images/errorDelivrance.svg';
import ErrorSuiviTherapeutique from '../assets/images/errorSuivitherapeutique.svg';
import ErrorOther from '../assets/images/errorOther.svg';
import ErrorPreparation from '../assets/images/errorPreparation.svg';
import ErrorPrescription from '../assets/images/errorPrescription.svg';
import PublicationOtherSVG from '../assets/icons/publications/other.svg';
import PublicationSpeakSVG from '../assets/icons/publications/speak.svg';
import PublicationInfoSVG from '../assets/icons/publications/info.svg';
import OtherDoctorFigure from '../assets/images/notifiers/0.svg';
import NurseFigure from '../assets/images/notifiers/2.svg';
import JuristeFigure from '../assets/images/notifiers/8.svg';
import DoctorFigure from '../assets/images/notifiers/3.svg';
import SpecialistFigure from '../assets/images/notifiers/4.svg';
import PatientFigure from '../assets/images/notifiers/5.svg';
import PharmacistFigure from '../assets/images/notifiers/6.svg';
import AffectionsCardiaquesFigure from '../assets/images/pathology/0.svg';
import AffectionPeauFigure from '../assets/images/pathology/1.svg';
import AffectionsReinFigure from '../assets/images/pathology/2.svg';
import AffectionsNerveuxFigure from '../assets/images/pathology/3.svg';
import AffectionGastroFigure from '../assets/images/pathology/4.svg';
import AffectionHematologiqueFigure from '../assets/images/pathology/5.svg';
import AffectionHepatobilaireFigure from '../assets/images/pathology/6.svg';
import AffectionMusculosquelettiquesFigure from '../assets/images/pathology/7.svg';
import AffectionPsychiatriquesFigure from '../assets/images/pathology/8.svg';
import AffectionRespiratoiresFigure from '../assets/images/pathology/9.svg';
import AffectionVasculaireFigure from '../assets/images/pathology/10.svg';
import InvestigationsFigure from '../assets/images/pathology/11.svg';
import LesionsFigure from '../assets/images/pathology/12.svg';
import TroublesMetabolismeFigure from '../assets/images/pathology/13.svg';
import TroublesGenerauxFigure from '../assets/images/pathology/14.svg';
import AffectionOreilleFigure from '../assets/images/pathology/15.svg';
import AffectionOrganeFigure from '../assets/images/pathology/16.svg';
import AffectionSystemeImmuFigure from '../assets/images/pathology/17.svg';
import AffectionEndocriFigure from '../assets/images/pathology/18.svg';
import AffectionsOculaireFigure from '../assets/images/pathology/19.svg';
import InfectionFigure from '../assets/images/pathology/20.svg';
import ProblemeFigure from '../assets/images/pathology/21.svg';
import AffectionCongenitalesFigure from '../assets/images/pathology/22.svg';
import TumeursBenignesFigure from '../assets/images/pathology/23.svg';
import ActeMedicauxFigure from '../assets/images/pathology/24.svg';
import AffectionGravidiquesFigure from '../assets/images/pathology/25.svg';
import CaracteristiqueSocioFigure from '../assets/images/pathology/26.svg';
import NotFoundFigure from '../assets/images/notfound.svg';
import React from 'react';

export const cisExpositionLevelMapping = {
  0: 'Utilisation inconnue',
  1: 'Utilisation très faible',
  2: 'Utilisation faible',
  3: 'Utilisation modérée',
  4: 'Utilisation élevée',
  5: 'Utilisation très élevée',
};

export const getCisErrorMedNatureIconMapping = (errorInitialId: number) => {
  switch (errorInitialId) {
    case 0:
      return <ErrorPreparation className="w-32" />;
    case 1:
      return <ErrorDelivrance className="w-32" />;
    case 2:
      return <ErrorPrescription className="w-32" />;
    case 3:
      return <ErrorAdministration className="w-32" />;
    case 5:
      return <ErrorSuiviTherapeutique className="w-32" />;
    default:
      return <ErrorOther className="w-32" />;
  }
};

export const getPublicationIcon = (publicationTypeId: number) => {
  switch (publicationTypeId) {
    case 1:
      return <PublicationOtherSVG className="w-32" />;
    case 3:
      return <PublicationSpeakSVG className="w-32" />;
    default:
      return <PublicationInfoSVG className="w-32" />;
  }
};

export const getNotifierFigureByJob = (id: number) => {
  switch (id) {
    case 0:
      return <OtherDoctorFigure className="w-32" />;
    case 1:
      return <NurseFigure className="w-32" />;
    case 2:
      return <JuristeFigure className="w-32" />;
    case 3:
      return <DoctorFigure className="w-32" />;
    case 4:
      return <SpecialistFigure className="w-32" />;
    case 5:
      return <PatientFigure className="w-32" />;
    case 6:
      return <PharmacistFigure className="w-32" />;
    default:
      return <OtherDoctorFigure className="w-32" />;
  }
};

// eslint-disable-next-line complexity
export const getFigureBySideEffectPathology = (id: number) => {
  switch (id) {
    case 0:
      return <AffectionsCardiaquesFigure className="w-32" />;
    case 1:
      return <AffectionPeauFigure className="w-32" />;
    case 2:
      return <AffectionsReinFigure className="w-32" />;
    case 3:
      return <AffectionsNerveuxFigure className="w-32" />;
    case 4:
      return <AffectionGastroFigure className="w-32" />;
    case 5:
      return <AffectionHematologiqueFigure className="w-32" />;
    case 6:
      return <AffectionHepatobilaireFigure className="w-32" />;
    case 7:
      return <AffectionMusculosquelettiquesFigure className="w-32" />;
    case 8:
      return <AffectionPsychiatriquesFigure className="w-32" />;
    case 9:
      return <AffectionRespiratoiresFigure className="w-32" />;
    case 10:
      return <AffectionVasculaireFigure className="w-32" />;
    case 11:
      return <InvestigationsFigure className="w-32" />;
    case 12:
      return <LesionsFigure className="w-32" />;
    case 13:
      return <TroublesMetabolismeFigure className="w-32" />;
    case 14:
      return <TroublesGenerauxFigure className="w-32" />;
    case 15:
      return <AffectionOreilleFigure className="w-32" />;
    case 16:
      return <AffectionOrganeFigure className="w-32" />;
    case 17:
      return <AffectionSystemeImmuFigure className="w-32" />;
    case 18:
      return <AffectionEndocriFigure className="w-32" />;
    case 19:
      return <AffectionsOculaireFigure className="w-32" />;
    case 20:
      return <InfectionFigure className="w-32" />;
    case 21:
      return <ProblemeFigure className="w-32" />;
    case 22:
      return <AffectionCongenitalesFigure className="w-32" />;
    case 23:
      return <TumeursBenignesFigure className="w-32" />;
    case 24:
      return <ActeMedicauxFigure className="w-32" />;
    case 25:
      return <AffectionGravidiquesFigure className="w-32" />;
    case 26:
      return <CaracteristiqueSocioFigure className="w-32" />;
    default:
      return <NotFoundFigure className="w-32" />;
  }
};
