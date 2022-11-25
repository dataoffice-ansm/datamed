import type { ColumnType, RawBuilder } from 'kysely';

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export type Int8 = ColumnType<string, string | number | bigint, string | number | bigint>;

export type Timestamp = ColumnType<Date, Date | string | RawBuilder, Date | string | RawBuilder>;

export type CasPv = {
  annee: Int8 | null;
  cas: Int8 | null;
  id: Generated<number>;
};

export type Causes = {
  annee: Int8 | null;
  cause: string | null;
  id: Generated<number>;
  numero: string | null;
  ruptures_id: number | null;
};

export type ClassesAtc = {
  code: string | null;
  id: Generated<number>;
  label: string | null;
};

export type Description = {
  cis: string | null;
  description: string | null;
  id: Generated<number>;
  specialite_id: number | null;
};

export type ErreurMedCisDenomination = {
  cis: string | null;
  denomination: string | null;
  id: Generated<number>;
  specialite_id: number | null;
};

export type ErreurMedEffetIndesirable = {
  cis: string | null;
  effet_indesirable: string | null;
  id: Generated<number>;
  pourcentage: number | null;
  specialite_id: number | null;
};

export type ErreurMedGravite = {
  cis: string | null;
  gravitee: string | null;
  id: Generated<number>;
  pourcentage: number | null;
  specialite_id: number | null;
};

export type ErreurMedInitial = {
  cis: string | null;
  id: Generated<number>;
  initial_erreur: string | null;
  pourcentage: number | null;
  specialite_id: number | null;
};

export type ErreurMedNature = {
  cis: string | null;
  id: Generated<number>;
  nature_erreur: string | null;
  pourcentage: number | null;
  specialite_id: number | null;
};

export type ErreurMedPopulation = {
  cis: string | null;
  id: Generated<number>;
  population_erreur: string | null;
  pourcentage: number | null;
  specialite_id: number | null;
};

export type GlobalEiIndicators = {
  commentaire: string | null;
  id: Generated<number>;
  label: string | null;
  n: string | null;
  pct: number | null;
};

export type Icones = {
  id: Generated<number>;
  nom: string | null;
};

export type Mesures = {
  annee: string | null;
  avec_mesure: string | null;
  date_cloture: Timestamp | null;
  date_demande: Timestamp | null;
  date_mise_en_place: Timestamp | null;
  date_provi_fin: Timestamp | null;
  description: string | null;
  etat_mesure: string | null;
  id: Generated<number>;
  identifiant: string | null;
  justification: string | null;
  mesure: string | null;
  nom: string | null;
  numero: string | null;
  ruptures_id: number | null;
};

export type Presentation = {
  agrement_collectivites: string | null;
  cip13: string | null;
  cip7: Int8 | null;
  cis: string | null;
  date_declaration_commercialisation: Timestamp | null;
  etat_commercialisation: string | null;
  id: Generated<number>;
  libelle_presentation: string | null;
  specialite_id: number | null;
  statut_admin_presentation: string | null;
  taux_remboursement: string | null;
};

export type Publication = {
  cis: string | null;
  id: Generated<number>;
  link: string | null;
  specialite_id: number | null;
  title: string | null;
  type: string | null;
};

export type Ruptures = {
  annee: string | null;
  atc: string | null;
  atc1: string | null;
  atc2: string | null;
  cip13: string | null;
  cis: string | null;
  classification: string | null;
  date: Timestamp | null;
  dci: string | null;
  etat: string | null;
  id: Generated<number>;
  laboratoire: string | null;
  nom: string | null;
  nom_atc: string | null;
  numero: string | null;
  presentation: string | null;
  specialite_id: number | null;
};

export type RupturesAll = {
  annee: string | null;
  atc: string | null;
  atc1: string | null;
  atc2: string | null;
  cip13: string | null;
  cis: string | null;
  classification: string | null;
  date: Timestamp | null;
  dci: string | null;
  etat: string | null;
  id: Generated<number>;
  laboratoire: string | null;
  nom: string | null;
  nom_atc: string | null;
  numero: string | null;
  presentation: string | null;
};

export type Signalements = {
  annee: string | null;
  id: Generated<number>;
  label: string | null;
  nb_presentations: number | null;
  nb_signalements: number | null;
};

export type Specialite = {
  cis: string | null;
  date_amm: Timestamp | null;
  etat_commercialisation: string | null;
  forme_pharma: string | null;
  icone_id: number | null;
  id: Generated<number>;
  nom: string | null;
  num_autorisation: string | null;
  statut_amm: string | null;
  statut_bdpm: string | null;
  surveillance_renforcee: string | null;
  titulaires: string | null;
  type_amm: string | null;
  voie_admin: string | null;
};

export type SpecialiteAtc = {
  atc: string | null;
  cis: string | null;
  id: Generated<number>;
  nom_atc: string | null;
  specialite_id: number | null;
};

export type SpecialiteExposition = {
  cis: string | null;
  conso_an_trunc: number | null;
  exposition: number | null;
  id: Generated<number>;
  specialite_id: number | null;
};

export type SpecialitePatientAgeOrdei = {
  age: string | null;
  cis: string | null;
  id: Generated<number>;
  pourcentage_patients: number | null;
  specialite_id: number | null;
};

export type SpecialitePatientSexeOrdei = {
  cis: string | null;
  id: Generated<number>;
  pourcentage_patients: number | null;
  sexe: number | null;
  specialite_id: number | null;
};

export type SpecialiteSubstance = {
  cis: string | null;
  code_substance: string | null;
  dosage: string | null;
  elem_pharma: string | null;
  id: Generated<number>;
  ref_dosage: string | null;
  specialite_id: number | null;
  substance_id: number | null;
};

export type Substance = {
  code: string | null;
  id: Generated<number>;
  nom: string | null;
};

export type SubstanceCasAgeOrdei = {
  age: string | null;
  code: string | null;
  id: Generated<number>;
  pourcentage_cas: number | null;
  substance_id: number | null;
};

export type SubstanceCasGraveOrdei = {
  cas: number | null;
  code: string | null;
  grave: string | null;
  id: Generated<number>;
  substance_id: number | null;
};

export type SubstanceCasSexeOrdei = {
  code: string | null;
  id: Generated<number>;
  pourcentage_cas: number | null;
  sexe: number | null;
  substance_id: number | null;
};

export type SubstanceExposition = {
  annee: number | null;
  cas: number | null;
  cas_annee: number | null;
  code: string | null;
  conso_an_trunc: number | null;
  conso_annee: number | null;
  exposition: number | null;
  id: Generated<number>;
  substance_id: number | null;
  taux_cas: number | null;
};

export type SubstanceHltOrdei = {
  code: string | null;
  effet_hlt: string | null;
  id: Generated<number>;
  pourcentage_cas: number | null;
  soc_long: string | null;
  substance_id: number | null;
};

export type SubstanceNotifOrdei = {
  code: string | null;
  id: Generated<number>;
  notificateur: string | null;
  pourcentage_notif: number | null;
  substance_id: number | null;
};

export type SubstancePatientAgeOrdei = {
  age: string | null;
  code: string | null;
  id: Generated<number>;
  pourcentage_patients: number | null;
  substance_id: number | null;
};

export type SubstancePatientSexeOrdei = {
  code: string | null;
  id: Generated<number>;
  pourcentage_patients: number | null;
  sexe: number | null;
  substance_id: number | null;
};

export type SubstanceSoclongOrdei = {
  code: string | null;
  id: Generated<number>;
  n_cas_effet: number | null;
  pourcentage_cas: number | null;
  soc_long: string | null;
  substance_id: number | null;
};

export type DB = {
  cas_pv: CasPv;
  causes: Causes;
  classes_atc: ClassesAtc;
  description: Description;
  erreur_med_cis_denomination: ErreurMedCisDenomination;
  erreur_med_effet_indesirable: ErreurMedEffetIndesirable;
  erreur_med_gravite: ErreurMedGravite;
  erreur_med_initial: ErreurMedInitial;
  erreur_med_nature: ErreurMedNature;
  erreur_med_population: ErreurMedPopulation;
  global_ei_indicators: GlobalEiIndicators;
  icones: Icones;
  mesures: Mesures;
  presentation: Presentation;
  publication: Publication;
  ruptures: Ruptures;
  ruptures_all: RupturesAll;
  signalements: Signalements;
  specialite: Specialite;
  specialite_atc: SpecialiteAtc;
  specialite_exposition: SpecialiteExposition;
  specialite_patient_age_ordei: SpecialitePatientAgeOrdei;
  specialite_patient_sexe_ordei: SpecialitePatientSexeOrdei;
  specialite_substance: SpecialiteSubstance;
  substance: Substance;
  substance_cas_age_ordei: SubstanceCasAgeOrdei;
  substance_cas_grave_ordei: SubstanceCasGraveOrdei;
  substance_cas_sexe_ordei: SubstanceCasSexeOrdei;
  substance_exposition: SubstanceExposition;
  substance_hlt_ordei: SubstanceHltOrdei;
  substance_notif_ordei: SubstanceNotifOrdei;
  substance_patient_age_ordei: SubstancePatientAgeOrdei;
  substance_patient_sexe_ordei: SubstancePatientSexeOrdei;
  substance_soclong_ordei: SubstanceSoclongOrdei;
};
