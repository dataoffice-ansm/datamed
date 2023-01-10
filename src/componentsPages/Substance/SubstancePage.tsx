import { EntityPageLayout } from '../../components/Layouts/EntityPageLayout/EntityPageLayout';
import { HeroHeader } from '../../components/HeroHeader/HeroHeader';
import type { EntitySub } from '../../contexts/EntityContext';
import { EntityContextProvider, useEntityContext } from '../../contexts/EntityContext';
import {
  type RepartitionPerAge,
  type Substance,
} from '../../graphql/__generated__/generated-documents';
import { PaginatedList } from '../../components/PaginatedList/PaginatedList';
import classnames from 'classnames';
import { SubstanceSideEffects } from './SubstanceSideEffects';
import { NotEnoughData } from '../../components/NotEnoughData';
import { Accordion } from '../../components/Accordion/Accordion';
import PilIcon from '../../assets/pictos/gellule.svg';
import { numberWithThousand } from '../../utils/format';
import ManIllustration from '../../assets/pictos/man_illustration.svg';
import WomanIllustration from '../../assets/pictos/woman_illustration.svg';
import { PieChartRepartition } from '../../components/Charts/PieChartRepartition';
import { GraphBox } from '../../components/GraphBox/GraphBox';
import { GraphFigure } from '../../components/GraphFigure';
import { SectionTitle } from '../../components/SectionTitle';
import { ExpositionLevel } from '../../api/graphql/enums';
import { useMemo } from 'react';
import { buildSortedRangeData } from '../../utils/entities';
import { Button } from '../../components/Button/Button';

const SectionOneGlobalInformation = () => {
  const { currentEntity } = useEntityContext<EntitySub>();
  const { totalExposition, exposition, repartitionPerGender } = currentEntity;

  const repartitionPerAge = useMemo(
    () => buildSortedRangeData<RepartitionPerAge>(currentEntity.repartitionPerAge, 'number'),
    [currentEntity.repartitionPerAge]
  );

  return (
    <div className="SectionTreatedPatients sectionPart mt-4 mb-8">
      <SectionTitle
        title="Patients traités en ville"
        subTitle={
          totalExposition?.maxYear && totalExposition?.minYear
            ? `Données issues de la période ${totalExposition.minYear} - ${totalExposition.maxYear}`
            : 'Période des données issues non renseignée'
        }
      />

      <Accordion
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
            <span className="text-white">{exposition?.description}</span>

            <div className="UsageBarContainer mt-12 flex justify-center items-end gap-2">
              {Object.keys(ExpositionLevel).map((levelKey, index) => (
                <div
                  key={levelKey}
                  className={classnames(
                    `UsageBarLevel${index}`,
                    'relative w-6 bg-white border border-solid border-gray-200'
                  )}
                  style={{ height: 20 + 10 * index }}
                >
                  {exposition?.level === levelKey && (
                    <div className="bouncingPil animate-bounce absolute -top-8">
                      <PilIcon className="w-6 h-6" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="expositionChartRight flex flex-col flex-3 px-4 py-2">
            <h3 className="text-2xl text-secondary-900">
              {numberWithThousand(exposition?.consumption)} / an
            </h3>
            <p>
              Moyenne annuelle du nombre de remboursements de médicament par patient et par
              conditionnement de médicament.
            </p>
          </div>
        </div>
      ) : null}

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
                    value={repartitionPerGender.female.valuePercent}
                    label="Femmes"
                    valueClassName="mt-2 text-secondary"
                    icon={<WomanIllustration className="w-32" />}
                  />
                )}
                {repartitionPerGender?.male?.valuePercent && (
                  <GraphFigure
                    value={repartitionPerGender.male.valuePercent}
                    valueClassName="mt-2 text-secondary"
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
              theme="secondary"
              className="h-64 w-full flex justify-center items-center"
              data={repartitionPerAge}
            />
          </GraphBox>
        </div>
      </div>
    </div>
  );
};

const SectionSideEffects = () => {
  const { currentEntity } = useEntityContext<EntitySub>();
  return (
    <div className="min-h-screen text-center">
      <SectionTitle
        title="Déclarations d’effets indésirables suspectés de la substance active"
        subTitle="Données issues de la période 2009 - 2021"
      />
      <SubstanceSideEffects substance={currentEntity} />
    </div>
  );
};

const SectionAssociatedSpecialities = () => {
  const { currentEntity } = useEntityContext<EntitySub>();

  return (
    <div className="min-h-screen">
      <SectionTitle title={`Spécialités de médicaments contenant: ${currentEntity.name}`} />

      <div className="p-4 border border-grey-200 rounded-lg bg-white">
        <div className="text-secondary-900 font-medium">
          {currentEntity.retrieveSpecialities?.meta?.count} médicaments identifiés
        </div>
        <div className="pt-6">
          <PaginatedList
            theme="secondary"
            data={currentEntity.retrieveSpecialities?.specialities ?? []}
            renderItem={(item) =>
              item?.code ? (
                <Button variant="none" theme="grey" href={`/specialite/${item.code}`}>
                  {item?.name}
                </Button>
              ) : null
            }
          />
        </div>
      </div>
    </div>
  );
};

export const SubstancePage = ({ sub }: { sub: Substance }) => (
  <EntityContextProvider entity={{ type: 'sub', ...sub }}>
    <EntityPageLayout
      colorMenu="secondary"
      sections={[
        {
          id: 'population-concernee',
          label: 'POPULATION CONCERNÉÉ',
          content: <SectionOneGlobalInformation />,
        },
        {
          id: 'effets-indesirables',
          label: 'EFFETS INDÉSIRABLES',
          content: <SectionSideEffects />,
        },
        {
          id: 'liste-des-specialites',
          label: 'LISTE DES SPÉCIALITÉS',
          content: <SectionAssociatedSpecialities />,
        },
      ]}
      render={(content) => content}
    >
      <HeroHeader />
    </EntityPageLayout>
  </EntityContextProvider>
);
