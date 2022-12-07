import { EntityPageLayout } from '../../components/Layouts/EntityPageLayout/EntityPageLayout';
import { HeroHeader } from '../../components/HeroHeader/HeroHeader';
import type { EntitySub } from '../../contexts/EntityContext';
import { EntityContextProvider, useEntityContext } from '../../contexts/EntityContext';
import type { Substance } from '../../api/graphql/__generated__/generated-types';
import Page404 from '../../pages/[404]';
import { useSubstanceQuery } from '../../graphql/__generated__/generated-documents';
import { PaginatedList } from '../../components/PaginatedList/PaginatedList';
import Link from 'next/link';
import classnames from 'classnames';
import { SubstanceContainer } from '../../components/SubstancesContainer/SubstanceContainer';
import { NotEnoughData } from 'components/NotEnoughData';
import { Accordion } from '../../components/Accordion/Accordion';
import { cisExpositionLevelMapping } from '../../utils/mapping';
import PilIcon from '../../assets/images/gellule.svg';
import { numberWithThousand } from '../../utils/format';
import ManIllustration from '../../assets/images/man_illustration.svg';
import WomanIllustration from '../../assets/images/woman_illustration.svg';
import { PieChartRepartitionAge } from '../../components/Charts/PieChartRepartitionAge';
import { GraphBox } from '../../components/GraphBox/GraphBox';
import { GraphFigure } from '../../components/GraphFigure/GraphFigure';

const SectionTitle = ({ title }: { title: string }) => (
  <h2 className="text-2xl lg:text-3xl text-left">{title}</h2>
);

const SectionOneGlobalInformation = ({ substance }: { substance: Substance }) => {
  const { totalExposition, exposition, repartitionPerSex, repartitionPerAge } = substance;
  return (
    <div className="SectionTreatedPatients sectionPart mt-4 mb-8">
      <SectionTitle title="Patients traités en ville" />
      {totalExposition && (
        <div className="mt-0 mb-6">
          Données issues de la période {totalExposition?.minYear} - {totalExposition?.maxYear}
        </div>
      )}

      <Accordion
        defaultOpen
        className="shadow"
        theme="secondary"
        title="Comment sont calculés ces indicateurs ? D’où viennent ces données ?"
        classNameTitle="text-secondary"
      >
        <p>
          Estimations obtenues à partir des données Open-Medic portant sur le nombre de patients
          ayant bénéficié d’un remboursement du médicament délivré en pharmacie de ville. Pour plus
          d’informations, consultez:{' '}
          <a
            className="text-primary"
            href="http://open-data-assurance-maladie.ameli.fr/medicaments/index.php"
          >
            http://open-data-assurance-maladie.ameli.fr/medicaments/index.php
          </a>
        </p>
        <p>
          <strong>Mode de calcul:</strong> Pour une même substance active ou une spécialité de
          médicament, lorsque le patient achète différents conditionnements, le décompte
          correspondra à la somme des types de conditionnements remboursés pour ce patient.
        </p>
        <p>
          Par exemple, la spécialité Doliprane 500 mg, gélule, un patient qui aura acheté 2 boîtes
          de 16 gélules et 3 boîtes de 100 gélules au cours de l’année 2016 sera comptabilisé 2 fois
          pour 2016.
        </p>
        <p>
          La donnée statistique présentée ci-dessous est une moyenne annuelle et arrondie, du nombre
          de remboursements de médicament par patient et par conditionnement de médicament par année
          civile.
        </p>
      </Accordion>

      {exposition?.consumption ? (
        <div className="expositionChart my-4 flex rounded-lg shadow bg-white overflow-hidden">
          <div className="expositionChartLeft flex flex-col items-center justify-between p-4 min:h-20 flex-1 bg-secondary-900 py-6">
            <span className="text-white">
              {
                cisExpositionLevelMapping[
                  exposition?.expositionLevel as keyof typeof cisExpositionLevelMapping
                ]
              }
            </span>

            <div className="UsageBarContainer mt-12 flex justify-center items-end gap-2">
              {[...Array(5).keys()].map((pos) => (
                <div
                  key={pos}
                  className={classnames(
                    `UsageBarLevel${pos}`,
                    'relative w-6 bg-white border border-solid border-gray-200'
                  )}
                  style={{ height: 20 + 10 * pos }}
                >
                  {exposition?.expositionLevel === pos + 1 && (
                    <div className="bouncingPil animate-bounce absolute -top-8">
                      <PilIcon className="w-6 h-6" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="expositionChartRight flex flex-col flex-3 px-4 py-2">
            <h3 className="text-secondary-900">
              {numberWithThousand(exposition?.consumption)} / an
            </h3>
            <p>
              Approximation du nombre de patients ayant été remboursés sur la période 2014-2018 pour
              une substance active ou une spécialité de médicament.
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-white p-4 shadow rounded-lg mt-8">
          <NotEnoughData />
        </div>
      )}

      <div className="flex flex-shrink flex-col md:flex-row gap-8 mb-8 m-auto">
        <div className="flex-1 flex-shrink">
          <GraphBox
            title="Répartition par sexe des patients traités"
            className="h-full max-w-[100%]"
          >
            {repartitionPerSex?.female && repartitionPerSex?.male ? (
              <div className="mt-8 flex gap-8 justify-center items-center">
                {repartitionPerSex?.female && (
                  <GraphFigure
                    value={repartitionPerSex?.female}
                    description="Femmes"
                    valueClassName="mt-2 text-secondary"
                    icon={<WomanIllustration />}
                  />
                )}
                {repartitionPerSex?.male && (
                  <GraphFigure
                    value={repartitionPerSex.male}
                    valueClassName="mt-2 text-secondary"
                    description="Hommes"
                    icon={<ManIllustration />}
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
              theme="secondary"
              className="h-64 w-full flex justify-center items-center"
              ageData={repartitionPerAge}
            />
          </GraphBox>
        </div>
      </div>
    </div>
  );
};

const SectionTwo = ({ substance }: { substance: Substance }) => (
  <div className="min-h-screen text-center">
    <SectionTitle title="Déclarations d’effets indésirables suspectés de la substance active" />
    <SubstanceContainer substance={substance} />
  </div>
);

const SectionThree = () => {
  const { currentEntity } = useEntityContext<EntitySub>();

  const { data } = useSubstanceQuery({
    variables: {
      subCode: currentEntity.code,
    },
  });

  if (!data) {
    return (
      <div className="w-full flex justify-center items-center">
        <NotEnoughData />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <SectionTitle title={`Spécialités de médicaments contenant: ${currentEntity.name}`} />
      <div className="p-4 border border-grey-200 rounded-lg bg-white">
        <div className="text-secondary-900 font-medium">
          {data?.getSubstance?.retrieveSpecialities?.meta?.count} médicaments identifiés
        </div>
        <div className="pt-6">
          <PaginatedList
            theme="secondary"
            data={data?.getSubstance?.retrieveSpecialities?.specialities ?? []}
            renderItem={(item) =>
              item?.code ? (
                <Link href={`/specialite/${item.code}`}>
                  <a
                    className={classnames(
                      'w-full no-underline hover:underline p-2 focus:bg-grey-50 block',
                      'hover:font-medium focus:font-medium'
                    )}
                  >
                    {item?.name}
                  </a>
                </Link>
              ) : null
            }
          />
        </div>
      </div>
    </div>
  );
};

export const SubstancePage = ({ sub }: { sub: Substance }) => {
  if (!sub) {
    return <Page404 />;
  }

  return (
    <EntityContextProvider entity={{ type: 'sub', ...sub }}>
      <EntityPageLayout
        colorMenu="primary"
        sections={[
          {
            id: 'population-concernee',
            label: 'POPULATION CONCERNÉÉ',
            content: <SectionOneGlobalInformation substance={sub} />,
          },
          {
            id: 'effets-indesirables',
            label: 'EFFETS INDÉSIRABLES',
            content: <SectionTwo substance={sub} />,
          },
          {
            id: 'liste-des-specialites',
            label: 'LISTE DES SPÉCIALITÉS',
            content: <SectionThree />,
          },
        ]}
        render={(content) => content}
      >
        <HeroHeader />
      </EntityPageLayout>
    </EntityContextProvider>
  );
};
