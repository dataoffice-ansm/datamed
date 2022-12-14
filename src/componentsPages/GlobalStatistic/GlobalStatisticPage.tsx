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
        title={`${exposition?.consumption ?? 'Aucune'} D??claration(s) cumul??e(s)`}
        icon={<FolderSVG />}
        theme="dark-green"
        className="my-8"
        // tooltip={
        //   <div>
        //     <strong>D??clarations cumul??es</strong>
        //     <div>
        //       Travail r??alis?? sur une extraction de 5 ans de la BNPV, avec objectif de mise ?? jour
        //       progressive des donn??es.
        //     </div>
        //   </div>
        // }
      >
        Cumul de toutes les d??clarations d&apos;effets ind??sirables suspect??s, tous m??dicaments
        confondus, re??ues par les centres r??gionaux de pharmacovigilance sur la p??riode consid??r??e
      </BoxInfo>
      <SectionTitle
        title="Caract??ristiques des patients"
        subTitle={
          exposition?.maxYear && exposition?.minYear
            ? `Donn??es issues de la p??riode ${exposition.minYear} - ${exposition.maxYear}`
            : 'P??riode des donn??es issues non renseign??e'
        }
      />
      <div className="flex flex-shrink flex-col md:flex-row gap-8 mb-8 m-auto mt-8">
        <div className="flex-1 flex-shrink">
          <GraphBox
            title="R??partition par sexe des patients trait??s"
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
            title="R??partition par ??ge des patients trait??s"
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
        title="D??clarations d'effets ind??sirables suspect??s graves et non graves"
        subTitle={
          exposition?.maxYear && exposition?.minYear
            ? `Donn??es issues de la p??riode ${exposition.minYear} - ${exposition.maxYear}`
            : 'P??riode des donn??es issues non renseign??e'
        }
      />

      <div className="flex flex-col gap-8 mb-8 m-auto mt-8">
        <div className="flex-1">
          <GraphBox
            title="R??partition par gravit??"
            className="h-full max-w-[100%]"
            tooltip={
              <>
                <div className="font-medium mb-4 text-lg">
                  Mesures prises pour palier ou pr??venir les ruptures de stock
                </div>
                <div>
                  Lorsqu???un signalement arrive ?? l???ANSM, est mise en place une ??valuation afin de
                  d??terminer les mesures les plus adapt??es pour pallier l???insuffisance de stock.
                  Plusieurs mesures peuvent ??tre mobilis??es pour une m??me situation de risque ou de
                  rupture de stock, aussi le total peut d??passer 100%.
                </div>
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
            title="D??tail des d??clarations d'effets ind??sirables graves"
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
      title="R??partition par type de d??clarants"
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
        title="Effets ind??sirables par syst??me d'organes"
        subTitle={
          exposition?.maxYear && exposition?.minYear
            ? `Donn??es issues de la p??riode ${exposition.minYear} - ${exposition.maxYear}`
            : 'P??riode des donn??es issues non renseign??e'
        }
      />
      <Accordion
        title="Comment sont calcul??s ces indicateurs ? D'o?? viennent ces donn??es ?"
        theme="secondary-variant"
        classNameTitle="text-dark-green-900"
        className="my-8 shadow"
      >
        <p>
          Les effets ind??sirables peuvent ??tre regroup??s et class??s selon l&apos;organe concern??. 27
          syst??mes d&apos;organes ont ??t?? d??finis (<strong>Syst??me Organe Classe ou SOC</strong>).
        </p>
        <p>
          Si une d??claration concerne des effets ind??sirables appartenant ?? plusieurs SOC, elle sera
          comptabilis??e dans chacun de ces SOC. ?? l&apos;inverse, si tous ces effets ind??sirables
          appartiennent au m??me SOC, ils ne seront comptabilis??s qu&apos;une fois.
        </p>
        <p>
          Sont affich??s ici tous les SOC, ainsi que le d??tail du type d&apos;effet si les effectifs
          sont sup??rieurs ou ??gaux ?? 11.
        </p>
      </Accordion>

      <GraphBoxSelect
        theme="secondary-variant"
        title="R??partition des d??clarations d'effets ind??sirables par syst??me d'organe"
        render={({ selectedUnitOption }) => {
          const repartitionPerPathology = buildSortedRangeData<GlobalStatsUsagePerPathology>(
            globalDec.repartitionPerPathology,
            selectedUnitOption
          );

          return (
            <div className="GraphBoxSelectContent">
              <div className="font-medium text-lg md:text-xl lg:text-2xl mt-2 mb-6 px-4">
                Parmi les{' '}
                <span className="text-dark-green-900 font-medium">{exposition?.consumption}</span>{' '}
                d??clarations d&apos;effets ind??sirables pour
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
      <SectionTitle title="Origine des donn??es" />
      <div className="flex flex-col justify-center bg-white rounded shadow p-6 mb-4">
        <Section title="Bases de donn??es exploit??es">
          <strong>Base Nationale de PharmacoVigilance</strong> : Base de donn??es des d??clarations de
          pharmacovigilance g??r??e par l&apos;Agence Nationale de S??curit?? du M??dicament et des
          produits de sant??. Open Medic : Base de donn??es ouvertes par la Caisse Nationale
          d&apos;Assurance Maladie.
        </Section>
        <Section title="D'o?? viennent les donn??es ? Quelle est leur nature ?">
          <p>
            La pharmacovigilance est la surveillance, l&apos;??valuation, la pr??vention et la gestion
            du risque d&apos;effet ind??sirable r??sultant de l&apos;utilisation des m??dicaments. Elle
            s&apos;exerce en permanence, avant et apr??s la commercialisation des m??dicaments, et
            constitue un ??l??ment essentiel du contr??le de la s??curit?? des m??dicaments.
          </p>
          <p>
            Afin de respecter la confidentialit?? des donn??es des patients, si un crit??re (??ge,
            sexe,...) repr??sente moins de 11 cas, l&apos;information ne sera pas affich??e avec ce
            niveau de d??tail.
          </p>
          <p>
            Ces donn??es sont issues de la Base Nationale de Pharmacovigilance (BNPV), qui est la
            base de donn??es de l&apos;ANSM aliment??e par les Centres R??gionaux de Pharmacovigilance
            (CRPV). Elle inclut l&apos;ensemble des d??clarations suspect??es comme ??tant en lien avec
            l&apos;usage d&apos;un ou plusieurs m??dicaments. Ces derni??res sont notifi??es par les
            professionnels de sant?? ou par les patients et association agr????es via un portail d??di??:{' '}
            <a
              rel="external noreferrer"
              target="_blank"
              href="https://signalement.social-sante.gouv.fr"
            >
              https://signalement.social-sante.gouv.fr
            </a>
          </p>
          <p>
            Estimations obtenues ?? partir des donn??es Open-Medic portant sur le nombre de patients
            ayant b??n??fici?? d&apos;un remboursement du m??dicament d??livr?? en pharmacie de ville.
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
            Les donn??es affich??es sur les effets ind??sirables sont bas??es sur des d??clarations
            spontan??es que font les patients ou les professionnels de sant??. Elles concernent les
            effets suspect??s d&apos;??tre li??s ?? l&apos;utilisation d&apos;un ou plusieurs
            m??dicaments et les m??susages, abus ou erreurs m??dicamenteuses.
          </p>
          <p>
            Ces d??clarations sont analys??es par des experts afin de d??tecter des signaux en
            pharmacovigilance. Ce syst??me d??claratif ne permet pas d&apos;??tre exhaustif et de
            d??terminer la fr??quence de survenue des effets ind??sirables li??s ?? l&apos;exposition
            d&apos;un m??dicament.
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
          label: 'D??MOGRAPHIE',
          content: <SectionDemography />,
        },
        {
          id: 'effets-grave-et-non-graves',
          label: 'effets graves et non graves',
          content: <SectionSeriousEffect />,
        },
        {
          id: 'declarants',
          label: 'D??clarants',
          content: <SectionRepartitionNotifiers />,
        },
        {
          id: 'types-effets-indesirables',
          label: "TYPES D'EFFETS IND??SIRABLES",
          content: <SectionTypesOfSideEffects />,
        },
        {
          id: 'originine-des-donnees',
          label: 'ORIGINE DES DONN??ES',
          content: <SectionDataOrigin />,
        },
      ]}
      render={(content) => content}
    >
      <HeadlessHeroHeader
        theme="bg-secondary-variant"
        icon={<GlobStatSvg className="h-full" />}
        backNavigationLabel="Donn??es globales"
        title="D??clarations d'effets ind??sirables suspect??s"
        description="Statistiques globales"
        textColor="text-black"
        backNavigationIconColor="fill-black"
        tooltip={
          <Tooltip
            placement="bottom"
            content={
              <div className="p-4 max-w-md">
                <div className="font-medium mb-4 text-lg">Qu???est-ce que la pharmacovigilance ?</div>
                <div>
                  La pharmacovigilance est la surveillance, l?????valuation, la pr??vention et la
                  gestion du risque d???effet ind??sirable r??sultant de l???utilisation des m??dicaments.
                  Elle s???exerce en permanence, avant et apr??s la commercialisation des m??dicaments,
                  et constitue un ??l??ment essentiel du contr??le de la s??curit?? des m??dicaments.
                </div>
              </div>
            }
            render={(refCb) => (
              <span ref={refCb} className="underline cursor-help">
                Qu???est-ce que la pharmacovigilance ?
              </span>
            )}
          />
        }
      />
    </EntityPageLayout>
  );
};
