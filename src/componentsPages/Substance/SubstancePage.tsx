import { EntityPageLayout } from '../../components/Layouts/EntityPageLayout/EntityPageLayout';
import { HeroHeader } from '../../components/HeroHeader/HeroHeader';
import type { EntitySub } from '../../contexts/EntityContext';
import { EntityContextProvider, useEntityContext } from '../../contexts/EntityContext';
import {
  type RepartitionPerAge,
  type Substance,
} from '../../graphql/__generated__/generated-documents';
import { PaginatedList } from '../../components/PaginatedList';
import { SubstanceSideEffects } from './SubstanceSideEffects';
import { NotEnoughData } from '../../components/NotEnoughData';
import { Accordion } from '../../components/Accordion';
import { numberWithThousand } from '../../utils/format';
import ManIllustration from '../../assets/pictos/man_illustration.svg';
import WomanIllustration from '../../assets/pictos/woman_illustration.svg';
import { PieChartRepartition } from '../../components/Charts/PieChartRepartition';
import { GraphBox } from '../../components/GraphBox/GraphBox';
import { GraphFigure } from '../../components/GraphFigure';
import { SectionTitle } from '../../components/SectionTitle';
import { useMemo, useRef } from 'react';
import { buildSortedRangeData } from '../../utils/entities';
import { Button } from '../../components/Button/Button';
import { UsageBarContainer } from '../../components/UsageBarContainer';

const SectionOneGlobalInformation = () => {
  const { currentEntity } = useEntityContext<EntitySub>();
  const { exposition, repartitionPerGender } = currentEntity;

  const repartitionPerAge = useMemo(
    () => buildSortedRangeData<RepartitionPerAge>(currentEntity.repartitionPerAge ?? [], 'number'),
    [currentEntity.repartitionPerAge]
  );

  return (
    <div className="sectionPart mt-4 mb-8">
      <SectionTitle
        title="Patients traités en ville"
        subTitle={
          exposition?.openMedicPeriod?.maxYear && exposition?.openMedicPeriod?.minYear
            ? `Données issues de la période ${exposition?.openMedicPeriod?.minYear} - ${exposition?.openMedicPeriod?.maxYear}`
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
            rel="external noreferrer"
            target="_blank"
            className="text-primary"
            href="https://assurance-maladie.ameli.fr/etudes-et-donnees/open-medic-base-complete-depenses-medicaments"
          >
            https://assurance-maladie.ameli.fr/etudes-et-donnees/open-medic-base-complete-depenses-medicaments
          </a>
        </p>
        <p>
          <strong>Mode de calcul:</strong> Pour une même substance active ou une spécialité
          pharmaceutique, lorsque le patient achète différents conditionnements, le décompte
          correspondra à la somme des types de conditionnements remboursés pour ce patient.
        </p>
        <p>
          Par exemple, si un patient achète 2 boîtes de 16 gélules et 3 boîtes de 100 gélules d’un
          médicament au cours de l’année 2016, il sera comptabilisé 2 fois en 2016 pour ce
          médicament
        </p>
        <p>
          La donnée statistique présentée ci-dessous est une moyenne annuelle et arrondie, du nombre
          de remboursements de médicament par patient et par conditionnement de médicament par année
          civile.
        </p>
      </Accordion>

      <div className="expositionChart my-4 flex rounded-lg shadow bg-white overflow-hidden">
        <div className="expositionChartLeft flex flex-col w-1/3 sm:w-1/2 items-center justify-between px-2 sm:px-4 py-6 min:h-20 bg-secondary-900">
          <span className="text-white">{exposition?.description}</span>
          {exposition && <UsageBarContainer exposition={exposition} entityType="sub" />}
        </div>

        <div className="expositionChartRight flex flex-col flex-3 px-4 py-2">
          <h3 className="text-2xl text-secondary-900">
            {exposition?.consumption
              ? `${numberWithThousand(exposition?.consumption)} / an`
              : 'Données insuffisantes'}
          </h3>
          <p>
            Moyenne annuelle du nombre de patients ayant reçu au moins un remboursement de
            médicament par conditionnement.
          </p>
        </div>
      </div>

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
                    value={repartitionPerGender.female.valuePercent}
                    label="Femmes"
                    valueClassName="mt-2 text-secondary"
                    icon={<WomanIllustration className="w-24 sm:w-32" />}
                  />
                )}
                {repartitionPerGender?.male?.valuePercent && (
                  <GraphFigure
                    value={repartitionPerGender.male.valuePercent}
                    valueClassName="mt-2 text-secondary"
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
  const { sideEffects } = currentEntity;

  return (
    <div className="min-h-screen text-center">
      <SectionTitle
        title="Déclarations d’effets indésirables suspectés de la substance active"
        subTitle={
          sideEffects?.bnpvPeriod?.maxYear && sideEffects?.bnpvPeriod?.minYear
            ? `Données issues de la période ${sideEffects?.bnpvPeriod?.minYear} - ${sideEffects?.bnpvPeriod?.maxYear}`
            : 'Période des données issues non renseignée'
        }
      />
      <SubstanceSideEffects substance={currentEntity} />
    </div>
  );
};

const SectionAssociatedSpecialities = () => {
  const refList = useRef<HTMLDivElement | null>(null);
  const { currentEntity } = useEntityContext<EntitySub>();

  return (
    <div ref={refList} className="min-h-screen">
      <SectionTitle title={`Spécialités pharmaceutiques contenant: ${currentEntity.name}`} />

      <div className="p-4 border border-grey-100 rounded-lg bg-white">
        <div className="text-secondary-900 font-medium">
          {currentEntity.retrievedSpecialities?.meta?.count} médicaments identifiés
        </div>
        <div className="pt-6">
          <PaginatedList
            theme="secondary"
            data={currentEntity.retrievedSpecialities?.specialities ?? []}
            listRef={refList}
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
