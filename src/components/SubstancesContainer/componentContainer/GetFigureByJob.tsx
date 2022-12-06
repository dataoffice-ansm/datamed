import type { Maybe } from '../../../graphql/__generated__/generated-documents';
import OtherDoctorFigure from '../../../assets/images/notifiers/0.svg';
import NurseFigure from '../../../assets/images/notifiers/2.svg';
import JuristeFigure from '../../../assets/images/notifiers/8.svg';
import DoctorFigure from '../../../assets/images/notifiers/3.svg';
import SpecialistFigure from '../../../assets/images/notifiers/4.svg';
import PatientFigure from '../../../assets/images/notifiers/5.svg';
import PharmacistFigure from '../../../assets/images/notifiers/6.svg';

export const GetFigureByJob = ({ id }: { id: Maybe<number> | undefined }) => {
  const width = 150;
  const height = 150;
  switch (id) {
    case 0:
      return <OtherDoctorFigure width={width} height={height} />;
    case 1:
      return <NurseFigure width={width} height={height} />;
    case 2:
      return <JuristeFigure width={width} height={height} />;
    case 3:
      return <DoctorFigure width={width} height={height} />;
    case 4:
      return <SpecialistFigure width={width} height={height} />;
    case 5:
      return <PatientFigure width={width} height={height} />;
    case 6:
      return <PharmacistFigure width={width} height={height} />;
    default:
      return <OtherDoctorFigure width={width} height={height} />;
  }
};
