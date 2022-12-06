import ErrorAdministration from '../assets/images/errorAdministration.svg';
import ErrorDelivrance from '../assets/images/errorDelivrance.svg';
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

export const cisExpositionLevelMapping = {
  0: 'Utilisation inconnue',
  1: 'Utilisation très faible',
  2: 'Utilisation faible',
  3: 'Utilisation modérée',
  4: 'Utilisation élevée',
  5: 'Utilisation très élevée',
};

export const getCisErrorMedNatureIconMapping = (value: number) => {
  switch (value) {
    case 3:
      return <ErrorDelivrance className="w-32" />;

    // 0: 'Erreur de suivi thérapeutique et clinique',
    //   1: 'Erreur de médicament',
    //   2: 'Erreur de posologie ou de concentration',
    //   4: 'Erreur de dosage',
    //   6: 'Erreur d’omission',
    //   10: 'Erreur de forme galénique',
    //   11: 'Médicament périmé ou détérioré ou mal conservé',

    case 5:
    case 8:
    case 9:
    case 12:
    case 14:
      return <ErrorAdministration className="w-32" />;

    case 13:
      return <ErrorPreparation className="w-32" />;

    default:
      return <ErrorOther className="w-32" />;
  }
};

export const getPublicationIcon = (publicationTypeId: number) => {
  switch (publicationTypeId) {
    case 1:
      return <PublicationOtherSVG />;
    case 3:
      return <PublicationSpeakSVG />;
    default:
      return <PublicationInfoSVG />;
  }
};

export const getNotifierFigureByJob = (id: number) => {
  switch (id) {
    case 0:
      return <OtherDoctorFigure />;
    case 1:
      return <NurseFigure />;
    case 2:
      return <JuristeFigure />;
    case 3:
      return <DoctorFigure />;
    case 4:
      return <SpecialistFigure />;
    case 5:
      return <PatientFigure />;
    case 6:
      return <PharmacistFigure />;
    default:
      return <OtherDoctorFigure />;
  }
};
