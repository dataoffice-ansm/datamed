// eslint-disable-next-line no-warning-comments
// TODO Draft a cabler avec la BDD en cours de préparation

type RepartitionTuple = {
  codePart: string;
  value: number;
};

type MedicalError = {
  name: string;
};

export type EntityData = {
  description: string;
  pharmaForm: 'capsule';
  genderRepartition: {
    male: number;
    female: number;
  };
  ageRepartition: RepartitionTuple[];
  medicalErrors: MedicalError[];
};

export type Entity = Partial<EntityData> & {
  id: string;
  name: string;
  type: 'cis' | 'sub';
};

export type Substance = Entity & {
  type: 'sub';
};

export type Speciality = Entity & {
  type: 'cis';
  substances?: Substance[];
};
