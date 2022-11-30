import { dbInstance } from './postgreDb';
import type { Speciality, Substance } from '../../graphql/__generated__/generated-types';

export class PostgresOperations {
  dbInstance;

  constructor() {
    this.dbInstance = dbInstance;
  }

  async getSingleSpeciality(cisId: string): Promise<Speciality | null> {
    const row = await this.dbInstance
      .selectFrom('medicinal_product as mp')
      .where('mp.cis', '=', cisId)

      .leftJoin('mp_atc as mp_a', 'mp.id', 'mp_a.mp_id')
      .leftJoin('description as d', 'mp.id', 'd.mp_id')
      .leftJoin('icons as i', 'mp.icon_id', 'i.id')

      .select([
        'mp.id',
        'mp.cis as cisId',
        'mp.name',
        'mp_a.id as atcId',
        'mp_a.atc as actCode',
        'mp_a.atc_name as atcName',
        'mp.icon_id as iconId',
        'i.name as iconName',
        'd.description',
      ])
      .executeTakeFirst();

    if (row) {
      const { id, cisId, name, atcId, actCode, atcName, iconId, iconName, description } = row;
      return {
        id,
        cisId,
        name,
        atc: atcId
          ? {
              id: atcId,
              code: actCode,
              name: atcName,
            }
          : null,
        icon: iconId
          ? {
              id: iconId,
              name: iconName,
            }
          : null,
        iconId,
        description,
      };
    }

    return null;
  }

  async getSpecialities(): Promise<Speciality[]> {
    const rows = await this.dbInstance
      .selectFrom('medicinal_product')
      .selectAll()
      .execute()
      .finally(async () => this.dbInstance.destroy());

    return rows.map(({ id, name, cis: cisId, icon_id: iconId }) => ({
      id,
      cisId,
      name,
      iconId,
    }));
  }

  async getSpecialitySubstances(cisId: number): Promise<Substance[]> {
    const rows = await this.dbInstance
      .selectFrom('mp_substances as mp')
      .where('mp.mp_id', '=', cisId)
      .leftJoin('substances as sub', 'sub.id', 'mp.substance_id')
      .leftJoin('pharma_forms as ph', 'ph.id', 'mp.pharma_form_id')
      .select(['sub.id', 'sub.name', 'sub.code', 'ph.form as pharmaForm', 'mp.dosage'])
      .execute();

    return rows.reduce<Substance[]>((carry, row) => {
      const { id, name, code, pharmaForm, dosage } = row;
      return id && name && code
        ? [
            ...carry,
            {
              id,
              name,
              code,
              pharmaForm,
              dosage,
            },
          ]
        : carry;
    }, []);
  }

  async getSingleSubstance(subCodeId: string): Promise<Substance | null> {
    const row = await this.dbInstance
      .selectFrom('substances')
      .where('code', '=', subCodeId)
      .selectAll()
      .executeTakeFirst()
      .finally(async () => this.dbInstance.destroy());

    if (row) {
      const { id, name, code } = row;
      return {
        id,
        code,
        name,
      };
    }

    return null;
  }

  async getSubstances(): Promise<Substance[]> {
    const rows = await this.dbInstance
      .selectFrom('substances')
      .selectAll()
      .execute()
      .finally(async () => this.dbInstance.destroy());

    return rows.map(({ id, name, code }) => ({
      id,
      code,
      name,
    }));
  }
}
