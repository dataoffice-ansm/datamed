import type { ColumnType } from 'kysely';

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export type Int8 = ColumnType<string, string | number | bigint, string | number | bigint>;

export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type AdminRoutes = {
  id: Generated<number>;
  route: string | null;
};

export type Ages = {
  id: Generated<number>;
  range: string | null;
};

export type Atc1 = {
  id: Generated<number>;
  label: string | null;
  code: string | null;
};

export type AtcClasses = {
  id: Generated<number>;
  code: string | null;
  label: string | null;
};

export type Config = {
  id: Generated<number>;
  label: string | null;
  c_date: Timestamp | null;
};

export type ErrorMedDenomination = {
  id: Generated<number>;
  number: number | null;
  denomination: string | null;
  mp_id: number | null;
};

export type ErrorMedGravity = {
  id: Generated<number>;
  number: number | null;
  percentage: number | null;
  mp_id: number | null;
  gravity_error_id: number | null;
};

export type ErrorMedInitial = {
  id: Generated<number>;
  number: number | null;
  percentage: number | null;
  mp_id: number | null;
  initial_error_id: number | null;
};

export type ErrorMedNature = {
  id: Generated<number>;
  number: number | null;
  percentage: number | null;
  mp_id: number | null;
  nature_error_id: number | null;
};

export type ErrorMedPopulation = {
  id: Generated<number>;
  number: number | null;
  percentage: number | null;
  mp_id: number | null;
  population_error_id: number | null;
};

export type ErrorMedSideEffect = {
  id: Generated<number>;
  number: number | null;
  percentage: number | null;
  mp_id: number | null;
  side_effect_id: number | null;
};

export type GlobalSe = {
  id: Generated<number>;
  label: string | null;
  n: number | null;
};

export type GlobalSeAges = {
  id: Generated<number>;
  n: number | null;
  pct: number | null;
  age_id: number | null;
};

export type GlobalSeGrave = {
  id: Generated<number>;
  label: string | null;
  n: number | null;
  pct: number | null;
};

export type GlobalSeGravityTypes = {
  id: Generated<number>;
  label: string | null;
  n: number | null;
  pct: number | null;
};

export type GlobalSeNbEvol = {
  id: Generated<number>;
  label: string | null;
  n: number | null;
};

export type GlobalSeNotifiers = {
  id: Generated<number>;
  n: number | null;
  pct: number | null;
  notifier_id: number | null;
};

export type GlobalSeSex = {
  id: Generated<number>;
  label: string | null;
  n: number | null;
  pct: number | null;
};

export type GlobalSeSoc = {
  id: Generated<number>;
  n: number | null;
  pct: number | null;
  soc_long_id: number | null;
};

export type GlobalShortages = {
  id: Generated<number>;
  year: number | null;
  n_reports: number | null;
  n_reports_actions: number | null;
  percentage_reports_actions: number | null;
  with_action: string | null;
  n_actions: number | null;
};

export type GlobalShortagesActions = {
  id: Generated<number>;
  year: number | null;
  n: number | null;
  percentage: number | null;
  actions_types_id: number | null;
};

export type GlobalShortagesAtc = {
  id: Generated<number>;
  year: number | null;
  n_reports: number | null;
  n_presentations: number | null;
  atc1_id: number | null;
};

export type GlobalShortagesCauses = {
  id: Generated<number>;
  year: number | null;
  n: number | null;
  percentage_causes: number | null;
  cause_id: number | null;
};

export type GlobalShortagesClasses = {
  id: Generated<number>;
  year: number | null;
  n: number | null;
  n_open: number | null;
  percentage_close: number | null;
  classification_id: number | null;
};

export type GravityErrors = {
  id: Generated<number>;
  label: string | null;
};

export type HltEffects = {
  id: Generated<number>;
  effect: string | null;
};

export type Icons = {
  id: Generated<number>;
  name: string | null;
};

export type InitialErrors = {
  id: Generated<number>;
  label: string | null;
  definition: string | null;
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
  id: Generated<number>;
  cis: string;
  name: string;
  marketing_status: string | null;
  ma_date: Timestamp | null;
  bdpm_status: string | null;
  authorization_number: string | null;
  enhanced_monitoring: string | null;
  icon_id: number | null;
  pharma_form_id: number | null;
  admin_route_id: number | null;
  ma_status_id: number | null;
  ma_type_id: number | null;
  laboratory_id: number | null;
};

export type MpAtc = {
  id: Generated<number>;
  atc: string | null;
  atc_name: string | null;
  mp_id: number | null;
};

export type MpExposition = {
  id: Generated<number>;
  consumption_year_trunc: number | null;
  exposition: number | null;
  mp_id: number | null;
};

export type MpPatientAges = {
  id: Generated<number>;
  patients_consumption: number | null;
  patients_percentage: number | null;
  mp_id: number | null;
  age_id: number | null;
};

export type MpPatientSex = {
  id: Generated<number>;
  sex: string | null;
  patients_consumption: number | null;
  patients_percentage: number | null;
  mp_id: number | null;
};

export type MpSubstances = {
  id: Generated<number>;
  dosage: string | null;
  substance_id: number | null;
  mp_id: number | null;
  pharma_form_id: number | null;
  ref_dosage_id: number | null;
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
  id: Generated<number>;
  form: string | null;
};

export type PopulationErrors = {
  id: Generated<number>;
  label: string | null;
};

export type Presentations = {
  id: Generated<number>;
  cip7: Int8 | null;
  presentation_label: string | null;
  marketing_declaration_date: Timestamp | null;
  cip13: string | null;
  collectivity_agrement: string | null;
  repayment_rate: string | null;
  mp_id: number | null;
  ma_presentation_status_id: number | null;
  marketing_state_id: number | null;
};

export type Publications = {
  id: Generated<number>;
  title: string | null;
  link: string | null;
  mp_id: number | null;
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

export type ShortagesActionsTypes = {
  id: Generated<number>;
  type: string | null;
  definition: string | null;
};

export type ShortagesAssociations = {
  id: Generated<number>;
  mp_id: number | null;
  substance_id: number | null;
  mp_associated_id: number | null;
};

export type ShortagesCauses = {
  id: Generated<number>;
  year: Int8 | null;
  cause_id: number | null;
};

export type ShortagesCausesTypes = {
  id: Generated<number>;
  type: string | null;
  definition: string | null;
};

export type ShortagesClasses = {
  id: Generated<number>;
  classification: string | null;
};

export type ShortagesHisto = {
  id: Generated<number>;
  num: string | null;
  state: string | null;
  date: Timestamp | null;
  year: string | null;
  name: string | null;
  mp_id: number | null;
  classification_id: number | null;
  cause: string | null;
};

export type ShortagesLink = {
  id: Generated<number>;
  association_id: number | null;
  mp_associated_id: number | null;
  histo_id: number | null;
  mp_id: number | null;
};

export type SideEffects = {
  id: Generated<number>;
  label: string | null;
};

export type SocLongs = {
  id: Generated<number>;
  soc: string | null;
};

export type Substances = {
  id: Generated<number>;
  code: string;
  name: string;
};

export type SubstancesCaseAge = {
  id: Generated<number>;
  nb_cases: number | null;
  case_percentage: number | null;
  substance_id: number | null;
  age_id: number | null;
};

export type SubstancesCases = {
  id: Generated<number>;
  nb_cases: number | null;
  substance_id: number | null;
};

export type SubstancesCaseSevere = {
  id: Generated<number>;
  severity: string | null;
  severe_case: number | null;
  substance_id: number | null;
};

export type SubstancesCaseSex = {
  id: Generated<number>;
  sex: string | null;
  nb_cases: number | null;
  case_percentage: number | null;
  substance_id: number | null;
};

export type SubstancesExposition = {
  id: Generated<number>;
  year: number | null;
  year_consumption: number | null;
  exposition: number | null;
  consumption_year_trunc: number | null;
  substance_id: number | null;
};

export type SubstancesHlt = {
  id: Generated<number>;
  n_decla_eff_hlt: number | null;
  n_decla_eff_soclong: number | null;
  case_percentage: number | null;
  substance_id: number | null;
  soc_long_id: number | null;
  hlt_effect_id: number | null;
};

export type SubstancesNotif = {
  id: Generated<number>;
  notification_number: number | null;
  notification_percentage: number | null;
  substance_id: number | null;
  notifier_id: number | null;
};

export type SubstancesPatientAge = {
  id: Generated<number>;
  patients_consumption: number | null;
  patients_percentage: number | null;
  substance_id: number | null;
  age_id: number | null;
};

export type SubstancesPatientSex = {
  id: Generated<number>;
  sex: string | null;
  patients_consumption: number | null;
  patients_percentage: number | null;
  substance_id: number | null;
};

export type SubstancesSoclong = {
  id: Generated<number>;
  n_case_effect: number | null;
  case_percentage: number | null;
  substance_id: number | null;
  soc_long_id: number | null;
};

export type DB = {
  admin_routes: AdminRoutes;
  ages: Ages;
  atc_classes: AtcClasses;
  atc1: Atc1;
  config: Config;
  error_med_denomination: ErrorMedDenomination;
  error_med_gravity: ErrorMedGravity;
  error_med_initial: ErrorMedInitial;
  error_med_nature: ErrorMedNature;
  error_med_population: ErrorMedPopulation;
  error_med_side_effect: ErrorMedSideEffect;
  global_se: GlobalSe;
  global_se_ages: GlobalSeAges;
  global_se_grave: GlobalSeGrave;
  global_se_gravity_types: GlobalSeGravityTypes;
  global_se_nb_evol: GlobalSeNbEvol;
  global_se_notifiers: GlobalSeNotifiers;
  global_se_sex: GlobalSeSex;
  global_se_soc: GlobalSeSoc;
  global_shortages: GlobalShortages;
  global_shortages_actions: GlobalShortagesActions;
  global_shortages_atc: GlobalShortagesAtc;
  global_shortages_causes: GlobalShortagesCauses;
  global_shortages_classes: GlobalShortagesClasses;
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
  shortages_actions_types: ShortagesActionsTypes;
  shortages_associations: ShortagesAssociations;
  shortages_causes: ShortagesCauses;
  shortages_causes_types: ShortagesCausesTypes;
  shortages_classes: ShortagesClasses;
  shortages_histo: ShortagesHisto;
  shortages_link: ShortagesLink;
  side_effects: SideEffects;
  soc_longs: SocLongs;
  substances: Substances;
  substances_case_age: SubstancesCaseAge;
  substances_case_severe: SubstancesCaseSevere;
  substances_case_sex: SubstancesCaseSex;
  substances_cases: SubstancesCases;
  substances_exposition: SubstancesExposition;
  substances_hlt: SubstancesHlt;
  substances_notif: SubstancesNotif;
  substances_patient_age: SubstancesPatientAge;
  substances_patient_sex: SubstancesPatientSex;
  substances_soclong: SubstancesSoclong;
};
