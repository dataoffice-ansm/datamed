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
import ContigentementQualitatif from '../assets/images/actions/contigetement-qualitatif.svg';
import ContigentementQuantitatif from '../assets/images/actions/contigetement-quantitatif.svg';
import FlexibiliteReglementaire from '../assets/images/actions/flexibilite-reglementaire.svg';
import Importation from '../assets/images/actions/importation.svg';
import MiseEnPlaceStock from '../assets/images/actions/mise-en-place-stock-depannage.svg';
import RestrictionCircuitDistribution from '../assets/images/actions/restriction-circuit-distribution.svg';
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

export const getNotifierFigureByIdJob = (id: number) => {
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

export const getNotifierFigureByNameJob = (name: string) => {
  switch (name) {
    case 'Autre professionnel de santé':
      return <OtherDoctorFigure className="w-32" />;
    case 'Infirmière':
      return <NurseFigure className="w-32" />;
    case 'Juriste':
      return <JuristeFigure className="w-32" />;
    case 'Médecin généraliste':
      return <DoctorFigure className="w-32" />;
    case 'Médecin spécialiste':
      return <SpecialistFigure className="w-32" />;
    case 'Non professionnel de santé':
      return <PatientFigure className="w-32" />;
    case 'Pharmacien':
      return <PharmacistFigure className="w-32" />;
    default:
      return <OtherDoctorFigure className="w-32" />;
  }
};

// eslint-disable-next-line complexity
export const getFigureBySideIdEffectPathology = (id: number) => {
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

export const getFigureBySideNameEffectPathology = (name: string) => {
  switch (name) {
    case 'Affections cardiaques':
      return <AffectionsCardiaquesFigure className="w-32" />;
    case 'Affections de la peau et du tissu sous-cutané':
      return <AffectionPeauFigure className="w-32" />;
    case 'Affections du rein et des voies urinaires':
      return <AffectionsReinFigure className="w-32" />;
    case 'Affections du système nerveux':
      return <AffectionsNerveuxFigure className="w-32" />;
    case 'Affections gastro-intestinales':
      return <AffectionGastroFigure className="w-32" />;
    case 'Affections hématologiques et du système lymphatique':
      return <AffectionHematologiqueFigure className="w-32" />;
    case 'Affections hépatobiliaires':
      return <AffectionHepatobilaireFigure className="w-32" />;
    case 'Affections musculosquelettiques et du tissu conjonctif':
      return <AffectionMusculosquelettiquesFigure className="w-32" />;
    case 'Affections psychiatriques':
      return <AffectionPsychiatriquesFigure className="w-32" />;
    case 'Affections respiratoires, thoraciques et médiastinales':
      return <AffectionRespiratoiresFigure className="w-32" />;
    case 'Affections vasculaires':
      return <AffectionVasculaireFigure className="w-32" />;
    case 'Investigations':
      return <InvestigationsFigure className="w-32" />;
    case "Lésions, intoxications et complications d'interventions":
      return <LesionsFigure className="w-32" />;
    case 'Troubles du métabolisme et de la nutrition':
      return <TroublesMetabolismeFigure className="w-32" />;
    case "Troubles généraux et anomalies au site d'administration":
      return <TroublesGenerauxFigure className="w-32" />;
    case "Affections de l'oreille et du labyrinthe":
      return <AffectionOreilleFigure className="w-32" />;
    case 'Affections des organes de reproduction et du sein':
      return <AffectionOrganeFigure className="w-32" />;
    case 'Affections du système immunitaire':
      return <AffectionSystemeImmuFigure className="w-32" />;
    case 'Affections endocriniennes':
      return <AffectionEndocriFigure className="w-32" />;
    case 'Affections oculaires':
      return <AffectionsOculaireFigure className="w-32" />;
    case 'Infections et infestations':
      return <InfectionFigure className="w-32" />;
    case 'Problèmes de produit':
      return <ProblemeFigure className="w-32" />;
    case 'Affections congénitales, familiales et génétiques':
      return <AffectionCongenitalesFigure className="w-32" />;
    case 'Tumeurs bénignes, malignes et non précisées (incl kystes et polypes)':
      return <TumeursBenignesFigure className="w-32" />;
    case 'Actes médicaux et chirurgicaux':
      return <ActeMedicauxFigure className="w-32" />;
    case 'Affections gravidiques, puerpérales et périnatales':
      return <AffectionGravidiquesFigure className="w-32" />;
    case 'Caractéristiques socio-environnementales':
      return <CaracteristiqueSocioFigure className="w-32" />;
    default:
      return <NotFoundFigure className="w-32" />;
  }
};

export const getFigureByActionName = (name: string) => {
  switch (name) {
    case 'Contingentement quantitatif':
      return <ContigentementQuantitatif className="w-32" />;
    case 'Contingentement qualitatif':
      return <ContigentementQualitatif className="w-32" />;
    case 'Restriction du circuit de distribution':
      return <RestrictionCircuitDistribution className="w-32" />;
    case "Mise en place d'un stock de dépannage":
      return <MiseEnPlaceStock className="w-32" />;
    case 'Flexibilité réglementaire':
      return <FlexibiliteReglementaire className="w-32" />;
    case 'Importation':
      return <Importation className="w-32" />;
    default:
      return <NotFoundFigure className="w-32" />;
  }
};
