import { EntityPageLayout } from '../../components/Layouts/EntityPageLayout/EntityPageLayout';
import { HeroHeader } from '../../components/HeroHeader/HeroHeader';
import type { EntityCis } from '../../contexts/EntityContext';
import { EntityContextProvider, useEntityContext } from '../../contexts/EntityContext';
import Link from 'next/link';
import { useMemo } from 'react';
import type {
  MedicalErrorsApparitionStep,
  MedicalErrorApparitionStep,
  SpecialityRupture,
  Substance,
  Speciality,
  MedicalErrorsNature,
} from '../../graphql/__generated__/generated-documents';
import { SpecialitySubstancesContainer } from './SpecialitySubstancesContainer';
import { Accordion } from '../../components/Accordion/Accordion';
import PilIcon from '../../assets/pictos/gellule.svg';
import WomanIllustration from '../../assets/pictos/woman_illustration.svg';
import ManIllustration from '../../assets/pictos/man_illustration.svg';
import ManFaceNo from '../../assets/pictos/manFaceNo.svg';
import ManFaceYes from '../../assets/pictos/manFaceYes.svg';
import OutOfStockSvg from '../../assets/pictos/out_of_stock.svg';

import { ChartBox } from '../../components/ChartBox';
import classnames from 'classnames';
import { useLayoutContext } from '../../contexts/LayoutContext';
import { numberWithThousand } from '../../utils/format';
import { NotEnoughData } from '../../components/NotEnoughData';
import { GraphFigure } from '../../components/GraphFigure';
import { PublicationItem } from './PublicationItem';
import { RuptureHistoryItem } from './RuptureHistoryItem';
import { PaginatedList } from '../../components/PaginatedList/PaginatedList';
import { PieChartMedicalErrorsPopulation } from '../../components/Charts/PieChartMedicalErrorsPopulation';
import { PieChartRepartitionAge } from '../../components/Charts/PieChartRepartitionAge';
import { GraphBox } from '../../components/GraphBox/GraphBox';
import { SectionTitle } from '../../components/SectionTitle';
import { GraphBoxSelect } from '../../components/GraphBoxSelect';
import { GraphFiguresGrid } from '../../components/GraphFiguresGrid';
import { BarChartMedicalErrorsNature } from '../../components/Charts/BarChartMedicalErrorsNature';
import { ExpositionLevel } from '../../api/graphql/enums';
import { CardWithImage } from '../../components/CardWithImage/CardWithImage';
import { Button } from '../../components/Button/Button';
import { getMedErrorApparitionStepIcon } from '../../utils/iconsMapping';
import { buildSortedData } from '../../utils/entities';

const SectionOneGlobalInformation = () => {
  const { currentEntity } = useEntityContext<EntityCis>();
  const { stickyHeroHeight } = useLayoutContext();
  const substances = useMemo(
    () => currentEntity?.substances ?? [],
    [currentEntity?.substances]
  ) as Substance[];

  return (
    <div
      className="SectionOneGlobalInformation bg-white shadow rounded-lg p-4"
      style={{ marginTop: stickyHeroHeight }}
      id="sectionOneGlobalInformation"
    >
      <div className="sectionPart mt-4 mb-8">
        {substances.length > 1 ? <h5>Substances actives</h5> : <h5>Substance active</h5>}

        <div className="activeSubstances flex flex-col gap-2">
          {substances.map((sub, index) => (
            <Link
              key={`substance_${index.toString()}_${sub.code})`}
              href={`/substance/${sub.code}`}
            >
              <a className="text-primary">{sub.name}</a>
            </Link>
          ))}
        </div>
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
          <a
            rel="external noreferrer"
            target="_blank"
            href="https://base-donnees-publique.medicaments.gouv.fr/affichageDoc.php?specid=60234100&typedoc=N"
            className="text-sm text-primary"
          >
            Afficher la notice
          </a>
        </div>
        <div>
          <h5>Infos pour les professionnels de santé</h5>
          <a
            rel="external noreferrer"
            target="_blank"
            href="https://base-donnees-publique.medicaments.gouv.fr/affichageDoc.php?specid=60234100&typedoc=R"
            className="text-sm text-primary"
          >
            Afficher le RCP
          </a>
        </div>
        <div>
          <h5>Avis de la commission transparence</h5>
          <a
            rel="external noreferrer"
            target="_blank"
            href="https://www.has-sante.fr/jcms/fc_2875171/fr/resultat-de-recherche?text=doliprane&tmpParam=&opSearch=&types=guidelines"
            className="text-sm text-primary"
          >
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
    <div className="SectionTreatedPatients sectionPart mt-4 mb-8" id="sectionTreatedPatients">
      <SectionTitle
        title="Patients traités en ville"
        subTitle="Données issues de la période 2014 - 2021"
      />

      <Accordion
        className="shadow rounded-lg"
        classNameTitle="text-primary"
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
        <div className="expositionChart my-4 flex rounded-lg shadow bg-white overflow-hidden">
          <div className="expositionChartLeft flex flex-col items-center justify-between p-4 min:h-20 flex-1 bg-primary py-6">
            <span className="text-white">{currentEntity?.exposition?.description}</span>

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
                  {currentEntity?.exposition?.level === levelKey && (
                    <div className="bouncingPil animate-bounce absolute -top-8">
                      <PilIcon className="w-6 h-6" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="expositionChartRight flex flex-col flex-3 px-4 py-2">
            <h3 className="text-2xl text-primary">
              {numberWithThousand(currentEntity?.exposition?.consumption)} / an
            </h3>
            <p>
              Moyenne annuelle du nombre de remboursements de médicament par patient et par
              conditionnement de médicament.
            </p>
          </div>
        </div>
      ) : (
        <div className="w-full flex justify-center items-center rounded-lg shadow bg-white mt-8">
          <NotEnoughData />
        </div>
      )}

      <div className="flex flex-shrink flex-col md:flex-row gap-8 mb-8 m-auto mt-8">
        <div className="flex-1 flex-shrink">
          <GraphBox
            title="Répartition par sexe des patients traités"
            className="h-full max-w-[100%]"
          >
            {currentEntity.repartitionPerGender?.female &&
            currentEntity.repartitionPerGender?.male ? (
              <div className="mt-8 flex gap-8 justify-center items-center">
                {currentEntity.repartitionPerGender?.female?.valuePercent && (
                  <GraphFigure
                    value={currentEntity.repartitionPerGender?.female?.valuePercent}
                    label="Femmes"
                    valueClassName="mt-2 text-primary"
                    icon={<WomanIllustration className="w-32" />}
                  />
                )}
                {currentEntity.repartitionPerGender?.male?.valuePercent && (
                  <GraphFigure
                    value={currentEntity.repartitionPerGender.male?.valuePercent}
                    valueClassName="mt-2 text-primary"
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
            <PieChartRepartitionAge
              theme="primary"
              className="h-64 w-full flex justify-center items-center"
              ageData={currentEntity?.repartitionPerAge}
            />
          </GraphBox>
        </div>
      </div>
    </div>
  );
};

const SectionMedicinalErrors = () => {
  const { currentEntity } = useEntityContext<EntityCis>();

  return (
    <div className="SectionMedicinalErrors sectionPart mt-4 mb-8" id="sectionMedicinalErrors">
      <SectionTitle
        title="Déclarations d’erreurs médicamenteuses"
        subTitle="Données issues de la période 2009 - 2021"
      />

      <Accordion
        title="Comment sont calculés ces indicateurs ? D’où viennent ces données ?"
        className="rounded-lg shadow"
      >
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
          <a
            rel="external noreferrer"
            target="_blank"
            href="https://signalement.social-sante.gouv.fr/psig_ihm_utilisateurs/index.html#/accueil"
          >
            le portail des signalements
          </a>
        </p>
        <p>
          Les erreurs médicamenteuses se classent en fonction de l&lsquo;étape de survenue (erreur
          de prescription, erreur de délivrance, erreur d’administration), de la cause de
          l&lsquo;erreur (produit, humaine et technique) et de la nature de l&lsquo;erreur (de
          médicament ou de patient).{' '}
          <a
            rel="external noreferrer"
            target="_blank"
            href="https://ansm.sante.fr/page/la-gestion-des-erreurs-medicamenteuses"
          >
            En savoir plus sur le site de l&lsquo;ANSM
          </a>
        </p>
      </Accordion>

      <div className="flex flex-shrink flex-col md:flex-row gap-8 mb-8 m-auto mt-8">
        <div className="flex-1 flex-shrink">
          <GraphBox title="Répartition de la population concernée" className="h-full max-w-[100%]">
            <PieChartMedicalErrorsPopulation
              theme="primary"
              errorsMedRepPopData={currentEntity?.medicalErrors?.populationRepartition}
            />
          </GraphBox>
        </div>

        <div className="flex-1 flex-shrink">
          <GraphBox title="Existence d’effets indésirables suite aux erreurs médicamenteuses déclarées">
            {currentEntity?.medicalErrors?.sideEffectsOriginRepartition?.with?.valuePercent &&
            currentEntity?.medicalErrors?.sideEffectsOriginRepartition?.without?.valuePercent ? (
              <div className="flex justify-center text-center gap-2 w-full">
                <div className="w-full flex flex-col justify-center items-center gap-1">
                  <ManFaceYes className="w-32" />
                  <span className="text-3xl text-dark-violet-800 mt-3">
                    {currentEntity.medicalErrors?.sideEffectsOriginRepartition?.with?.valuePercent}%
                  </span>
                  <span className="text-base">Sans effets indésirables</span>
                </div>

                <div className="w-full flex flex-col justify-center items-center gap-1">
                  <ManFaceNo className="w-32" />
                  <span className="text-3xl text-dark-violet-800 mt-3">
                    {
                      currentEntity.medicalErrors?.sideEffectsOriginRepartition?.without
                        ?.valuePercent
                    }
                    %
                  </span>
                  <span className="text-base">Avec effets indésirables</span>
                </div>
              </div>
            ) : (
              <NotEnoughData />
            )}
          </GraphBox>
        </div>
      </div>

      {currentEntity.medicalErrors?.apparitionStepRepartition && (
        <GraphBoxSelect
          title="À quelle étape sont survenues les erreurs médicamenteuses déclarées ?"
          render={(selectedOption) => (
            <GraphFiguresGrid
              data={buildSortedData<MedicalErrorsApparitionStep>(
                currentEntity.medicalErrors?.apparitionStepRepartition,
                selectedOption
              )}
              renderItem={(apparitionStep) => {
                const step = apparitionStep.step as MedicalErrorApparitionStep;
                return (
                  <GraphFigure
                    unit={selectedOption === 'percent' ? ' % ' : ''}
                    value={
                      (selectedOption === 'percent'
                        ? apparitionStep.valuePercent
                        : apparitionStep.value) ?? 0
                    }
                    label={apparitionStep.label}
                    icon={getMedErrorApparitionStepIcon(step)}
                  />
                );
              }}
            />
          )}
        />
      )}

      {currentEntity.medicalErrors?.natureRepartition && (
        <GraphBoxSelect
          title="Nature des erreurs médicamenteuses"
          className="max-w-full my-8"
          render={(selectedOption) => (
            <div className="m-auto max-w-max">
              <BarChartMedicalErrorsNature
                dataKey={selectedOption}
                natureMedicalErrors={buildSortedData<MedicalErrorsNature>(
                  currentEntity.medicalErrors?.natureRepartition,
                  selectedOption
                )}
              />
            </div>
          )}
        />
      )}
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
    <div className="SectionSideEffects" id="sectionSideEffects">
      <SectionTitle
        title="Déclarations d&lsquo;effets indésirables suspectés, par substance active"
        subTitle="Données issues de la période 2009 - 2021"
      />

      <SpecialitySubstancesContainer
        substances={substances}
        className="mt-4 mb-32 shadow rounded-lg"
      />
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
    <div className="SectionRisksShortageHistory" id="sectionRisksShortageHistory">
      <SectionTitle
        title="Historique des déclarations de ruptures et de risques de rupture de stock cloturées"
        subTitle="Données issues de la période 2021 - 2022"
      />

      <Accordion
        className="shadow rounded-lg"
        classNameTitle="text-primary"
        theme="primary"
        title="Quelles données sont affichées ? D’où viennent-elles ?"
      >
        <p>
          Cette rubrique recense l&apos;historique des déclarations de ruptures et de risques de
          rupture concernant les médicaments d’intérêt thérapeutique majeur (MITM), pour lesquelles
          les industriels ont une obligation de déclaration auprès de l&apos;ANSM depuis le 3 Mai
          2021.
        </p>

        <p>
          Pour retrouver les dernières informations destinées aux professionnels de santé et aux
          patients concernant les médicaments d’intérêt thérapeutique majeur faisant actuellement
          l’objet de difficultés d’approvisionnement et pour lesquels il n’y a pas d’alternative
          thérapeutique disponible sur le marché français, vous pouvez vous référer au site :
          <a
            rel="external noreferrer"
            target="_blank"
            href="https://ansm.sante.fr/disponibilites-des-produits-de-sante/medicaments"
          />
        </p>
      </Accordion>

      <div className="my-8 RupturesHistory">
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

      <CardWithImage
        className="my-8 border border-grey-100"
        imageClassName="w-48 px-2"
        title="Rupture ou risque de rupture des produits de santé"
        image={<OutOfStockSvg className="h-48 w-32 m-auto" />}
        button={
          <Button
            externalLink
            variant="outlined"
            href="https://ansm.sante.fr/disponibilites-des-produits-de-sante/medicaments"
            className="uppercase"
          >
            disponiblité des produits de santé
          </Button>
        }
      >
        <p>
          Accédez à l’actualité des ruptures et risques de rupture des produits de santé
          (médicaments, dispositifs médicaux, vaccins) disponibles sur le site de l’ANSM.
        </p>
      </CardWithImage>
    </div>
  );
};

const SectionPublications = () => {
  const { currentEntity } = useEntityContext<EntityCis>();
  const { publications } = currentEntity;

  return (
    <div className="SectionPublications min-h-screen" id="sectionPublications">
      <SectionTitle title="Publications de l’ANSM" />

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

export const SpecialityPage = ({ cis }: { cis: Speciality }) => (
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
          id: 'medicinal-errors',
          label: 'Erreurs médicamenteuses',
          content: <SectionMedicinalErrors />,
        },
        {
          id: 'shortage-risks-history',
          label: 'Historique des risques et des ruptures de stocks',
          content: <SectionRisksShortageHistory />,
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
