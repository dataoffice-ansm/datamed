import { EntityPageLayout } from '../../components/Layouts/EntityPageLayout/EntityPageLayout';
import { HeadlessHeroHeader } from '../../components/HeroHeader/HeadlessHeroHeader';
import Page404 from '../../pages/[404]';
import { NotEnoughData } from '../../components/NotEnoughData';
import { GraphBox } from '../../components/GraphBox/GraphBox';
import { GraphFigure } from '../../components/GraphFigure';
import WomanIllustration from '../../assets/pictos/woman_illustration.svg';
import ManIllustration from '../../assets/pictos/man_illustration.svg';
import { PieChartRepartitionAge } from '../../components/Charts/PieChartRepartitionAge';
import FolderSVG from '../../assets/pictos/folder.svg';
import { BoxInfo } from '../../components/BoxInfo';
import { SectionTitle } from '../../components/SectionTitle';
import { PieChartGlobalStatisticSeriousEffects } from '../../components/Charts/PieChartGlobalStatisticSeriousEffects';
import { getNotifierIconByJobName, getSideEffectPathologyIcon } from '../../utils/iconsMapping';
import { GraphFiguresGrid } from '../../components/GraphFiguresGrid';
import { GraphBoxSelect } from '../../components/GraphBoxSelect';
import { Accordion } from '../../components/Accordion/Accordion';
import type { HTMLAttributes } from 'react';
import classnames from 'classnames';
import GlobStatSvg from '../../assets/pictos/sick_transparent_person.svg';
import { Tooltip } from '../../components/Tooltip/Tooltip';
import { useGlobalDecPageContext } from '../../contexts/GlobaleDecPageContext';

const SectionDemography = () => {
  const { globalDec } = useGlobalDecPageContext();
  const { repartitionPerAge, repartitionPerGender, totalExposition } = globalDec;

  return (
    <div className="GlobalStatisticDemographySection text-left">
      <BoxInfo
        title={`${totalExposition?.total ?? 'Aucune'} Déclaration(s) cumulée(s)`}
        icon={<FolderSVG />}
        theme="dark-green"
        className="my-8"
        tooltip={
          <div>
            <strong>Déclarations cumulées</strong>
            <div>
              Travail réalisé sur une extraction de 5 ans de la BNPV, avec objectif de mise à jour
              progressive des données.
            </div>
          </div>
        }
      >
        Cumul de toutes les déclarations d&apos;effets indésirables suspectés, tous médicaments
        confondus, reçues par les centres régionaux de pharmacovigilance sur la période considérée
      </BoxInfo>
      <SectionTitle
        title="Caractéristiques des patients"
        subTitle={
          totalExposition?.maxYear && totalExposition?.minYear
            ? `Données issues de la période ${totalExposition.minYear} - ${totalExposition.maxYear}`
            : 'Période des données issues non renseignée'
        }
      />
      <div className="flex flex-shrink flex-col md:flex-row gap-8 mb-8 m-auto mt-8">
        <div className="flex-1 flex-shrink">
          <GraphBox
            title="Répartition par sexe des patients traités"
            className="h-full max-w-[100%]"
          >
            {repartitionPerGender?.female && repartitionPerGender?.male ? (
              <div className="mt-8 flex gap-8 justify-center items-center">
                {repartitionPerGender?.female?.valuePercent && (
                  <GraphFigure
                    value={repartitionPerGender?.female?.valuePercent}
                    description="Femmes"
                    valueClassName="mt-2 text-dark-green"
                    icon={<WomanIllustration className="w-32" />}
                  />
                )}
                {repartitionPerGender?.male?.valuePercent && (
                  <GraphFigure
                    value={repartitionPerGender.male?.valuePercent}
                    valueClassName="mt-2 text-dark-green"
                    description="Hommes"
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
            <PieChartRepartitionAge
              theme="secondary-variant"
              className="h-64 w-full flex justify-center items-center"
              ageData={repartitionPerAge}
            />
          </GraphBox>
        </div>
      </div>
    </div>
  );
};

const SectionSeriousEffect = () => {
  const { globalDec } = useGlobalDecPageContext();
  const { totalExposition, repartitionPerSeriousEffect, repartitionPerGravity } = globalDec;

  return (
    <div className="GlobalStatisticSeriousEffectSection text-left">
      <SectionTitle
        title="Déclarations d'effets indésirables suspectés graves et non graves"
        subTitle={
          totalExposition?.maxYear && totalExposition?.minYear
            ? `Données issues de la période ${totalExposition.minYear} - ${totalExposition.maxYear}`
            : 'Période des données issues non renseignée'
        }
      />
      <div className="flex flex-col gap-8 mb-8 m-auto mt-8">
        <div className="flex-1">
          <GraphBox title="Répartition par gravité" className="h-full max-w-[100%]">
            <PieChartGlobalStatisticSeriousEffects
              className="h-64 w-full flex justify-center items-center"
              seriousEffectData={repartitionPerGravity}
            />
          </GraphBox>
        </div>

        <div className="flex-1">
          <GraphBox
            title="Détail des déclarations d'effets indésirables graves"
            className="h-full max-w-[100%]"
          >
            <PieChartGlobalStatisticSeriousEffects
              className="h-64 w-full flex justify-center items-center"
              seriousEffectData={repartitionPerSeriousEffect}
            />
          </GraphBox>
        </div>
      </div>
    </div>
  );
};

const SectionRepartitionNotifiers = () => {
  const { globalDec } = useGlobalDecPageContext();
  const { repartitionPerNotifier } = globalDec;

  return (
    <GraphBoxSelect
      title="Répartition par type de déclarants"
      theme="secondary-variant"
      render={(selectedOption) => (
        <GraphFiguresGrid
          data={
            repartitionPerNotifier?.filter(
              (notifier) =>
                notifier?.job &&
                notifier?.value !== undefined &&
                notifier?.value !== null &&
                notifier?.valuePercent !== undefined &&
                notifier?.valuePercent !== null
            ) ?? []
          }
          renderItem={(notifier) =>
            notifier?.id && notifier.job ? (
              <GraphFigure
                key={notifier.id}
                className="NotifierRepartitionFigure"
                unit={selectedOption === 'percent' ? ' % ' : ''}
                description={notifier.job}
                icon={getNotifierIconByJobName(notifier.job)}
                valueClassName="text-dark-green-900"
                value={(selectedOption === 'percent' ? notifier.valuePercent : notifier.value) ?? 0}
              />
            ) : null
          }
        />
      )}
    />
  );
};

const SectionTypesOfSideEffects = () => {
  const { globalDec } = useGlobalDecPageContext();
  const { repartitionPerPathology, totalExposition } = globalDec;

  return (
    <div className="GlobalStatTypesOfSideEffects text-left">
      <SectionTitle
        title="Effets indésirables par système d'organes"
        subTitle={
          totalExposition?.maxYear && totalExposition?.minYear
            ? `Données issues de la période ${totalExposition.minYear} - ${totalExposition.maxYear}`
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
        render={(selectedOption) => (
          <div className="GraphBoxSelectContent">
            <div className="font-medium text-lg md:text-xl lg:text-2xl mt-2 mb-6 px-4">
              Parmi les{' '}
              <span className="text-dark-green-900 font-medium">{totalExposition?.total}</span>{' '}
              déclarations d&apos;effets indésirables pour
              <span className="text-dark-green-900 font-medium"> au global</span>:
            </div>

            <GraphFiguresGrid
              data={
                repartitionPerPathology?.filter(
                  (pathologyRepartition) =>
                    pathologyRepartition?.range &&
                    pathologyRepartition?.value !== undefined &&
                    pathologyRepartition?.value !== null &&
                    pathologyRepartition?.valuePercent !== undefined &&
                    pathologyRepartition?.valuePercent !== null
                ) ?? []
              }
              renderItem={(pathologyRepartition) =>
                pathologyRepartition?.range &&
                pathologyRepartition?.value &&
                pathologyRepartition?.valuePercent ? (
                  <GraphFigure
                    className="pathologyGraphFigure"
                    unit={selectedOption === 'percent' ? ' % ' : ''}
                    description={pathologyRepartition.range}
                    icon={getSideEffectPathologyIcon(pathologyRepartition.id)}
                    valueClassName="text-dark-green-900"
                    value={
                      selectedOption === 'percent'
                        ? pathologyRepartition.valuePercent
                        : pathologyRepartition.value
                    }
                  />
                ) : null
              }
            />
          </div>
        )}
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
              <div className="p-4 max-w-md">
                <div className="font-medium mb-4 text-lg">Qu’est-ce que la pharmacovigilance ?</div>
                <div>
                  La pharmacovigilance est la surveillance, l’évaluation, la prévention et la
                  gestion du risque d’effet indésirable résultant de l’utilisation des médicaments.
                  Elle s’exerce en permanence, avant et après la commercialisation des médicaments,
                  et constitue un élément essentiel du contrôle de la sécurité des médicaments.
                </div>
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
