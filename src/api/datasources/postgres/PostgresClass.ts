import { dbInstance } from './postgreDb';

export class PostgresDb {
  async getSingleSpeciality(cisId: string) {
    const row = await dbInstance
      .selectFrom('specialite')
      .where('cis', '=', cisId)
      .selectAll()
      // .leftJoin('icones as i', 'i.id', 's.icone_id')
      // .select(['s.cis', 's.id', 's.nom', 'i.nom as iconName', 'i.id as iconId'])
      .executeTakeFirst();

    if (row) {
      const { id, nom: name, icone_id: iconId } = row;
      return {
        id,
        cisId,
        name,
        iconId,
        description: 'TODO (imported from scrapping ?)',
      };
    }
  }

  async getIcon(id: number) {
    const row = await dbInstance
      .selectFrom('icones')
      .where('id', '=', id)
      .selectAll()
      .executeTakeFirst();
    if (row) {
      const { id, nom: name } = row;
      return {
        id,
        name,
      };
    }
  }

  async getSpecialities() {
    const rows = await dbInstance.selectFrom('specialite').selectAll().execute();
    return rows.map(({ id, nom: name, cis: cisId, icone_id: iconId }) => ({
      id,
      cisId,
      name,
      iconId,
    }));
  }

  async getSpecialitySubstances(cisId: number) {
    const rows = await dbInstance
      .selectFrom('specialite_substance as ss')
      .where('ss.specialite_id', '=', cisId)
      .leftJoin('substance as sub', 'sub.id', 'ss.substance_id')
      .select(['ss.substance_id', 'ss.elem_pharma', 'ss.dosage', 'sub.nom', 'sub.code'])
      .execute();

    return rows.map(({ substance_id: id, elem_pharma: pharmaForm, dosage, nom: name, code }) => ({
      id,
      code,
      name,
      dosage,
      pharmaForm,
    }));
  }

  async getSingleSubstance(subCodeId: string) {
    const row = await dbInstance
      .selectFrom('substance')
      .where('code', '=', subCodeId)
      .selectAll()
      .executeTakeFirst();

    if (row) {
      const { id, nom: name, code } = row;
      return {
        id,
        code,
        name,
        description: 'TODO (imported from scrapping ?)',
      };
    }
  }

  async getSubstances() {
    const rows = await dbInstance.selectFrom('substance').selectAll().execute();
    return rows.map(({ id, nom: name, code }) => ({
      id,
      code,
      name,
    }));
  }
}
