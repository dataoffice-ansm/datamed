import { EntityPageLayout } from '../../components/Layouts/EntityPageLayout/EntityPageLayout';
import { HeadlessHeroHeader } from '../../components/HeroHeader/HeadlessHeroHeader';
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
import GlobStatSvg from '../../assets/pictos/sick_transparent_person.svg';
import { Tooltip } from '../../components/Tooltip';
import { CardWithImage } from '../../components/CardWithImage';
import CommuniqueSvg from '../../assets/pictos/communique.svg';
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
import { SectionDataOrigin } from './DataOriginSection';

const SectionDemography = () => {
  const { repartitionPerAge, repartitionPerGender, exposition } = useGlobalDecPageContext();

  const globalDecAgeRep = useMemo(
    () => buildSortedRangeData<GlobalStatsUsagePerAge>(repartitionPerAge ?? [], 'number'),
    [repartitionPerAge]
  );

  return (
    <div className="GlobalStatisticDemographySection text-left">
      <BoxInfo
        title={`${numberWithThousand(exposition?.consumption ?? 0)} déclarations cumulées`}
        icon={<FolderSVG className="h-24 w-24" />}
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
        {exposition?.maxYear && exposition?.minYear
          ? `Cumul de toutes les déclarations d'effets indésirables suspectés, tous médicaments
          confondus, reçues par les centres régionaux de pharmacovigilance sur la période 
          ${exposition.minYear} - ${exposition.maxYear}`
          : 'Période des données issues non renseignée'}
      </BoxInfo>

      <Accordion
        className="shadow rounded-lg"
        theme="secondary-variant"
        classNameTitle="text-dark-green-900"
        title="Comment sont calculés ces indicateurs ? D’où viennent ces données ?"
      >
        <p>
          La pharmacovigilance est la surveillance, l’évaluation, la prévention et la gestion du
          risque d’effet indésirable résultant de l’utilisation des médicaments. Elle s’exerce en
          permanence, avant et après la commercialisation des médicaments, et constitue un élément
          essentiel du contrôle de la sécurité des médicaments.
        </p>
        <p>
          Afin de respecter la confidentialité des données des patients, si un critère (âge,
          sexe,...) représente moins de 11 cas, l&apos;information ne sera pas affichée avec ce
          niveau de détail. Les données manquantes ne sont pas affichées. Tenant compte de ces deux
          conditions, le total des pourcentages n&apos;atteint pas toujours les 100%.
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
            className="text-primary"
          >
            https://signalement.social-sante.gouv.fr
          </a>
        </p>

        <p className="text-md font-medium mt-8">
          Précision sur les déclarations d’effets indésirables
        </p>

        <CardWithImage contentClassName="!p-0" image={<CommuniqueSvg />}>
          <p>
            La déclaration en pharmacovigilance permet la détection de signal. Ces données
            déclaratives ne permettent pas d&apos;estimer la fréquence des effets indésirables, les
            déclarations ne sont ni exhaustives ni représentatives dans la population.
          </p>

          <p>
            Le nombre exact de patients traités n&apos;étant pas connu sur la période de déclaration
            l&apos;établissement de statistiques de fréquence d&apos;effets indésirables n&apos;est
            pas possible à partir des données de déclaration.
          </p>
          <p>
            Pour plus d’information, consultez :{' '}
            <a
              rel="external noreferrer"
              target="_blank"
              href="https://ansm.sante.fr/page/la-surveillance-renforcee-des-medicaments"
              className="text-primary"
            >
              https://ansm.sante.fr/page/la-surveillance-renforcee-des-medicaments
            </a>
          </p>
        </CardWithImage>
      </Accordion>

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
                    icon={<WomanIllustration className="w-24 sm:w-32" />}
                  />
                )}
                {repartitionPerGender?.male?.valuePercent && (
                  <GraphFigure
                    value={repartitionPerGender.male?.valuePercent}
                    valueClassName="mt-2 text-dark-green"
                    label="Hommes"
                    icon={<ManIllustration className="w-24 sm:w-32" />}
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
              data={globalDecAgeRep}
            />
          </GraphBox>
        </div>
      </div>
    </div>
  );
};

const SectionSeriousEffect = () => {
  const { exposition, repartitionPerGravity, repartitionPerSeriousEffect } =
    useGlobalDecPageContext();

  const globalDecGravityRep = useMemo(
    () => buildSortedRangeData<GlobalStatsUsagePerGravity>(repartitionPerGravity ?? [], 'number'),
    [repartitionPerGravity]
  );

  const globalDecSeriousEffectsRep = useMemo(
    () =>
      buildSortedRangeData<GlobalStatsUsagePerSeriousEffect>(
        repartitionPerSeriousEffect ?? [],
        'number'
      ),
    [repartitionPerSeriousEffect]
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
                <p>
                  La définition réglementaire de gravité en pharmacovigilance est très précise : un
                  effet indésirable grave est un effet indésirable létal, ou susceptible de mettre
                  la vie en danger, ou entraînant une invalidité ou une incapacité importantes ou
                  durables, ou provoquant ou prolongeant une hospitalisation, ou se manifestant par
                  une anomalie ou une malformation congénitale. Sont aussi pris en compte les
                  déclarations d&apos;effets indésirables ayant été jugés graves par le déclarant.
                </p>
                <p>
                  Les effets graves ont tendance à être plus déclarés que les cas non graves. Les
                  déclarations ne représentent pas la fréquence de survenue des effets indésirables.
                  Celle-ci étant précisée dans la notice du médicament.
                </p>
              </>
            }
          >
            <PieChartRepartition
              className="h-64 w-full flex justify-center items-center"
              theme="green"
              data={globalDecGravityRep}
            />
          </GraphBox>
        </div>

        <div className="flex-1">
          <GraphBox
            title="Répartition par cause de gravité"
            className="h-full max-w-[100%]"
            tooltip={
              <>
                <p>
                  La définition réglementaire de gravité en pharmacovigilance est très précise : un
                  effet indésirable grave est un effet indésirable létal, ou susceptible de mettre
                  la vie en danger, ou entraînant une invalidité ou une incapacité importantes ou
                  durables, ou provoquant ou prolongeant une hospitalisation, ou se manifestant par
                  une anomalie ou une malformation congénitale.
                </p>
                <p>
                  La catégorie &quot;Autre&quot; correspond aux déclarations d&apos;effets
                  indésirables ayant été jugés comme grave par le déclarant, mais ne rentrant pas
                  dans les catégories listées comme étant graves selon la définition réglementaire
                  de gravité en pharmacovigilance.
                </p>
              </>
            }
          >
            <BarChartRepartition
              className="h-64 w-full flex justify-center items-center"
              data={globalDecSeriousEffectsRep}
              dataLabel="Répartition par cause de gravité"
              theme="green-full"
            />
          </GraphBox>
        </div>
      </div>
    </div>
  );
};

const SectionRepartitionNotifiers = () => {
  const { exposition, repartitionPerNotifier } = useGlobalDecPageContext();

  const periodString =
    exposition?.minYear && exposition?.maxYear
      ? `Données issues de la période ${exposition.minYear} - ${exposition.maxYear}`
      : 'Période des données issues non renseignée';

  return (
    <>
      <SectionTitle title="Caractéristiques des déclarants" subTitle={periodString} />

      <GraphBoxSelect
        title="Répartition par type de déclarant d'effets indésirables"
        theme="secondary-variant"
        render={({ selectedUnitOption }) => {
          const globalDecNotifiersRep = buildSortedRangeData<GlobalStatsUsagePerNotifier>(
            repartitionPerNotifier ?? [],
            selectedUnitOption
          );

          return (
            <GraphFiguresGrid
              data={globalDecNotifiersRep}
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
    </>
  );
};

const SectionTypesOfSideEffects = () => {
  const { exposition, repartitionPerPathology } = useGlobalDecPageContext();

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
          comptabilisée dans chacun de ces SOC.{' '}
          <i>
            Par exemple, un mal de tête et acné seront comptabilisés chacun une fois dans
            “Affections du système nerveux” et “Affections de la peau et du tissu sous-cutané”.
          </i>
        </p>
        <p>
          À l&apos;inverse, si tous ces effets indésirables appartiennent au même SOC, ils ne seront
          comptabilisés qu&apos;une fois dans ce SOC.{' '}
          <i>
            Par exemple, de l’acné et de l’eczéma seront comptabilisés une seule fois dans le SOC
            “Affections de la peau et du tissu sous-cutané”. <br />
            Ils seront en revanche bien comptabilisés 2 fois dans le détail de ce SOC.
          </i>
        </p>
        <p>
          Sont affichés ici tous les SOC, ainsi que le détail du type d&apos;effet si les effectifs
          sont supérieurs ou égaux à 11, pour le respect de la confidentialité des données.
        </p>
      </Accordion>

      <GraphBoxSelect
        theme="secondary-variant"
        title="Répartition des déclarations d'effets indésirables par système d'organe"
        render={({ selectedUnitOption }) => {
          const globalDecPathologyRep = buildSortedRangeData<GlobalStatsUsagePerPathology>(
            repartitionPerPathology ?? [],
            selectedUnitOption
          );

          return (
            <GraphFiguresGrid
              data={globalDecPathologyRep}
              className="GraphBoxSelectContent"
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
          );
        }}
      />
    </div>
  );
};

export const GlobalStatisticPage = () => (
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
                La pharmacovigilance est la surveillance, l’évaluation, la prévention et la gestion
                du risque d’effet indésirable résultant de l’utilisation des médicaments. Elle
                s’exerce en permanence, avant et après la commercialisation des médicaments, et
                constitue un élément essentiel du contrôle de la sécurité des médicaments.
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
