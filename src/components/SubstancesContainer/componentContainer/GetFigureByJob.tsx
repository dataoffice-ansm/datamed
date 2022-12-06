import type { Maybe } from '../../../graphql/__generated__/generated-documents';
import OtherDoctorFigure from '../../../assets/images/notifiers/0.svg';
import NurseFigure from '../../../assets/images/notifiers/2.svg';
import JuristeFigure from '../../../assets/images/notifiers/8.svg';
import DoctorFigure from '../../../assets/images/notifiers/3.svg';
import SpecialistFigure from '../../../assets/images/notifiers/4.svg';
import PatientFigure from '../../../assets/images/notifiers/5.svg';
import PharmacistFigure from '../../../assets/images/notifiers/6.svg';

export const GetFigureByJob = ({ id }: { id: Maybe<number> | undefined }) => {
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
