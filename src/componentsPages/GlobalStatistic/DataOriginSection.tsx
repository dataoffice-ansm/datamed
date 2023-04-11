import { SectionTitle } from '../../components/SectionTitle';
import { GraphBox } from '../../components/GraphBox/GraphBox';

export const SectionDataOrigin = () => (
  <div className="GlobalStatDataOriginSection text-left">
    <SectionTitle title="Origine des données" />

    <GraphBox>
      <div className="mb-12">
        <h4 className="mt-0 mb-2">Bases de données exploitées</h4>
        <p>
          <strong>Base Nationale de PharmacoVigilance</strong> : Base de données des déclarations de
          pharmacovigilance gérée par l&apos;Agence Nationale de Sécurité du Médicament et des
          produits de santé.
        </p>
      </div>

      <div className="mb-12">
        <h4 className="mt-0 mb-2">D&apos;où viennent les données ? Quelle est leur nature ?</h4>
        <p>
          La pharmacovigilance est la surveillance, l&apos;évaluation, la prévention et la gestion
          du risque d&apos;effet indésirable résultant de l&apos;utilisation des médicaments. Elle
          s&apos;exerce en permanence, avant et après la commercialisation des médicaments, et
          constitue un élément essentiel du contrôle de la sécurité des médicaments.
        </p>
        <p>
          Afin de respecter la confidentialité des données des patients, si un critère (âge,
          sexe,...) représente moins de 11 cas, l&apos;information ne sera pas affichée avec ce
          niveau de détail.
        </p>
        <p>
          Ces données sont issues de la Base Nationale de Pharmacovigilance (BNPV), qui est la base
          de données de l&apos;ANSM alimentée par les Centres Régionaux de Pharmacovigilance (CRPV).
          Elle inclut l&apos;ensemble des déclarations suspectées comme étant en lien avec
          l&apos;usage d&apos;un ou plusieurs médicaments. Ces dernières sont notifiées par les
          professionnels de santé ou par les patients et association agréées via un portail dédié :{' '}
          <a
            rel="external noreferrer"
            target="_blank"
            href="https://signalement.social-sante.gouv.fr"
          >
            https://signalement.social-sante.gouv.fr
          </a>
        </p>
      </div>

      <div className="mb-12">
        <h4 className="mt-0 mb-2">Avertissements</h4>
        <p>
          <strong>
            Les données affichées sur les effets indésirables sont basées sur des déclarations
            spontanées
          </strong>{' '}
          que font les patients ou les professionnels de santé. Elles concernent les effets
          suspectés d&apos;être liés à l&apos;utilisation d&apos;un ou plusieurs médicaments et les
          mésusages, abus ou erreurs médicamenteuses.
        </p>
        <p>
          Ces déclarations sont analysées par des experts afin de{' '}
          <strong>détecter des signaux en pharmacovigilance</strong>. Ce système déclaratif ne
          permet pas d&apos;être exhaustif et de déterminer la fréquence de survenue des effets
          indésirables liés à l&apos;exposition d&apos;un médicament.
        </p>
        <p>
          Pour plus d&apos;informations, consultez :{' '}
          <a
            rel="external noreferrer"
            target="_blank"
            href="https://ansm.sante.fr/page/la-surveillance-renforcee-des-medicaments"
          >
            {' '}
            https://ansm.sante.fr/page/la-surveillance-renforcee-des-medicaments
          </a>{' '}
          et les bonnes pratiques de pharmacovigilance{' '}
          <a
            rel="external noreferrer"
            target="_blank"
            href="https://ansm.sante.fr/actualites/nouvelle-edition-des-bonnes-pratiques-de-pharmacovigilance"
          >
            https://ansm.sante.fr/actualites/nouvelle-edition-des-bonnes-pratiques-de-pharmacovigilance
          </a>
        </p>
      </div>
    </GraphBox>
  </div>
);
