import React from 'react';
import { type PharmaFormType } from '../graphql/__generated__/generated-documents';

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
import JuristeFigure from '../assets/pictos/notifiers/8.svg';
import DoctorFemaleFigure from '../assets/pictos/notifiers/doctor_female_150.svg';
import DentistFigure from '../assets/pictos/notifiers/dentist_male_150.svg';
import NurseFemaleFigure from '../assets/pictos/notifiers/nurse_150.svg';
import SpecialistFigure from '../assets/pictos/notifiers/specialist_150.svg';
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
import NoAction from '../assets/pictos/actions/no-action.svg';
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
import DefautApprovisionnementMpAcSvg from '../assets/pictos/causes/defaut-approvisionnement-mpac.svg';
import DefautQualiteSvg from '../assets/pictos/causes/defaut-qualite-produit-fini.svg';
import IncidentProductionSvg from '../assets/pictos/causes/incident-production.svg';
import MiseADispositionSvg from '../assets/pictos/causes/mise-a-disposition.svg';
import NonConformeSvg from '../assets/pictos/causes/non-conformite-bpf.svg';
import ProblemeTransportSvg from '../assets/pictos/causes/probleme-transport-logistique.svg';
import TransfertSiteSvg from '../assets/pictos/causes/transfert-site.svg';
import DifficulteReglementSvg from '../assets/pictos/causes/difficulte-reglementaire.svg';

import PharmaFormOther from '../assets/pictos/pharmaForm/Autre-120.svg';
import PharmaFormCollyre from '../assets/pictos/pharmaForm/Collyre-120.svg';
import PharmaFormCap from '../assets/pictos/pharmaForm/Comprimé-120.svg';
import PharmaFormCreme from '../assets/pictos/pharmaForm/Creme-120.svg';
import PharmaFormGaz from '../assets/pictos/pharmaForm/Gaz-120.svg';
import PharmaFormGelule from '../assets/pictos/pharmaForm/Gélule-120.svg';
import PharmaFormGranule from '../assets/pictos/pharmaForm/Granules-120.svg';
import PharmaFormImplant from '../assets/pictos/pharmaForm/Implant-120.svg';
import PharmaFormLiquide from '../assets/pictos/pharmaForm/Liquide-120.svg';
import PharmaFormMulti from '../assets/pictos/pharmaForm/Multi-120.svg';
import PharmaFormPansement from '../assets/pictos/pharmaForm/Pansement-120.svg';
import PharmaFormPoudre from '../assets/pictos/pharmaForm/Poudre-120.svg';
import PharmaFormSeringue from '../assets/pictos/pharmaForm/Seringue-120.svg';
import PharmaFormSirop from '../assets/pictos/pharmaForm/Sirop-120.svg';
import PharmaFormSpray from '../assets/pictos/pharmaForm/Spray-120.svg';
import PharmaFormSuppositoire from '../assets/pictos/pharmaForm/Suppositoire-120.svg';
import { MedicalErrorApparitionStep } from '../graphql/__generated__/generated-documents';

export const getPharmaFormIcon = (pharmaForm: PharmaFormType) => {
  switch (pharmaForm) {
    case 'COLLYRE':
      return <PharmaFormCollyre />;
    case 'CREME':
      return <PharmaFormCreme />;
    case 'COMPRIME':
      return <PharmaFormCap />;
    case 'LIQUIDE':
      return <PharmaFormLiquide />;
    case 'GAZ':
      return <PharmaFormGaz />;
    case 'GRANULE':
      return <PharmaFormGranule />;
    case 'GELULE':
      return <PharmaFormGelule />;
    case 'POUDRE':
      return <PharmaFormPoudre />;
    case 'IMPLANT':
      return <PharmaFormImplant />;
    case 'SERINGUE':
      return <PharmaFormSeringue />;
    case 'PANSEMENT':
      return <PharmaFormPansement />;
    case 'SIROP':
      return <PharmaFormSirop />;
    case 'SUPOSITOIRE':
      return <PharmaFormSuppositoire />;
    case 'SPRAY':
      return <PharmaFormSpray />;
    case 'MULTI':
      return <PharmaFormMulti />;
    case 'AUTRE':
    default:
      return <PharmaFormOther />;
  }
};

export const getMedErrorApparitionStepIcon = (apparitionStep: MedicalErrorApparitionStep) => {
  switch (apparitionStep) {
    case MedicalErrorApparitionStep.PreparationStep:
      return <ErrorPreparation className="w-24 md:w-32" />;
    case MedicalErrorApparitionStep.DeliveranceStep:
      return <ErrorDelivrance className="w-24 md:w-32" />;
    case MedicalErrorApparitionStep.PrescriptionStep:
      return <ErrorPrescription className="w-24 md:w-32" />;
    case MedicalErrorApparitionStep.AdministrationStep:
      return <ErrorAdministration className="w-24 md:w-32" />;
    case MedicalErrorApparitionStep.SurveillanceStep:
      return <ErrorSuiviTherapeutique className="w-24 md:w-32" />;
    case MedicalErrorApparitionStep.OtherStep:
    default:
      return <ErrorOther className="w-24 md:w-32" />;
  }
};

export const getPublicationIcon = (publicationTypeId: number) => {
  switch (publicationTypeId) {
    case 1:
      return <PublicationOtherSVG className="w-24 md:w-32" />;
    case 3:
      return <PublicationSpeakSVG className="w-24 md:w-32" />;
    default:
      return <PublicationInfoSVG className="w-24 md:w-32" />;
  }
};

export const getNotifierIcon = (id: number) => {
  switch (id) {
    case 2:
      return <PatientFigure className="w-24 md:w-32" />;
    case 3:
      return <DoctorFemaleFigure className="w-24 md:w-32" />;
    case 4:
      return <PharmacistFigure className="w-24 md:w-32" />;
    case 6:
      return <JuristeFigure className="w-24 md:w-32" />;
    // TODO en BDD
    // case 5:
    //   return <SpecialistFigure className="w-24 md:w-32" />;
    // case 5:
    //   return <NurseFemaleFigure className="w-24 md:w-32" />;
    // case 5:
    //   return <DentistFigure className="w-24 md:w-32" />;
    case 1:
    default:
      return <OtherDoctorFigure className="w-24 md:w-32" />;
  }
};

// TODO: replace with enum
// eslint-disable-next-line complexity
export const getSideEffectPathologyIcon = (id: number) => {
  switch (id) {
    case 1:
      return <ActeMedicauxFigure className="w-24 md:w-32" />;
    case 2:
    case 30:
      return <AffectionsCardiaquesFigure className="w-24 md:w-32" />;
    case 3:
      return <AffectionOreilleFigure className="w-24 md:w-32" />;
    case 4:
      return <AffectionPeauFigure className="w-24 md:w-32" />;
    case 5:
      return <AffectionOrganeFigure className="w-24 md:w-32" />;
    case 6:
      return <AffectionsReinFigure className="w-24 md:w-32" />;
    case 7:
      return <AffectionSystemeImmuFigure className="w-24 md:w-32" />;
    case 8:
    case 28:
      return <AffectionsNerveuxFigure className="w-24 md:w-32" />;
    case 9:
    case 31:
      return <AffectionEndocriFigure className="w-24 md:w-32" />;
    case 10:
      return <AffectionGastroFigure className="w-24 md:w-32" />;
    case 11:
      return <AffectionHematologiqueFigure className="w-24 md:w-32" />;
    case 12:
      return <AffectionHepatobilaireFigure className="w-24 md:w-32" />;
    case 13:
    case 34:
      return <AffectionMusculosquelettiquesFigure className="w-24 md:w-32" />;
    case 14:
    case 33:
      return <AffectionsOculaireFigure className="w-24 md:w-32" />;
    case 15:
    case 29:
    case 32:
      return <AffectionPsychiatriquesFigure className="w-24 md:w-32" />;
    case 16:
      return <AffectionRespiratoiresFigure className="w-24 md:w-32" />;
    case 17:
      return <AffectionVasculaireFigure className="w-24 md:w-32" />;
    case 18:
      return <CaracteristiqueSocioFigure className="w-24 md:w-32" />;
    case 19:
      return <InfectionFigure className="w-24 md:w-32" />;
    case 20:
      return <InvestigationsFigure className="w-24 md:w-32" />;
    case 21:
      return <LesionsFigure className="w-24 md:w-32" />;
    case 22:
      return <ProblemeFigure className="w-24 md:w-32" />;
    case 23:
      return <TroublesMetabolismeFigure className="w-24 md:w-32" />;
    case 24:
      return <TroublesGenerauxFigure className="w-24 md:w-32" />;
    case 25:
      return <TumeursBenignesFigure className="w-24 md:w-32" />;
    case 26:
      return <AffectionCongenitalesFigure className="w-24 md:w-32" />;
    case 27:
      return <AffectionGravidiquesFigure className="w-24 md:w-32" />;
    default:
      return <Notfound className="w-24 md:w-32" />;
  }
};

// eslint-disable-next-line complexity
export const getSideEffectPathologyIconByName = (name: string) => {
  switch (name) {
    case 'Affections cardiaques':
      return <AffectionsCardiaquesFigure className="w-24 md:w-32" />;
    case 'Affections de la peau et du tissu sous-cutané':
      return <AffectionPeauFigure className="w-24 md:w-32" />;
    case 'Affections du rein et des voies urinaires':
      return <AffectionsReinFigure className="w-24 md:w-32" />;
    case 'Affections du système nerveux':
      return <AffectionsNerveuxFigure className="w-24 md:w-32" />;
    case 'Affections gastro-intestinales':
      return <AffectionGastroFigure className="w-24 md:w-32" />;
    case 'Affections hématologiques et du système lymphatique':
      return <AffectionHematologiqueFigure className="w-24 md:w-32" />;
    case 'Affections hépatobiliaires':
      return <AffectionHepatobilaireFigure className="w-24 md:w-32" />;
    case 'Affections musculosquelettiques et du tissu conjonctif':
      return <AffectionMusculosquelettiquesFigure className="w-24 md:w-32" />;
    case 'Affections psychiatriques':
      return <AffectionPsychiatriquesFigure className="w-24 md:w-32" />;
    case 'Affections respiratoires, thoraciques et médiastinales':
      return <AffectionRespiratoiresFigure className="w-24 md:w-32" />;
    case 'Affections vasculaires':
      return <AffectionVasculaireFigure className="w-24 md:w-32" />;
    case 'Explorations complémentaires':
      return <InvestigationsFigure className="w-24 md:w-32" />;
    case "Lésions, intoxications et complications d'interventions":
      return <LesionsFigure className="w-24 md:w-32" />;
    case 'Troubles du métabolisme et de la nutrition':
      return <TroublesMetabolismeFigure className="w-24 md:w-32" />;
    case "Troubles généraux et anomalies au site d'administration":
      return <TroublesGenerauxFigure className="w-24 md:w-32" />;
    case "Affections de l'oreille et du labyrinthe":
      return <AffectionOreilleFigure className="w-24 md:w-32" />;
    case 'Affections des organes de reproduction et du sein':
      return <AffectionOrganeFigure className="w-24 md:w-32" />;
    case 'Affections du système immunitaire':
      return <AffectionSystemeImmuFigure className="w-24 md:w-32" />;
    case 'Affections endocriniennes':
      return <AffectionEndocriFigure className="w-24 md:w-32" />;
    case 'Affections oculaires':
      return <AffectionsOculaireFigure className="w-24 md:w-32" />;
    case 'Infections et infestations':
      return <InfectionFigure className="w-24 md:w-32" />;
    case 'Problèmes de produit':
      return <ProblemeFigure className="w-24 md:w-32" />;
    case 'Affections congénitales, familiales et génétiques':
      return <AffectionCongenitalesFigure className="w-24 md:w-32" />;
    case 'Tumeurs bénignes, malignes et non précisées (incl kystes et polypes)':
      return <TumeursBenignesFigure className="w-24 md:w-32" />;
    case 'Actes médicaux et chirurgicaux':
      return <ActeMedicauxFigure className="w-24 md:w-32" />;
    case 'Affections gravidiques, puerpérales et périnatales':
      return <AffectionGravidiquesFigure className="w-24 md:w-32" />;
    case 'Caractéristiques socio-environnementales':
      return <CaracteristiqueSocioFigure className="w-24 md:w-32" />;
    default:
      return <Notfound className="w-24 md:w-32" />;
  }
};

// TODO: replace with enum
export const getDeclarationActionIcon = (name: string) => {
  switch (name) {
    case 'Contingentement quantitatif':
      return <ContigentementQuantitatif className="w-24 md:w-32" />;
    case 'Contingentement qualitatif':
      return <ContigentementQualitatif className="w-24 md:w-32" />;
    case 'Restriction du circuit de distribution':
      return <RestrictionCircuitDistribution className="w-24 md:w-32" />;
    case "Mise en place d'un stock de dépannage":
      return <MiseEnPlaceStock className="w-24 md:w-32" />;
    case 'Flexibilité réglementaire':
      return <FlexibiliteReglementaire className="w-24 md:w-32" />;
    case 'Importation':
      return <Importation className="w-24 md:w-32" />;
    case 'Mise à disposition':
      return <MiseADispositionSvg className="w-24 md:w-32" />;
    case 'Pas de mesure':
      return <NoAction className="w-24 md:w-32" />;
    default:
      return <Notfound className="w-24 md:w-32" />;
  }
};

// TODO: replace with enum
export const getRuptureCauseIcon = (name: string) => {
  switch (name) {
    case 'Incident de production':
      return <IncidentProductionSvg className="w-24 md:w-32" />;
    case 'Augmentation du volume de vente':
      return <AugmentationVolumesVenteSvg className="w-24 md:w-32" />;
    case 'Autre':
      return <AutreSvg className="w-24 md:w-32" />;
    case 'Transfert de site':
      return <TransfertSiteSvg className="w-24 md:w-32" />;
    case 'Capacité de production insuffisante':
      return <CapaciteProductionInsuffisante className="w-24 md:w-32" />;
    case 'Défaut qualité produit fini':
      return <DefautQualiteSvg className="w-24 md:w-32" />;
    case 'Problème réglementaire':
      return <DifficulteReglementSvg className="w-24 md:w-32" />;
    case "Défaut d'approvisionnement MP/AC":
      return <DefautApprovisionnementMpAcSvg className="w-24 md:w-32" />;
    case 'Analyses de libération non conformes':
      return <AnalyseLiberationNonConformesSvg className="w-24 md:w-32" />;
    case 'Problème de transport/logistique':
      return <ProblemeTransportSvg className="w-24 md:w-32" />;
    case 'Arrêt de commercialisation':
      return <ArretCommerceSvg className="w-24 md:w-32" />;
    case 'Coronavirus':
      return <Coronavirus className="w-24 md:w-32" />;
    case "Défaut d'approvisionnement en Matière Première":
      return <DefautApprovisionnementMpSvg className="w-24 md:w-32" />;
    case 'Problème qualité : Analyse non conforme':
      return <AnalyseNonConformeSvg className="w-24 md:w-32" />;
    case "Défaut d'approvisionnement en Article de Conditionnement":
      return <DefautApprovisionnementSvg className="w-24 md:w-32" />;
    case 'Non-conformité BPF':
      return <NonConformeSvg className="w-24 md:w-32" />;
    default:
      return <MiseADispositionSvg className="w-24 md:w-32" />;
  }
};
