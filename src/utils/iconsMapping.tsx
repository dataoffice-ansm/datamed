import React from 'react';
import { type Maybe, MedicalErrorNature } from '../graphql/__generated__/generated-documents';

import ErrorAdministration from '../assets/pictos/errors/errorAdministration.svg';
import ErrorDelivrance from '../assets/pictos/errors/errorDelivrance.svg';
import ErrorSuiviTherapeutique from '../assets/pictos/errors/errorSuivitherapeutique.svg';
import ErrorOther from '../assets/pictos/errors/errorOther.svg';
import ErrorPreparation from '../assets/pictos/errors/errorPreparation.svg';
import ErrorPrescription from '../assets/pictos/errors/errorPrescription.svg';
import PublicationOtherSVG from '../assets/pictos/publications/other.svg';
import PublicationSpeakSVG from '../assets/pictos/publications/speak.svg';
import PublicationInfoSVG from '../assets/pictos/publications/info.svg';
import OtherDoctorFigure from '../assets/pictos/notifiers/0.svg';
import NurseFigure from '../assets/pictos/notifiers/2.svg';
import JuristeFigure from '../assets/pictos/notifiers/8.svg';
import DoctorFigure from '../assets/pictos/notifiers/3.svg';
import SpecialistFigure from '../assets/pictos/notifiers/4.svg';
import PatientFigure from '../assets/pictos/notifiers/5.svg';
import PharmacistFigure from '../assets/pictos/notifiers/6.svg';
import AffectionsCardiaquesFigure from '../assets/pictos/pathology/0.svg';
import AffectionPeauFigure from '../assets/pictos/pathology/1.svg';
import AffectionsReinFigure from '../assets/pictos/pathology/2.svg';
import AffectionsNerveuxFigure from '../assets/pictos/pathology/3.svg';
import AffectionGastroFigure from '../assets/pictos/pathology/4.svg';
import AffectionHematologiqueFigure from '../assets/pictos/pathology/5.svg';
import AffectionHepatobilaireFigure from '../assets/pictos/pathology/6.svg';
import AffectionMusculosquelettiquesFigure from '../assets/pictos/pathology/7.svg';
import AffectionPsychiatriquesFigure from '../assets/pictos/pathology/8.svg';
import AffectionRespiratoiresFigure from '../assets/pictos/pathology/9.svg';
import AffectionVasculaireFigure from '../assets/pictos/pathology/10.svg';
import InvestigationsFigure from '../assets/pictos/pathology/11.svg';
import LesionsFigure from '../assets/pictos/pathology/12.svg';
import TroublesMetabolismeFigure from '../assets/pictos/pathology/13.svg';
import TroublesGenerauxFigure from '../assets/pictos/pathology/14.svg';
import AffectionOreilleFigure from '../assets/pictos/pathology/15.svg';
import AffectionOrganeFigure from '../assets/pictos/pathology/16.svg';
import AffectionSystemeImmuFigure from '../assets/pictos/pathology/17.svg';
import AffectionEndocriFigure from '../assets/pictos/pathology/18.svg';
import AffectionsOculaireFigure from '../assets/pictos/pathology/19.svg';
import InfectionFigure from '../assets/pictos/pathology/20.svg';
import ProblemeFigure from '../assets/pictos/pathology/21.svg';
import AffectionCongenitalesFigure from '../assets/pictos/pathology/22.svg';
import TumeursBenignesFigure from '../assets/pictos/pathology/23.svg';
import ActeMedicauxFigure from '../assets/pictos/pathology/24.svg';
import AffectionGravidiquesFigure from '../assets/pictos/pathology/25.svg';
import CaracteristiqueSocioFigure from '../assets/pictos/pathology/26.svg';
import ContigentementQualitatif from '../assets/pictos/actions/contigetement-qualitatif.svg';
import ContigentementQuantitatif from '../assets/pictos/actions/contigetement-quantitatif.svg';
import FlexibiliteReglementaire from '../assets/pictos/actions/flexibilite-reglementaire.svg';
import Importation from '../assets/pictos/actions/importation.svg';
import MiseEnPlaceStock from '../assets/pictos/actions/mise-en-place-stock-depannage.svg';
import RestrictionCircuitDistribution from '../assets/pictos/actions/restriction-circuit-distribution.svg';
import Notfound from '../assets/pictos/indice-nodata.svg';
import ArretCommerceSvg from '../assets/pictos/causes/arret-commercialisation.svg';
import AnalyseLiberationNonConformesSvg from '../assets/pictos/causes/analyses-de-liberation-non-conformes.svg';
import AnalyseNonConformeSvg from '../assets/pictos/causes/analyse-non-conforme.svg';
import AugmentationVolumesVenteSvg from '../assets/pictos/causes/augmentation-volumes-vente.svg';
import AutreSvg from '../assets/pictos/causes/autre.svg';
import CapaciteProductionInsuffisante from '../assets/pictos/causes/capacite-production-insuffisante.svg';
import Coronavirus from '../assets/pictos/causes/coronavirus.svg';
import DefautApprovisionnementSvg from '../assets/pictos/causes/defaut-approvisionnement.svg';
import DefautApprovisionnementMpSvg from '../assets/pictos/causes/defaut-approvisionnement-mp.svg';
import DefautQualiteSvg from '../assets/pictos/causes/defaut-qualite-produit-fini.svg';
import IncidentProductionSvg from '../assets/pictos/causes/incident-production.svg';
import MiseADispositionSvg from '../assets/pictos/causes/mise-a-disposition.svg';
import NonConformeSvg from '../assets/pictos/causes/non-conformite-bpf.svg';
import ProblemeTransportSvg from '../assets/pictos/causes/probleme-transport-logistique.svg';
import TransfertSiteSvg from '../assets/pictos/causes/transfert-site.svg';
import DifficulteReglementSvg from '../assets/pictos/causes/difficulte-reglementaire.svg';

export const getMedicinalErrorNatureIcon = (errorInitial?: Maybe<MedicalErrorNature>) => {
  switch (errorInitial) {
    case MedicalErrorNature.PreparationError:
      return <ErrorPreparation className="w-32" />;
    case MedicalErrorNature.DeliveranceError:
      return <ErrorDelivrance className="w-32" />;
    case MedicalErrorNature.PrescriptionError:
      return <ErrorPrescription className="w-32" />;
    case MedicalErrorNature.AdministrationError:
      return <ErrorAdministration className="w-32" />;
    case MedicalErrorNature.TherapeuticCareError:
      return <ErrorSuiviTherapeutique className="w-32" />;
    case MedicalErrorNature.OtherError:
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

export const getNotifierIcon = (id: number) => {
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

export const getNotifierIconByJobName = (name: string) => {
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
export const getSideEffectPathologyIcon = (id: number) => {
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
      return <Notfound className="w-32" />;
  }
};

export const getDeclarationActionIcon = (name: string) => {
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
      return <Notfound className="w-32" />;
  }
};

export const getRuptureCauseIcon = (name: string) => {
  switch (name) {
    case 'Incident de production':
      return <IncidentProductionSvg className="w-32" />;
    case 'Augmentation du volume de vente':
      return <AugmentationVolumesVenteSvg className="w-32" />;
    case 'Autre':
      return <AutreSvg className="w-32" />;
    case 'Transfert de site':
      return <TransfertSiteSvg className="w-32" />;
    case 'Capacité de production insuffisante':
      return <CapaciteProductionInsuffisante className="w-32" />;
    case 'Défaut qualité produit fini':
      return <DefautQualiteSvg className="w-32" />;
    case 'Difficulté réglementaire':
      return <DifficulteReglementSvg className="w-32" />;
    case "Défaut d'approvisionnement MP/AC":
      return <DefautApprovisionnementMpSvg className="w-32" />;
    case 'Analyses de libération non conformes':
      return <AnalyseLiberationNonConformesSvg className="w-32" />;
    case 'Problème de transport/logistique':
      return <ProblemeTransportSvg className="w-32" />;
    case 'Arrêt de commercialisation':
      return <ArretCommerceSvg className="w-32" />;
    case 'Coronavirus':
      return <Coronavirus className="w-32" />;
    case "Défaut d'approvisionnement en Matière Première":
      return <AutreSvg className="w-32" />;
    case 'Problème qualité : Analyse non conforme':
      return <AnalyseNonConformeSvg className="w-32" />;
    case "Défaut d'approvisionnement en Article de Conditionnement":
      return <DefautApprovisionnementSvg className="w-32" />;

    case 'Problème qualité : Non conformité aux BPF':
      return <NonConformeSvg className="w-32" />;
    default:
      return <MiseADispositionSvg className="w-32" />;
  }
};
