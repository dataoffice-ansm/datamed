import type { Speciality } from '../../api/models';

export const SpecialityPage = ({ cis }: { cis: Speciality }) => <p>{cis.name}</p>;
