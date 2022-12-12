import type { ColumnType, RawBuilder } from 'kysely';

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export type Int8 = ColumnType<string, string | number | bigint, string | number | bigint>;

export type Timestamp = ColumnType<Date, Date | string | RawBuilder, Date | string | RawBuilder>;

export type Actions = {
  action_status_id: number | null;
  closing_date: Timestamp | null;
  description: string | null;
  estimated_end_date: Timestamp | null;
  id: Generated<number>;
  identifier: string | null;
  implementation_date: Timestamp | null;
  justification: string | null;
  name: string | null;
  request_date: Timestamp | null;
  sold_out_id: number | null;
  type_id: number | null;
  with_action: string | null;
  year: string | null;
};

export type ActionsStatus = {
  id: Generated<number>;
  status: string | null;
};

export type ActionsTypes = {
  id: Generated<number>;
  type: string | null;
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
  cause_id: number | null;
  id: Generated<number>;
  sold_out_id: number | null;
  year: Int8 | null;
};

export type CausesAll = {
  cause_id: number | null;
  id: Generated<number>;
  sold_out_id: number | null;
  year: Int8 | null;
};

export type CausesTypes = {
  id: Generated<number>;
  type: string | null;
};

export type Config = {
  populate_last_update: Timestamp | null;
};

export type Descriptions = {
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
  number: number | null;
  percentage: number | null;
};

export type ErrorMedInitial = {
  id: Generated<number>;
  initial_error_id: number | null;
  mp_id: number | null;
  number: number | null;
  percentage: number | null;
};

export type ErrorMedNature = {
  id: Generated<number>;
  mp_id: number | null;
  nature_error_id: number | null;
  number: number | null;
  percentage: number | null;
};

export type ErrorMedPopulation = {
  id: Generated<number>;
  mp_id: number | null;
  number: number | null;
  percentage: number | null;
  population_error_id: number | null;
};

export type ErrorMedSideEffect = {
  id: Generated<number>;
  mp_id: number | null;
  number: number | null;
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

export type HltEffects = {
  effect: string | null;
  id: Generated<number>;
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

export type MedicinalProducts = {
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

export type MpPatientAges = {
  age_id: number | null;
  id: Generated<number>;
  mp_id: number | null;
  patients_consumption: number | null;
  patients_percentage: number | null;
};

export type MpPatientSex = {
  id: Generated<number>;
  mp_id: number | null;
  patients_consumption: number | null;
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

export type Notifiers = {
  id: Generated<number>;
  job: string | null;
};

export type PharmaForms = {
  form: string | null;
  id: Generated<number>;
};

export type PopulationErrors = {
  id: Generated<number>;
  label: string | null;
};

export type Presentations = {
  cip13: string | null;
  cip7: Int8 | null;
  collectivity_agrement: string | null;
  id: Generated<number>;
  ma_presentation_status_id: number | null;
  marketing_declaration_date: Timestamp | null;
  marketing_state_id: number | null;
  mp_id: number | null;
  presentation_label: string | null;
  repayment_rate: string | null;
};

export type Publications = {
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

export type RefDosages = {
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

export type SocLongs = {
  id: Generated<number>;
  soc: string | null;
};

export type SoldOut = {
  atc: string | null;
  atc1: string | null;
  atc2: string | null;
  cip13: string | null;
  classification_id: number | null;
  date: Timestamp | null;
  dci: string | null;
  id: Generated<number>;
  laboratory_id: number | null;
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

export type SoldOutClasses = {
  classification: string | null;
  id: Generated<number>;
};

export type Substances = {
  code: string;
  id: Generated<number>;
  name: string;
};

export type SubstancesCaseAge = {
  age_id: number | null;
  case_percentage: number | null;
  id: Generated<number>;
  nb_cases: number | null;
  substance_id: number | null;
};

export type SubstancesCaseSevere = {
  id: Generated<number>;
  severe_case: number | null;
  severity: string | null;
  substance_id: number | null;
};

export type SubstancesCaseSex = {
  case_percentage: number | null;
  id: Generated<number>;
  nb_cases: number | null;
  sex: number | null;
  substance_id: number | null;
};

export type SubstancesExposition = {
  case_exposition: number | null;
  case_rate: number | null;
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
  hlt_effect_id: number | null;
  id: Generated<number>;
  n_decla_eff_hlt: number | null;
  n_decla_eff_soclong: number | null;
  soc_long_id: number | null;
  substance_id: number | null;
};

export type SubstancesNotif = {
  id: Generated<number>;
  notification_percentage: number | null;
  notifier_id: number | null;
  substance_id: number | null;
};

export type SubstancesPatientAge = {
  age_id: number | null;
  id: Generated<number>;
  patients_consumption: number | null;
  patients_percentage: number | null;
  substance_id: number | null;
};

export type SubstancesPatientSex = {
  id: Generated<number>;
  patients_consumption: number | null;
  patients_percentage: number | null;
  sex: number | null;
  substance_id: number | null;
};

export type SubstancesSoclong = {
  case_percentage: number | null;
  id: Generated<number>;
  n_case_effect: number | null;
  soc_long_id: number | null;
  substance_id: number | null;
};

export type DB = {
  actions: Actions;
  actions_status: ActionsStatus;
  actions_types: ActionsTypes;
  admin_routes: AdminRoutes;
  ages: Ages;
  atc_classes: AtcClasses;
  case_pv: CasePv;
  causes: Causes;
  causes_all: CausesAll;
  causes_types: CausesTypes;
  config: Config;
  descriptions: Descriptions;
  error_med_denomination: ErrorMedDenomination;
  error_med_gravity: ErrorMedGravity;
  error_med_initial: ErrorMedInitial;
  error_med_nature: ErrorMedNature;
  error_med_population: ErrorMedPopulation;
  error_med_side_effect: ErrorMedSideEffect;
  global_se_indicators: GlobalSeIndicators;
  gravity_errors: GravityErrors;
  hlt_effects: HltEffects;
  icons: Icons;
  initial_errors: InitialErrors;
  laboratories: Laboratories;
  marketing_authorization_status: MarketingAuthorizationStatus;
  marketing_authorization_types: MarketingAuthorizationTypes;
  medicinal_products: MedicinalProducts;
  mp_atc: MpAtc;
  mp_exposition: MpExposition;
  mp_patient_ages: MpPatientAges;
  mp_patient_sex: MpPatientSex;
  mp_substances: MpSubstances;
  nature_errors: NatureErrors;
  notifiers: Notifiers;
  pharma_forms: PharmaForms;
  population_errors: PopulationErrors;
  presentations: Presentations;
  publication_types: PublicationTypes;
  publications: Publications;
  ref_dosages: RefDosages;
  reports: Reports;
  side_effects: SideEffects;
  soc_longs: SocLongs;
  sold_out: SoldOut;
  sold_out_all: SoldOutAll;
  sold_out_classes: SoldOutClasses;
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
