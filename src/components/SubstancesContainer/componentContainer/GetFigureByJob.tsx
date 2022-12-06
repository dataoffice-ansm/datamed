import type { Maybe } from '../../../graphql/__generated__/generated-documents';
import OtherDoctorFigure from '../../../assets/images/notifiers/0.svg';
import NurseFigure from '../../../assets/images/notifiers/2.svg';
import JuristeFigure from '../../../assets/images/notifiers/8.svg';
import DoctorFigure from '../../../assets/images/notifiers/3.svg';
import SpecialistFigure from '../../../assets/images/notifiers/4.svg';
import PatientFigure from '../../../assets/images/notifiers/5.svg';
import PharmacistFigure from '../../../assets/images/notifiers/6.svg';

export const GetFigureByJob = ({ job }: { job: Maybe<string> | undefined }) => {
  const width = 150;
  const height = 150;
  switch (job) {
    case 'Autre professionnel de santé':
      return <OtherDoctorFigure width={width} height={height} />;
    case 'Infirmière':
      return <NurseFigure width={width} height={height} />;
    case 'Juriste':
      return <JuristeFigure width={width} height={height} />;
    case 'Médecin généraliste':
      return <DoctorFigure width={width} height={height} />;
    case 'Médecin spécialiste':
      return <SpecialistFigure width={width} height={height} />;
    case 'Non professionnel de santé':
      return <PatientFigure width={width} height={height} />;
    case 'Pharmacien':
      return <PharmacistFigure width={width} height={height} />;
    default:
      return <OtherDoctorFigure width={width} height={height} />;
  }
};
