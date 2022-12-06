import { EntityPageLayout } from '../../components/Layouts/EntityPageLayout/EntityPageLayout';
import { HeroHeader } from '../../components/HeroHeader/HeroHeader';
import type { EntityCis } from '../../contexts/EntityContext';
import { EntityContextProvider, useEntityContext } from '../../contexts/EntityContext';
import type { Speciality } from '../../api/graphql/__generated__/generated-types';
import Link from 'next/link';
import Page404 from '../../pages/[404]';
import { useMemo } from 'react';
import type { SpecialityRupture, Substance } from '../../graphql/__generated__/generated-documents';
import { SpecialitySubstancesContainer } from '../../components/SubstancesContainer/SpecialitySubstancesContainer';
import { Accordion } from '../../components/Accordion/Accordion';
import PilIcon from '../../assets/images/gellule.svg';
import WomanIllustration from '../../assets/images/woman_illustration.svg';
import ManIllustration from '../../assets/images/man_illustration.svg';
import ManFaceNo from '../../assets/images/manFaceNo.svg';
import ManFaceYes from '../../assets/images/manFaceYes.svg';

import { ChartBox } from '../../components/ChartBox/ChartBox';
import classnames from 'classnames';
import { useLayoutContext } from '../../contexts/LayoutContext';
import { cisExpositionLevelMapping, getCisErrorMedNatureIconMapping } from '../../utils/mapping';
import { numberWithThousand } from '../../utils/format';
import { NotEnoughData } from '../../components/NotEnoughData';
import { Button } from '../../components/Button/Button';
import { GraphFigure } from '../../components/GraphFigure/GraphFigure';
import { PublicationItem } from 'components/Publication/Publication';
import { RuptureHistoryItem } from '../../components/Ruptures/RuptureHistoryItem';
import { PaginatedList } from '../../components/PaginatedList/PaginatedList';
import { PieChartMedicalErrorsPopulation } from '../../components/Charts/PieChartMedicalErrorsPopulation';
import { PieChartRepartitionAge } from '../../components/Charts/PieChartRepartitionAge';

const SectionOneGlobalInformation = () => {
  const { currentEntity } = useEntityContext<EntityCis>();
  const { stickyHeroHeight } = useLayoutContext();
  const substances = useMemo(
    () => currentEntity?.substances ?? [],
    [currentEntity?.substances]
  ) as Substance[];

  return (
    <div
      className={classnames('SectionOneGlobalInformation bg-white shadow rounded-lg p-4')}
      style={{ marginTop: stickyHeroHeight }}
    >
      <div className="sectionPart mt-4 mb-8">
        {substances.length > 1 ? <h5>Substances actives</h5> : <h5>Substance active</h5>}

        {substances.map((sub, index) => (
          <Link key={`substance_${index.toString()}_${sub.code})`} href={`/substance/${sub.code}`}>
            <a className="text-primary">{sub.name}</a>
          </Link>
        ))}
      </div>

      {currentEntity.atc && (
        <div className="sectionPart mt-4 mb-8">
          <h5>Classe ATC</h5>
          <span>{currentEntity.atc?.name}</span> - <span>{currentEntity.atc?.code}</span>
        </div>
      )}

      {currentEntity.commercialisationState && (
        <div className="sectionPart mt-4 mb-8">
          <h5>État de commercialisation</h5>
          <span className="py-2 px-3 rounded-lg bg-dark-green-100">
            {currentEntity.commercialisationState}
          </span>
        </div>
      )}

      {currentEntity.laboratory && (
        <div className="sectionPart mt-4 mb-8">
          <h5>Laboratoire</h5>
          <span>{currentEntity.laboratory.name}</span>
        </div>
      )}

      {currentEntity.description && (
        <div className="sectionPart mt-4 mb-8">
          <h5>Description</h5>
          <p>{currentEntity.description}</p>
        </div>
      )}

      <div className="flex justify-between items-center gap-3">
        <div>
          <h5>Infos pour les patients</h5>
          <a href="#" className="text-sm text-primary">
            Afficher la notice
          </a>
        </div>
        <div>
          <h5>Infos pour les professionnels de santé</h5>
          <a href="#" className="text-sm text-primary">
            Afficher le RCP
          </a>
        </div>
        <div>
          <h5>Avis de la commission transparence</h5>
          <a href="#" className="text-sm text-primary">
            Afficher les recommandations
          </a>
        </div>
      </div>
    </div>
  );
};

const SectionTreatedPatients = () => {
  const { currentEntity } = useEntityContext<EntityCis>();
  return (
    <div className="SectionTreatedPatients sectionPart mt-4 mb-8">
      <h2 className="mb-1 font-medium">Patients traités en ville</h2>
      <h6 className="mt-0 mb-6">Données issues de la période 2009 - 2021</h6>

      <Accordion
        theme="primary"
        title="Comment sont calculés ces indicateurs ? D’où viennent ces données ?"
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

      {currentEntity?.exposition?.consumption ? (
        <div className="expositionChart my-4 flex rounded-md border border-grey-200 border-solid overflow-hidden">
          <div className="expositionChartLeft flex flex-col items-center justify-between p-4 min:h-20 flex-1 flex flex-col bg-primary py-6">
            <span className="text-white">
              {
                cisExpositionLevelMapping[
                  currentEntity?.exposition
                    ?.expositionLevel as keyof typeof cisExpositionLevelMapping
                ]
              }
            </span>

            <div className="UsageBarContainer my-8 flex justify-center items-end gap-2">
              {[...Array(5).keys()].map((pos) => (
                <div
                  key={pos}
                  className={classnames(
                    `UsageBarLevel${pos}`,
                    'relative w-6 bg-white border border-solid border-gray-200'
                  )}
                  style={{ height: 20 + 10 * pos }}
                >
                  {currentEntity?.exposition?.expositionLevel === pos + 1 && (
                    <div className="bouncingPil animate-bounce absolute -top-8">
                      <PilIcon className="w-6 h-6" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="expositionChartRight flex flex-col flex-3 px-4 py-2">
            <h3 className="text-primary">
              {numberWithThousand(currentEntity?.exposition?.consumption)} patients / an
            </h3>
            <p>
              Approximation du nombre de patients ayant été remboursés sur la période 2014-2018 pour
              une substance active ou une spécialité de médicament.
            </p>
          </div>
        </div>
      ) : (
        <NotEnoughData />
      )}

      <div className="flex gap-2 my-8">
        <ChartBox className="repSexes" title="Répartition par sexe des patients traités">
          {currentEntity.repartitionPerSex ? (
            <div className="flex gap-2 w-full">
              <div className="w-full flex flex-col justify-center items-center gap-1">
                <ManIllustration />
                {currentEntity.repartitionPerSex?.male && (
                  <span className="text-3xl text-dark-violet-800 mt-3">
                    {currentEntity.repartitionPerSex?.male}%
                  </span>
                )}
                <span className="text-base">Hommes</span>
              </div>

              <div className="w-full flex flex-col justify-center items-center gap-1">
                <WomanIllustration />
                {currentEntity.repartitionPerSex?.female && (
                  <span className="text-3xl text-dark-violet-800 mt-3">
                    {currentEntity.repartitionPerSex?.female}%
                  </span>
                )}
                <span className="text-base">Femmes</span>
              </div>
            </div>
          ) : (
            <NotEnoughData />
          )}
        </ChartBox>

        <ChartBox className="repAges" title="Répartition par âge des patients traités">
          <PieChartRepartitionAge ageData={currentEntity?.repartitionPerAge} />
        </ChartBox>
      </div>
    </div>
  );
};

const SectionMedicinalErrors = () => {
  const { currentEntity } = useEntityContext<EntityCis>();

  return (
    <div className="SectionMedicinalErrors sectionPart mt-4 mb-8">
      <h2 className="mb-1 font-medium">Déclarations d’erreurs médicamenteuses</h2>
      <h6 className="mt-0 mb-6">Données issues de la période 2009 - 2021</h6>

      <Accordion title="Comment sont calculés ces indicateurs ? D’où viennent ces données ?">
        <p>
          L’erreur médicamenteuse est l&lsquo;omission ou la réalisation non intentionnelle
          d&lsquo;un acte au cours des soins impliquant un médicament, qui peut être à l’origine
          d’un risque ou d’un événement indésirable pour le patient.
        </p>
        <p>
          Les données sur les erreurs médicamenteuses présentées ici, gérées par l’ANSM proviennent
          des déclarations soit de risque d’erreur soit d’erreurs médicamenteuses avec ou sans
          évènements indésirables. Elles sont déclarées par les patients ou les professionnels de
          santé, notamment via{' '}
          <Button externalLink href="#">
            le portail des signalements
          </Button>
        </p>
        <p>
          Les erreurs médicamenteuses se classent en fonction de l&lsquo;étape de survenue (erreur
          de prescription, erreur de délivrance, erreur d’administration), de la cause de
          l&lsquo;erreur (produit, humaine et technique) et de la nature de l&lsquo;erreur (de
          médicament ou de patient).{' '}
          <Button externalLink href="#">
            En savoir plus sur le site de l&lsquo;ANSM
          </Button>
        </p>
      </Accordion>

      <div className="flex gap-2 my-8">
        <ChartBox className="repAges flex-1" title="Répartition de la population concernée">
          <PieChartMedicalErrorsPopulation
            errorsMedRepPopData={currentEntity?.medicalErrors?.populationRepartition}
          />
        </ChartBox>

        <ChartBox
          className="sideEffectsOriginRepartition flex-1"
          title="Existence d’effets indésirables suite aux erreurs médicamenteuses déclarées"
        >
          {currentEntity?.medicalErrors?.sideEffectsOriginRepartition ? (
            <div className="flex gap-2 w-full">
              <div className="w-full flex flex-col justify-center items-center gap-1">
                <ManFaceYes className="w-32" />
                {currentEntity.medicalErrors?.sideEffectsOriginRepartition?.with?.value && (
                  <span className="text-3xl text-dark-violet-800 mt-3">
                    {currentEntity.medicalErrors?.sideEffectsOriginRepartition?.with?.value}%
                  </span>
                )}
                <span className="text-base">Sans effets indésirables</span>
              </div>

              <div className="w-full flex flex-col justify-center items-center gap-1">
                <ManFaceNo className="w-32" />
                {currentEntity.medicalErrors?.sideEffectsOriginRepartition?.without?.value && (
                  <span className="text-3xl text-dark-violet-800 mt-3">
                    {currentEntity.medicalErrors?.sideEffectsOriginRepartition?.without?.value}%
                  </span>
                )}
                <span className="text-base">Avec effets indésirables</span>
              </div>
            </div>
          ) : (
            <NotEnoughData />
          )}
        </ChartBox>
      </div>

      <ChartBox
        className="stepApparitionFigures"
        title="À quelle étape sont survenues les erreurs médicamenteuses déclarées ?"
      >
        {currentEntity?.medicalErrors?.natureRepartition?.length ? (
          <div className="graphFiguresContainer flex gap-3">
            {currentEntity?.medicalErrors?.natureRepartition?.map((natureRep) =>
              natureRep?.id && natureRep?.value && natureRep?.range ? (
                <GraphFigure
                  key={natureRep.id}
                  value={natureRep?.value}
                  valueClassName="text-secondary"
                  description={natureRep?.range}
                  icon={getCisErrorMedNatureIconMapping(natureRep.id)}
                />
              ) : null
            )}
          </div>
        ) : (
          <NotEnoughData />
        )}
      </ChartBox>
    </div>
  );
};

const SectionSideEffects = () => {
  const { currentEntity } = useEntityContext<EntityCis>();
  const substances = useMemo(
    () => currentEntity?.substances ?? [],
    [currentEntity?.substances]
  ) as Substance[];

  return (
    <div className="SectionSideEffects">
      <h2 className="font-medium">
        Déclarations d&lsquo;effets indésirables suspectés, par substance active
      </h2>
      <SpecialitySubstancesContainer substances={substances} className="mt-4 mb-32" />
    </div>
  );
};

const SectionRisksShortageHistory = () => {
  const { currentEntity } = useEntityContext<EntityCis>();
  const { rupturesHistory } = currentEntity;

  const ruptures = useMemo(
    () => (rupturesHistory?.ruptures ?? []) as SpecialityRupture[],
    [rupturesHistory?.ruptures]
  );

  const count = useMemo(() => rupturesHistory?.meta?.count ?? 0, [rupturesHistory?.meta?.count]);

  return (
    <div className="SectionRisksShortageHistory">
      <h2 className="font-medium">
        Historique des déclarations de ruptures et de risques de rupture de stock cloturées
      </h2>
      {count ? (
        <div className="p-4 border border-grey-200 rounded-lg bg-white">
          <div className="text-secondary-900 font-medium">
            <span>{`${count} ${count === 1 ? 'déclaration' : 'déclarations'}`}</span>
          </div>
          <div className="pt-6">
            <PaginatedList
              theme="secondary"
              data={ruptures}
              renderItem={(ruptureItem) => (
                <RuptureHistoryItem cisName={currentEntity?.name} ruptureItem={ruptureItem} />
              )}
            />
          </div>
        </div>
      ) : (
        <ChartBox>
          <NotEnoughData />
        </ChartBox>
      )}
    </div>
  );
};

const SectionPublications = () => {
  const { currentEntity } = useEntityContext<EntityCis>();
  const { publications } = currentEntity;

  return (
    <div className="SectionPublications min-h-screen">
      <h2 className="font-medium">Publications de l’ANSM</h2>
      {publications?.length ? (
        publications?.map((publication, index) => (
          <div key={`publication_${index.toString()}}`} className="my-2">
            {publication && <PublicationItem publication={publication} />}
          </div>
        ))
      ) : (
        <ChartBox>
          <NotEnoughData />
        </ChartBox>
      )}
    </div>
  );
};

export const SpecialityPage = ({ cis }: { cis: Speciality }) => {
  if (!cis) {
    return <Page404 />;
  }

  return (
    <EntityContextProvider entity={{ type: 'cis', ...cis }}>
      <EntityPageLayout
        offsetContent={60}
        colorMenu="primary"
        sections={[
          {
            id: 'global-infos',
            label: 'Description',
            content: <SectionOneGlobalInformation />,
          },
          {
            id: 'treated-patients',
            label: 'Patients traités',
            content: <SectionTreatedPatients />,
          },
          {
            id: 'side-effects',
            label: 'Effets indésirables',
            content: <SectionSideEffects />,
          },
          {
            id: 'shortage-risks-history',
            label: 'Historique des risques et des ruptures de stocks',
            content: <SectionRisksShortageHistory />,
          },
          {
            id: 'medicinal-errors',
            label: 'Erreurs médicamenteuses',
            content: <SectionMedicinalErrors />,
          },
          {
            id: 'publications',
            label: 'Publications',
            content: <SectionPublications />,
          },
        ]}
        render={(content) => content}
      >
        <HeroHeader />
      </EntityPageLayout>
    </EntityContextProvider>
  );
};
