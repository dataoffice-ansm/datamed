import { EntityPageLayout } from '../../components/Layouts/EntityPageLayout/EntityPageLayout';
import { HeadlessHeroHeader } from '../../components/HeroHeader/HeadlessHeroHeader';
import Page404 from '../../pages/[404]';
import { NotEnoughData } from '../../components/NotEnoughData';
import { GraphBox } from '../../components/GraphBox/GraphBox';
import { GraphFigure } from '../../components/GraphFigure';
import WomanIllustration from '../../assets/pictos/woman_illustration.svg';
import ManIllustration from '../../assets/pictos/man_illustration.svg';
import { PieChartRepartition } from '../../components/Charts/PieChartRepartition';
import FolderSVG from '../../assets/pictos/folder.svg';
import { BoxInfo } from '../../components/BoxInfo';
import { SectionTitle } from '../../components/SectionTitle';
import { BarChartRepartition } from '../../components/Charts/BarChartRepartition';
import { getNotifierIcon, getSideEffectPathologyIconByName } from '../../utils/iconsMapping';
import { GraphFiguresGrid } from '../../components/GraphFiguresGrid';
import { GraphBoxSelect } from '../../components/GraphBoxSelect';
import { Accordion } from '../../components/Accordion';
import type { HTMLAttributes } from 'react';
import classnames from 'classnames';
import GlobStatSvg from '../../assets/pictos/sick_transparent_person.svg';
import { Tooltip } from '../../components/Tooltip/Tooltip';
import { useGlobalDecPageContext } from '../../contexts/GlobaleDecPageContext';
import { useMemo } from 'react';
import { buildSortedRangeData } from '../../utils/entities';
import {
  type GlobalStatsUsagePerAge,
  type GlobalStatsUsagePerGravity,
  type GlobalStatsUsagePerNotifier,
  type GlobalStatsUsagePerPathology,
  type GlobalStatsUsagePerSeriousEffect,
} from '../../graphql/__generated__/generated-documents';
import { numberWithThousand } from '../../utils/format';

const SectionDemography = () => {
  const { globalDec } = useGlobalDecPageContext();
  const { repartitionPerGender, exposition } = globalDec;

  const repartitionPerAge = useMemo(
    () => buildSortedRangeData<GlobalStatsUsagePerAge>(globalDec.repartitionPerAge, 'number'),
    [globalDec.repartitionPerAge]
  );

  return (
    <div className="GlobalStatisticDemographySection text-left">
      <BoxInfo
        title={`${exposition?.consumption ?? 'Aucune'} Déclaration(s) cumulée(s)`}
        icon={<FolderSVG />}
        theme="dark-green"
        className="my-8"
        // tooltip={
        //   <div>
        //     <strong>Déclarations cumulées</strong>
        //     <div>
        //       Travail réalisé sur une extraction de 5 ans de la BNPV, avec objectif de mise à jour
        //       progressive des données.
        //     </div>
        //   </div>
        // }
      >
        Cumul de toutes les déclarations d&apos;effets indésirables suspectés, tous médicaments
        confondus, reçues par les centres régionaux de pharmacovigilance sur la période considérée
      </BoxInfo>
      <SectionTitle
        title="Caractéristiques des patients"
        subTitle={
          exposition?.maxYear && exposition?.minYear
            ? `Données issues de la période ${exposition.minYear} - ${exposition.maxYear}`
            : 'Période des données issues non renseignée'
        }
      />
      <div className="flex flex-shrink flex-col md:flex-row gap-8 mb-8 m-auto mt-8">
        <div className="flex-1 flex-shrink">
          <GraphBox
            title="Répartition par sexe des patients traités"
            className="h-full max-w-[100%]"
          >
            {repartitionPerGender?.female?.valuePercent !== 0 &&
            repartitionPerGender?.male?.valuePercent !== 0 ? (
              <div className="mt-8 flex gap-8 justify-center items-center">
                {repartitionPerGender?.female?.valuePercent && (
                  <GraphFigure
                    value={repartitionPerGender?.female?.valuePercent}
                    label="Femmes"
                    valueClassName="mt-2 text-dark-green"
                    icon={<WomanIllustration className="w-32" />}
                  />
                )}
                {repartitionPerGender?.male?.valuePercent && (
                  <GraphFigure
                    value={repartitionPerGender.male?.valuePercent}
                    valueClassName="mt-2 text-dark-green"
                    label="Hommes"
                    icon={<ManIllustration className="w-32" />}
                  />
                )}
              </div>
            ) : (
              <div className="w-full flex justify-center items-center">
                <NotEnoughData />
              </div>
            )}
          </GraphBox>
        </div>
        <div className="flex-1 flex-shrink">
          <GraphBox
            title="Répartition par âge des patients traités"
            className="h-full max-w-[100%]"
          >
            <PieChartRepartition
              theme="green"
              className="h-64 w-full flex justify-center items-center"
              data={repartitionPerAge}
            />
          </GraphBox>
        </div>
      </div>
    </div>
  );
};

const SectionSeriousEffect = () => {
  const { globalDec } = useGlobalDecPageContext();
  const { exposition } = globalDec;

  const repartitionPerGravity = useMemo(
    () =>
      buildSortedRangeData<GlobalStatsUsagePerGravity>(globalDec.repartitionPerGravity, 'number'),
    [globalDec.repartitionPerGravity]
  );

  const repartitionPerSeriousEffect = useMemo(
    () =>
      buildSortedRangeData<GlobalStatsUsagePerSeriousEffect>(
        globalDec.repartitionPerSeriousEffect,
        'number'
      ),
    [globalDec.repartitionPerSeriousEffect]
  );

  return (
    <div className="GlobalStatisticSeriousEffectSection text-left">
      <SectionTitle
        title="Déclarations d'effets indésirables suspectés graves et non graves"
        subTitle={
          exposition?.maxYear && exposition?.minYear
            ? `Données issues de la période ${exposition.minYear} - ${exposition.maxYear}`
            : 'Période des données issues non renseignée'
        }
      />

      <div className="flex flex-col gap-8 mb-8 m-auto mt-8">
        <div className="flex-1">
          <GraphBox
            title="Répartition par gravité"
            className="h-full max-w-[100%]"
            tooltip={
              <>
                <p className="font-medium mb-4 text-lg">Répartition par gravité</p>
                <b>
                  <p>Non grave</p>
                </b>
                <p>Tout effet indésirable qui n&apos;est pas grave</p>

                <b>
                  <p>Grave</p>
                </b>
                <p>
                  Un effet indésirable est grave en cas de décès, de mise en jeu du pronostic vital,
                  d&apos;hospitalisation ou prolongement d&apos;hospitalisation, d&apos;invalidité
                  ou d&apos;incapacité importante ou durable, d&apos;anomalie ou de malformation
                  congénitale, ou s&apos;il est considéré comme médicalement pertinent{' '}
                </p>
              </>
            }
          >
            <PieChartRepartition
              className="h-64 w-full flex justify-center items-center"
              theme="green"
              data={repartitionPerGravity}
            />
          </GraphBox>
        </div>

        <div className="flex-1">
          <GraphBox
            title="Détail des déclarations d'effets indésirables graves"
            className="h-full max-w-[100%]"
          >
            <BarChartRepartition
              className="h-64 w-full flex justify-center items-center"
              data={repartitionPerSeriousEffect}
              theme="green-full"
            />
          </GraphBox>
        </div>
      </div>
    </div>
  );
};

const SectionRepartitionNotifiers = () => {
  const { globalDec } = useGlobalDecPageContext();

  return (
    <GraphBoxSelect
      title="Répartition par type de déclarants"
      theme="secondary-variant"
      render={({ selectedUnitOption }) => {
        const repartitionPerNotifier = buildSortedRangeData<GlobalStatsUsagePerNotifier>(
          globalDec.repartitionPerNotifier,
          selectedUnitOption
        );

        return (
          <GraphFiguresGrid
            data={repartitionPerNotifier}
            renderItem={(notifier) => (
              <GraphFigure
                key={notifier.id}
                className="NotifierRepartitionFigure"
                unit={selectedUnitOption === 'percent' ? ' % ' : ''}
                label={notifier.job}
                icon={getNotifierIcon(notifier.id)}
                valueClassName="text-dark-green-900"
                value={
                  (selectedUnitOption === 'percent' ? notifier.valuePercent : notifier.value) ?? 0
                }
              />
            )}
          />
        );
      }}
    />
  );
};

const SectionTypesOfSideEffects = () => {
  const { globalDec } = useGlobalDecPageContext();
  const { exposition } = globalDec;
  return (
    <div className="GlobalStatTypesOfSideEffects text-left">
      <SectionTitle
        title="Effets indésirables par système d'organes"
        subTitle={
          exposition?.maxYear && exposition?.minYear
            ? `Données issues de la période ${exposition.minYear} - ${exposition.maxYear}`
            : 'Période des données issues non renseignée'
        }
      />
      <Accordion
        title="Comment sont calculés ces indicateurs ? D'où viennent ces données ?"
        theme="secondary-variant"
        classNameTitle="text-dark-green-900"
        className="my-8 shadow"
      >
        <p>
          Les effets indésirables peuvent être regroupés et classés selon l&apos;organe concerné. 27
          systèmes d&apos;organes ont été définis (<strong>Système Organe Classe ou SOC</strong>).
        </p>
        <p>
          Si une déclaration concerne des effets indésirables appartenant à plusieurs SOC, elle sera
          comptabilisée dans chacun de ces SOC. À l&apos;inverse, si tous ces effets indésirables
          appartiennent au même SOC, ils ne seront comptabilisés qu&apos;une fois.
        </p>
        <p>
          Sont affichés ici tous les SOC, ainsi que le détail du type d&apos;effet si les effectifs
          sont supérieurs ou égaux à 11.
        </p>
      </Accordion>

      <GraphBoxSelect
        theme="secondary-variant"
        title="Répartition des déclarations d'effets indésirables par système d'organe"
        render={({ selectedUnitOption }) => {
          const repartitionPerPathology = buildSortedRangeData<GlobalStatsUsagePerPathology>(
            globalDec.repartitionPerPathology,
            selectedUnitOption
          );

          return (
            <div className="GraphBoxSelectContent">
              <div className="font-medium text-lg md:text-xl lg:text-2xl mt-2 mb-6 px-4">
                Parmi les{' '}
                <span className="text-dark-green-900 font-medium">
                  {numberWithThousand(exposition?.consumption ?? 0)}
                </span>{' '}
                déclarations d&apos;effets indésirables pour
                <span className="text-dark-green-900 font-medium"> au global</span>:
              </div>

              <GraphFiguresGrid
                data={repartitionPerPathology}
                renderItem={(pathologyRepartition) =>
                  pathologyRepartition?.range &&
                  pathologyRepartition?.value &&
                  pathologyRepartition?.valuePercent ? (
                    <GraphFigure
                      className="pathologyGraphFigure"
                      unit={selectedUnitOption === 'percent' ? ' % ' : ''}
                      label={pathologyRepartition.range}
                      icon={getSideEffectPathologyIconByName(pathologyRepartition.range)}
                      valueClassName="text-dark-green-900"
                      value={
                        selectedUnitOption === 'percent'
                          ? pathologyRepartition.valuePercent
                          : pathologyRepartition.value
                      }
                    />
                  ) : null
                }
              />
            </div>
          );
        }}
      />
    </div>
  );
};

const SectionDataOrigin = () => {
  const Section = ({
    title,
    className,
    id,
    children,
  }: HTMLAttributes<HTMLDivElement> & { title: string }) => (
    <section id={id} className={classnames('mb-14', className)}>
      <div className="font-medium text-sm text-left mb-4">{title}</div>
      {children}
    </section>
  );

  return (
    <div className="GlobalStatDataOrigin text-left">
      <SectionTitle title="Origine des données" />
      <div className="flex flex-col justify-center bg-white rounded shadow p-6 mb-4">
        <Section title="Bases de données exploitées">
          <strong>Base Nationale de PharmacoVigilance</strong> : Base de données des déclarations de
          pharmacovigilance gérée par l&apos;Agence Nationale de Sécurité du Médicament et des
          produits de santé. Open Medic : Base de données ouvertes par la Caisse Nationale
          d&apos;Assurance Maladie.
        </Section>
        <Section title="D'où viennent les données ? Quelle est leur nature ?">
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
            Ces données sont issues de la Base Nationale de Pharmacovigilance (BNPV), qui est la
            base de données de l&apos;ANSM alimentée par les Centres Régionaux de Pharmacovigilance
            (CRPV). Elle inclut l&apos;ensemble des déclarations suspectées comme étant en lien avec
            l&apos;usage d&apos;un ou plusieurs médicaments. Ces dernières sont notifiées par les
            professionnels de santé ou par les patients et association agréées via un portail dédié:{' '}
            <a
              rel="external noreferrer"
              target="_blank"
              href="https://signalement.social-sante.gouv.fr"
            >
              https://signalement.social-sante.gouv.fr
            </a>
          </p>
          <p>
            Estimations obtenues à partir des données Open-Medic portant sur le nombre de patients
            ayant bénéficié d&apos;un remboursement du médicament délivré en pharmacie de ville.
            Pour plus d&apos;informations, consultez:{' '}
            <a
              rel="external noreferrer"
              target="_blank"
              href="http://open-data-assurance-maladie.ameli.fr/medicaments/index.php"
            >
              http://open-data-assurance-maladie.ameli.fr/medicaments/index.php
            </a>
          </p>
        </Section>
        <Section title="Avertissement">
          <p>
            Les données affichées sur les effets indésirables sont basées sur des déclarations
            spontanées que font les patients ou les professionnels de santé. Elles concernent les
            effets suspectés d&apos;être liés à l&apos;utilisation d&apos;un ou plusieurs
            médicaments et les mésusages, abus ou erreurs médicamenteuses.
          </p>
          <p>
            Ces déclarations sont analysées par des experts afin de détecter des signaux en
            pharmacovigilance. Ce système déclaratif ne permet pas d&apos;être exhaustif et de
            déterminer la fréquence de survenue des effets indésirables liés à l&apos;exposition
            d&apos;un médicament.
          </p>
          <p>
            Pour plus d&apos;informations, consultez:{' '}
            <a
              rel="external noreferrer"
              target="_blank"
              href="https://ansm.sante.fr/page/la-surveillance-renforcee-des-medicaments"
            >
              {' '}
              https://ansm.sante.fr/page/la-surveillance-renforcee-des-medicaments
            </a>
            et les bonnes pratiques de pharmacovigilance{' '}
            <a
              rel="external noreferrer"
              target="_blank"
              href="https://ansm.sante.fr/actualites/nouvelle-edition-des-bonnes-pratiques-de-pharmacovigilance"
            >
              https://ansm.sante.fr/actualites/nouvelle-edition-des-bonnes-pratiques-de-pharmacovigilance
            </a>
          </p>
        </Section>
      </div>
    </div>
  );
};

export const GlobalStatisticPage = () => {
  const { globalDec } = useGlobalDecPageContext();

  if (!globalDec) {
    return <Page404 />;
  }

  return (
    <EntityPageLayout
      colorMenu="green"
      sections={[
        {
          id: 'demographie',
          label: 'DÉMOGRAPHIE',
          content: <SectionDemography />,
        },
        {
          id: 'effets-grave-et-non-graves',
          label: 'effets graves et non graves',
          content: <SectionSeriousEffect />,
        },
        {
          id: 'declarants',
          label: 'Déclarants',
          content: <SectionRepartitionNotifiers />,
        },
        {
          id: 'types-effets-indesirables',
          label: "TYPES D'EFFETS INDÉSIRABLES",
          content: <SectionTypesOfSideEffects />,
        },
        {
          id: 'originine-des-donnees',
          label: 'ORIGINE DES DONNÉES',
          content: <SectionDataOrigin />,
        },
      ]}
      render={(content) => content}
    >
      <HeadlessHeroHeader
        theme="bg-secondary-variant"
        icon={<GlobStatSvg className="h-full" />}
        backNavigationLabel="Données globales"
        title="Déclarations d'effets indésirables suspectés"
        description="Statistiques globales"
        textColor="text-black"
        backNavigationIconColor="fill-black"
        tooltip={
          <Tooltip
            placement="bottom"
            content={
              <div className="max-w-md">
                <p className="font-medium mb-4 text-lg">Qu’est-ce que la pharmacovigilance ?</p>
                <p>
                  La pharmacovigilance est la surveillance, l’évaluation, la prévention et la
                  gestion du risque d’effet indésirable résultant de l’utilisation des médicaments.
                  Elle s’exerce en permanence, avant et après la commercialisation des médicaments,
                  et constitue un élément essentiel du contrôle de la sécurité des médicaments.
                </p>
              </div>
            }
            render={(refCb) => (
              <span ref={refCb} className="underline cursor-help">
                Qu’est-ce que la pharmacovigilance ?
              </span>
            )}
          />
        }
      />
    </EntityPageLayout>
  );
};
