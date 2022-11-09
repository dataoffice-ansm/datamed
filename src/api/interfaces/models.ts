// eslint-disable-next-line no-warning-comments
// TODO Draft a cabler avec la BDD en cours de préparation
export type Speciality = {
  id: string;
  name: string;
  description: string;
  pharmaForm: 'capsule';
  substances: Substance[];
  genderRepartition: {
    male: number;
    female: number;
  };
  ageRepartition: RepartitionTuple[];
  medicalErrors: MedicalError[];
};

type MedicalError = {
  name: string;
};

export type Substance = {
  id: string;
  name: string;
  description: string;
};

type RepartitionTuple = {
  codePart: string;
  value: number;
};
