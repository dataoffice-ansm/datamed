import type { Speciality } from '../../api/interfaces/models';

export const SpecialityPage = ({ cis }: { cis: Partial<Speciality> }) => <p>{cis.name}</p>;
