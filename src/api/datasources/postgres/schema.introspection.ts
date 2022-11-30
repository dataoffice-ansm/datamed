import type { ColumnType, RawBuilder } from 'kysely';

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export type Int8 = ColumnType<string, string | number | bigint, string | number | bigint>;

export type Timestamp = ColumnType<Date, Date | string | RawBuilder, Date | string | RawBuilder>;

export type Actions = {
  action: string | null;
  action_status: string | null;
  closing_date: Timestamp | null;
  description: string | null;
  estimated_end_date: Timestamp | null;
  id: Generated<number>;
  identifier: string | null;
  implementation_date: Timestamp | null;
  justification: string | null;
  name: string | null;
  num: string | null;
  request_date: Timestamp | null;
  sold_out_id: number | null;
  with_action: string | null;
  year: string | null;
};

export type AdminRoutes = {
  id: Generated<number>;
  route: string | null;
};

export type Ages = {
  id: Generated<number>;
  range: string | null;
};

export type AtcClasses = {
  code: string | null;
  id: Generated<number>;
  label: string | null;
};

export type CasePv = {
  id: Generated<number>;
  pv_case: Int8 | null;
  year: Int8 | null;
};

export type Causes = {
  cause: string | null;
  id: Generated<number>;
  num: string | null;
  sold_out_id: number | null;
  year: Int8 | null;
};

export type Config = {
  populate_last_update: Timestamp | null;
};

export type Description = {
  description: string | null;
  id: Generated<number>;
  mp_id: number | null;
};

export type ErrorMedDenomination = {
  denomination: string | null;
  id: Generated<number>;
  mp_id: number | null;
};

export type ErrorMedGravity = {
  gravity_error_id: number | null;
  id: Generated<number>;
  mp_id: number | null;
  percentage: number | null;
};

export type ErrorMedInitial = {
  id: Generated<number>;
  initial_error_id: number | null;
  mp_id: number | null;
  percentage: number | null;
};

export type ErrorMedNature = {
  id: Generated<number>;
  mp_id: number | null;
  nature_error_id: number | null;
  percentage: number | null;
};

export type ErrorMedPopulation = {
  id: Generated<number>;
  mp_id: number | null;
  percentage: number | null;
  population_error_id: number | null;
};

export type ErrorMedSideEffect = {
  id: Generated<number>;
  mp_id: number | null;
  percentage: number | null;
  side_effect_id: number | null;
};

export type GlobalSeIndicators = {
  comment: string | null;
  id: Generated<number>;
  label: string | null;
  n: string | null;
  pct: number | null;
};

export type GravityErrors = {
  id: Generated<number>;
  label: string | null;
};

export type Icons = {
  id: Generated<number>;
  name: string | null;
};

export type InitialErrors = {
  id: Generated<number>;
  label: string | null;
};

export type Laboratories = {
  id: Generated<number>;
  name: string | null;
};

export type MarketingAuthorizationStatus = {
  id: Generated<number>;
  status: string | null;
};

export type MarketingAuthorizationTypes = {
  id: Generated<number>;
  type: string | null;
};

export type MedicinalProduct = {
  admin_route_id: number | null;
  authorization_number: string | null;
  bdpm_status: string | null;
  cis: string;
  enhanced_monitoring: string | null;
  icon_id: number | null;
  id: Generated<number>;
  laboratory_id: number | null;
  ma_date: Timestamp | null;
  ma_status_id: number | null;
  ma_type_id: number | null;
  marketing_status: string | null;
  name: string;
  pharma_form_id: number | null;
};

export type MpAtc = {
  atc: string | null;
  atc_name: string | null;
  id: Generated<number>;
  mp_id: number | null;
};

export type MpExposition = {
  consumption_year_trunc: number | null;
  exposition: number | null;
  id: Generated<number>;
  mp_id: number | null;
};

export type MpPatientAge = {
  age_id: number | null;
  id: Generated<number>;
  mp_id: number | null;
  patients_percentage: number | null;
};

export type MpPatientSex = {
  id: Generated<number>;
  mp_id: number | null;
  patients_percentage: number | null;
  sex: number | null;
};

export type MpSubstances = {
  dosage: string | null;
  id: Generated<number>;
  mp_id: number | null;
  pharma_form_id: number | null;
  ref_dosage_id: number | null;
  substance_id: number | null;
};

export type NatureErrors = {
  id: Generated<number>;
  label: string | null;
};

export type PharmaForms = {
  form: string | null;
  id: Generated<number>;
};

export type PopulationErrors = {
  id: Generated<number>;
  label: string | null;
};

export type Presentation = {
  cip13: string | null;
  cip7: Int8 | null;
  cis: string | null;
  collectivity_agrement: string | null;
  id: Generated<number>;
  ma_presentation_status_id: number | null;
  marketing_declaration_date: Timestamp | null;
  marketing_state_id: number | null;
  mp_id: number | null;
  presentation_label: string | null;
  repayment_rate: string | null;
};

export type Publication = {
  id: Generated<number>;
  link: string | null;
  mp_id: number | null;
  title: string | null;
  type_id: number | null;
};

export type PublicationTypes = {
  id: Generated<number>;
  type: string | null;
};

export type RefDosage = {
  id: Generated<number>;
  label: string | null;
};

export type Reports = {
  id: Generated<number>;
  label: string | null;
  nb_presentations: number | null;
  nb_reports: number | null;
  year: string | null;
};

export type SideEffects = {
  id: Generated<number>;
  label: string | null;
};

export type SoldOut = {
  atc: string | null;
  atc1: string | null;
  atc2: string | null;
  cip13: string | null;
  cis: string | null;
  classification: string | null;
  date: Timestamp | null;
  dci: string | null;
  id: Generated<number>;
  ma_holder: string | null;
  mp_id: number | null;
  name: string | null;
  name_atc: string | null;
  num: string | null;
  presentation: string | null;
  state: string | null;
  year: string | null;
};

export type SoldOutAll = {
  atc: string | null;
  atc1: string | null;
  atc2: string | null;
  cip13: string | null;
  cis: string | null;
  classification: string | null;
  date: Timestamp | null;
  dci: string | null;
  id: Generated<number>;
  ma_holder: string | null;
  name: string | null;
  name_atc: string | null;
  num: string | null;
  presentation: string | null;
  state: string | null;
  year: string | null;
};

export type Substances = {
  code: string;
  id: Generated<number>;
  name: string;
};

export type SubstancesCaseAge = {
  age: string | null;
  case_percentage: number | null;
  code: string | null;
  id: Generated<number>;
  substance_id: number | null;
};

export type SubstancesCaseSevere = {
  code: string | null;
  id: Generated<number>;
  severe_case: number | null;
  severity: string | null;
  substance_id: number | null;
};

export type SubstancesCaseSex = {
  case_percentage: number | null;
  code: string | null;
  id: Generated<number>;
  sex: number | null;
  substance_id: number | null;
};

export type SubstancesExposition = {
  case_exposition: number | null;
  case_rate: number | null;
  code: string | null;
  consumption_year_trunc: number | null;
  exposition: number | null;
  id: Generated<number>;
  substance_id: number | null;
  year: number | null;
  year_cases: number | null;
  year_consumption: number | null;
};

export type SubstancesHlt = {
  case_percentage: number | null;
  code: string | null;
  hlt_effect: string | null;
  id: Generated<number>;
  soc_long: string | null;
  substance_id: number | null;
};

export type SubstancesNotif = {
  code: string | null;
  id: Generated<number>;
  notification_percentage: number | null;
  notifier: string | null;
  substance_id: number | null;
};

export type SubstancesPatientAge = {
  age: string | null;
  code: string | null;
  id: Generated<number>;
  patients_percentage: number | null;
  substance_id: number | null;
};

export type SubstancesPatientSex = {
  code: string | null;
  id: Generated<number>;
  patients_percentage: number | null;
  sex: number | null;
  substance_id: number | null;
};

export type SubstancesSoclong = {
  case_percentage: number | null;
  code: string | null;
  id: Generated<number>;
  n_case_effect: number | null;
  soc_long: string | null;
  substance_id: number | null;
};

export type DB = {
  actions: Actions;
  admin_routes: AdminRoutes;
  ages: Ages;
  atc_classes: AtcClasses;
  case_pv: CasePv;
  causes: Causes;
  config: Config;
  description: Description;
  error_med_denomination: ErrorMedDenomination;
  error_med_gravity: ErrorMedGravity;
  error_med_initial: ErrorMedInitial;
  error_med_nature: ErrorMedNature;
  error_med_population: ErrorMedPopulation;
  error_med_side_effect: ErrorMedSideEffect;
  global_se_indicators: GlobalSeIndicators;
  gravity_errors: GravityErrors;
  icons: Icons;
  initial_errors: InitialErrors;
  laboratories: Laboratories;
  marketing_authorization_status: MarketingAuthorizationStatus;
  marketing_authorization_types: MarketingAuthorizationTypes;
  medicinal_product: MedicinalProduct;
  mp_atc: MpAtc;
  mp_exposition: MpExposition;
  mp_patient_age: MpPatientAge;
  mp_patient_sex: MpPatientSex;
  mp_substances: MpSubstances;
  nature_errors: NatureErrors;
  pharma_forms: PharmaForms;
  population_errors: PopulationErrors;
  presentation: Presentation;
  publication: Publication;
  publication_types: PublicationTypes;
  ref_dosage: RefDosage;
  reports: Reports;
  side_effects: SideEffects;
  sold_out: SoldOut;
  sold_out_all: SoldOutAll;
  substances: Substances;
  substances_case_age: SubstancesCaseAge;
  substances_case_severe: SubstancesCaseSevere;
  substances_case_sex: SubstancesCaseSex;
  substances_exposition: SubstancesExposition;
  substances_hlt: SubstancesHlt;
  substances_notif: SubstancesNotif;
  substances_patient_age: SubstancesPatientAge;
  substances_patient_sex: SubstancesPatientSex;
  substances_soclong: SubstancesSoclong;
};
