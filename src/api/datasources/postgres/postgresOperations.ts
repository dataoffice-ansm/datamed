import { dbInstance } from './postgreDb';
import type { Speciality, Substance } from '../../graphql/__generated__/generated-types';

export class PostgresOperations {
  async getSingleSpeciality(cisId: string): Promise<Speciality | null> {
    const row = await dbInstance
      .selectFrom('medicinal_products as mp')
      .where('mp.cis', '=', cisId)

      .leftJoin('mp_atc as mp_a', 'mp.id', 'mp_a.mp_id')
      .leftJoin('descriptions as d', 'mp.id', 'd.mp_id')
      .leftJoin('marketing_authorization_status as mka_s', 'mka_s.id', 'mp.ma_status_id')
      .leftJoin('marketing_authorization_types as mka_t', 'mka_t.id', 'mp.ma_type_id')
      .leftJoin('laboratories as lab', 'lab.id', 'mp.laboratory_id')
      .leftJoin('icons as i', 'mp.icon_id', 'i.id')
      .select([
        'mp.id',
        'mp.cis as cisId',
        'mp.name',
        'mp_a.id as atcId',
        'mp_a.atc as actCode',
        'mp_a.atc_name as atcName',
        'mka_s.status as commercialisationState',
        'mka_t.type as commercialisationType',
        'lab.id as laboratoryId',
        'lab.name as laboratoryName',
        'mp.icon_id as iconId',
        'i.name as iconName',
        'd.description',
      ])
      .executeTakeFirst();

    if (row) {
      const {
        id,
        cisId,
        name,
        atcId,
        actCode,
        atcName,
        iconId,
        iconName,
        description,
        commercialisationState,
        commercialisationType,
        laboratoryId,
        laboratoryName,
      } = row;
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
        commercialisationState,
        commercialisationType,
        laboratory: laboratoryId
          ? {
              id: laboratoryId,
              name: laboratoryName,
            }
          : null,
      };
    }

    return null;
  }

  async getSpecialities(): Promise<Speciality[]> {
    const rows = await dbInstance.selectFrom('medicinal_products').selectAll().execute();
    // .finally(async () => dbInstance.destroy());

    return rows.map(({ id, name, cis: cisId, icon_id: iconId }) => ({
      id,
      cisId,
      name,
      iconId,
    }));
  }

  async getSpecialitySubstances(cisId: number): Promise<Substance[]> {
    const rows = await dbInstance
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
    const row = await dbInstance
      .selectFrom('substances')
      .where('code', '=', subCodeId)
      .selectAll()
      .executeTakeFirst();
    // .finally(async () => dbInstance.destroy());

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
    const rows = await dbInstance.selectFrom('substances').selectAll().execute();
    // .finally(async () => dbInstance.destroy());

    return rows.map(({ id, name, code }) => ({
      id,
      code,
      name,
    }));
  }
}
