import { SectionTitle } from '../../components/SectionTitle';
import { GraphBox } from '../../components/GraphBox/GraphBox';

export const SectionDataOrigin = () => (
  <div className="GlobalStatDataOriginSection text-left">
    <SectionTitle title="Origine des données" />

    <GraphBox>
      <div className="mb-8">
        <h4 className="mt-0 mb-2">Bases de données exploitées</h4>
        <p>
          Base Nationale de PharmacoVigilance : Base de données des déclarations de pharmacovigilance gérée par l’Agence Nationale de Sécurité du Médicament et des produits de santé.
        </p>
        <p>
          Base des erreurs médicamenteuses : Base de données regroupant tout l’historique des déclarations d’erreurs médicamenteuses, ayant entrainé un effet indésirable ou non.
        </p>
      </div>

      <div className="mb-8">
        <h4 className="mt-0 mb-2">D&apos;où viennent les données ? Quelle est leur nature ?</h4>
        <p>
          L'erreur médicamenteuse est une erreur non intentionnelle d'un professionnel de santé, d'un patient ou d'un tiers, selon le cas, survenue au cours du processus de soin impliquant un médicament, notamment lors de la prescription, de la dispensation ou de l'administration. L'erreur médicamenteuse peut être à l'origine d’un risque ou d'un événement indésirable pour le patient.
        </p>
        <p>
          Les données sur les erreurs médicamenteuses présentées ici, gérées par l’ANSM proviennent des déclarations soit de risque d’erreur soit d’erreurs médicamenteuses avec ou sans évènements indésirables. Elles sont déclarées par les patients ou les professionnels de santé, notamment via <a rel="external noreferrer"
                                                                                                                                                                                                                                                                                                         target="_blank"
                                                                                                                                                                                                                                                                                                         href="https://signalement.social-sante.gouv.fr">le portail des signalements</a>
        </p>
        <p>
          Les erreurs médicamenteuses se classent en fonction de l'étape de survenue (erreur de prescription, erreur de délivrance, erreur d’administration), de la cause de l'erreur (produit, humaine et technique) et de la nature de l'erreur (de médicament ou de patient).
        </p>

        <p>
          <a rel="external noreferrer"
             target="_blank"
             href="https://ansm.sante.fr/page/la-gestion-des-erreurs-medicamenteuses">En savoir plus sur le site de l'ANSM</a>
        </p>
      </div>

      <div className="mb-8">
        <h4 className="mt-0 mb-2">Avertissement</h4>
        <p>
          Les données affichées sur les effets indésirables sont basées sur des déclarations spontanées que font les patients ou les professionnels de santé. Elles concernent les effets suspectés d’être liés à l’utilisation d’un ou plusieurs médicaments et les mésusages, abus ou erreurs médicamenteuses.
        </p>
        <p>
          Ces déclarations sont analysées par des experts afin de détecter des signaux en pharmacovigilance.
          Ce système déclaratif ne permet pas d'être exhaustif et de déterminer la fréquence de survenue des effets indésirables liés à l'exposition d'un médicament.
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
