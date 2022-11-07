import type { Speciality } from '../../api/interfaces/models';

export const SpecialityPage = ({ cis }: { cis: Speciality }) => <p>{cis.name}</p>;
