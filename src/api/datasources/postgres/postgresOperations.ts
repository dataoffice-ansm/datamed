import { createDbInstance } from './postgreDb';
import type { Icon, Speciality, Substance } from '../../graphql/__generated__/generated-types';

export class PostgresOperations {
  dbInstance;

  constructor() {
    this.dbInstance = createDbInstance(true);
  }

  async getSingleSpeciality(cisId: string): Promise<Speciality | null> {
    const row = await this.dbInstance
      .selectFrom('medicinal_product')
      .where('cis', '=', cisId)
      .selectAll()
      .executeTakeFirst();

    if (row) {
      const { id, name, icon_id: iconId } = row;
      return {
        id,
        cisId,
        name,
        iconId,
        description: 'TODO (imported from scrapping ?)',
      };
    }

    return null;
  }

  async getIcon(id: number): Promise<Icon | null> {
    const row = await this.dbInstance
      .selectFrom('icons')
      .where('id', '=', id)
      .selectAll()
      .executeTakeFirst();
    if (row) {
      const { id, name } = row;
      return {
        id,
        name,
      };
    }

    return null;
  }

  async getSpecialities(): Promise<Speciality[]> {
    const rows = await this.dbInstance.selectFrom('medicinal_product').selectAll().execute();
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
      .select(['sub.id', 'sub.name', 'sub.code', 'mp.elem_pharma', 'mp.dosage'])
      .execute();

    return rows.reduce<Substance[]>((carry, row) => {
      const { id, name, code, elem_pharma: pharmaForm, dosage } = row;
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

  async getSpecialityDescription(cisId: number): Promise<string | null> {
    const row = await this.dbInstance
      .selectFrom('description as d')
      .where('d.mp_id', '=', cisId)
      .leftJoin('medicinal_product as mp', 'd.mp_id', 'mp.id')
      .select(['d.description'])
      .executeTakeFirst();

    if (row) {
      const { description } = row;
      return description;
    }

    return null;
  }

  async getSingleSubstance(subCodeId: string): Promise<Substance | null> {
    const row = await this.dbInstance
      .selectFrom('substances')
      .where('code', '=', subCodeId)
      .selectAll()
      .executeTakeFirst();

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
    const rows = await this.dbInstance.selectFrom('substances').selectAll().execute();
    return rows.map(({ id, name, code }) => ({
      id,
      code,
      name,
    }));
  }
}
