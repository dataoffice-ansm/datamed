// TODO Draft a cabler avec la BDD en cours de préparation
export type Speciality = {
  id: string;
  name: string;
  description: string;
  pharmaForm: 'capsule';
  substances?: Substance[];
  genderRepartition?: {
    male: number;
    female: number;
  };
  ageRepartition?: RepartitionTuple[];
  medicalErrors?: MedicalError[];
};

type MedicalError = {
  name: string;
};

type Substance = {
  id: string;
  name: string;
  code: string;
};

type RepartitionTuple = {
  codePart: string;
  value: number;
};
