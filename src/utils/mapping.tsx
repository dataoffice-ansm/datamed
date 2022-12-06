import ErrorAdministration from '../assets/images/errorAdministration.svg';
import ErrorDelivrance from '../assets/images/errorDelivrance.svg';
import ErrorOther from '../assets/images/errorOther.svg';
import ErrorPreparation from '../assets/images/errorPreparation.svg';
import ErrorPrescription from '../assets/images/errorPrescription.svg';
import ErrorSuivitherapeutique from '../assets/images/errorSuivitherapeutique.svg';
import PublicationOtherSVG from '../assets/icons/publications/other.svg';
import PublicationSpeakSVG from '../assets/icons/publications/speak.svg';
import PublicationInfoSVG from '../assets/icons/publications/info.svg';

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
