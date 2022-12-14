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
import { Accordion } from '../../components/Accordion';
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
import { PaginatedList } from '../../components/PaginatedList';
import { PieChartRepartition } from '../../components/Charts/PieChartRepartition';
import { GraphBox } from '../../components/GraphBox/GraphBox';
import { SectionTitle } from '../../components/SectionTitle';
import { GraphBoxSelect } from '../../components/GraphBoxSelect';
import { GraphFiguresGrid } from '../../components/GraphFiguresGrid';
import { BarChartMedicalErrorsNature } from '../../components/Charts/BarChartMedicalErrorsNature';
import { ExpositionLevel } from '../../api/graphql/enums';
import { CardWithImage } from '../../components/CardWithImage';
import { Button } from '../../components/Button/Button';
import { getMedErrorApparitionStepIcon } from '../../utils/iconsMapping';
import { buildSortedRangeData } from '../../utils/entities';
import {
  type MedicalErrorsPopulation,
  type SpecialityUsagePerAge,
} from '../../graphql/__generated__/generated-documents';

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
          <h5>??tat de commercialisation</h5>
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

      <div className="flex justify-center items-center gap-3">
        <div className="flex-1">
          <h5>Infos pour les patients</h5>
          <a
            rel="external noreferrer"
            target="_blank"
            href={`https://base-donnees-publique.medicaments.gouv.fr/affichageDoc.php?specid=${currentEntity.code}&typedoc=N`}
            className="text-sm text-primary"
          >
            Afficher la notice
          </a>
        </div>

        <div className="flex-1">
          <h5>Infos pour les professionnels de sant??</h5>
          <a
            rel="external noreferrer"
            target="_blank"
            href={`https://base-donnees-publique.medicaments.gouv.fr/affichageDoc.php?specid=${currentEntity.code}&typedoc=R`}
            className="text-sm text-primary"
          >
            Afficher le RCP
          </a>
        </div>

        {/*<div>*/}
        {/*  <h5>Avis de la commission transparence</h5>*/}
        {/*  <a*/}
        {/*    rel="external noreferrer"*/}
        {/*    target="_blank"*/}
        {/*    href={`https://www.has-sante.fr/jcms/fc_2875171/fr/resultat-de-recherche?text=${encodeURI(*/}
        {/*      currentEntity.name.split(' ')?.[0]*/}
        {/*    )}&tmpParam=&opSearch=&types=guidelines`}*/}
        {/*    className="text-sm text-primary"*/}
        {/*  >*/}
        {/*    Afficher les recommandations*/}
        {/*  </a>*/}
        {/*</div>*/}
      </div>
    </div>
  );
};

const SectionTreatedPatients = () => {
  const { currentEntity } = useEntityContext<EntityCis>();
  const { exposition } = currentEntity;

  const repartitionPerAge = useMemo(
    () => buildSortedRangeData<SpecialityUsagePerAge>(currentEntity?.repartitionPerAge, 'number'),
    [currentEntity?.repartitionPerAge]
  );

  return (
    <div className="SectionTreatedPatients sectionPart mt-4 mb-8" id="sectionTreatedPatients">
      <SectionTitle
        title="Patients trait??s en ville"
        subTitle={
          exposition?.maxYear && exposition?.minYear
            ? `Donn??es issues de la p??riode ${exposition.minYear} - ${exposition.maxYear}`
            : 'P??riode des donn??es issues non renseign??e'
        }
      />

      <Accordion
        className="shadow rounded-lg"
        classNameTitle="text-primary"
        theme="primary"
        title="Comment sont calcul??s ces indicateurs ? D???o?? viennent ces donn??es ?"
      >
        <p>
          Estimations obtenues ?? partir des donn??es Open-Medic portant sur le nombre de patients
          ayant b??n??fici?? d???un remboursement du m??dicament d??livr?? en pharmacie de ville. Pour plus
          d???informations, consultez:{' '}
          <a
            rel="external noreferrer"
            target="_blank"
            className="text-primary"
            href="http://open-data-assurance-maladie.ameli.fr/medicaments/index.php"
          >
            http://open-data-assurance-maladie.ameli.fr/medicaments/index.php
          </a>
        </p>
        <p>
          <strong>Mode de calcul:</strong> Pour une m??me substance active ou une sp??cialit?? de
          m??dicament, lorsque le patient ach??te diff??rents conditionnements, le d??compte
          correspondra ?? la somme des types de conditionnements rembours??s pour ce patient.
        </p>
        <p>
          Par exemple, la sp??cialit?? Doliprane 500 mg, g??lule, un patient qui aura achet?? 2 bo??tes
          de 16 g??lules et 3 bo??tes de 100 g??lules au cours de l???ann??e 2016 sera comptabilis?? 2 fois
          pour 2016.
        </p>
        <p>
          La donn??e statistique pr??sent??e ci-dessous est une moyenne annuelle et arrondie, du nombre
          de remboursements de m??dicament par patient et par conditionnement de m??dicament par ann??e
          civile.
        </p>
      </Accordion>

      <div className="expositionChart my-4 flex rounded-lg shadow bg-white overflow-hidden">
        <div className="expositionChartLeft flex flex-col items-center justify-between p-4 min:h-20 flex-1 bg-primary py-6">
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
                {currentEntity?.exposition?.expositionLevel === levelKey && (
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
            {exposition?.consumption
              ? `${numberWithThousand(exposition?.consumption)} / an`
              : 'Donn??es insuffisantes'}
          </h3>
          <p>
            Moyenne annuelle du nombre de remboursements de m??dicament par patient et par
            conditionnement de m??dicament.
          </p>
        </div>
      </div>

      <div className="flex flex-shrink flex-col md:flex-row gap-8 mb-8 m-auto mt-8">
        <div className="flex-1 flex-shrink">
          <GraphBox
            title="R??partition par sexe des patients trait??s"
            className="h-full max-w-[100%]"
          >
            {currentEntity.repartitionPerGender?.female?.valuePercent !== 0 &&
            currentEntity.repartitionPerGender?.male?.valuePercent !== 0 ? (
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
            title="R??partition par ??ge des patients trait??s"
            className="h-full max-w-[100%]"
          >
            <PieChartRepartition
              theme="primary"
              className="h-64 w-full flex justify-center items-center"
              data={repartitionPerAge}
            />
          </GraphBox>
        </div>
      </div>
    </div>
  );
};

const SectionMedicinalErrors = () => {
  const { currentEntity } = useEntityContext<EntityCis>();
  const { exposition } = currentEntity;

  const populationRepartition = useMemo(
    () =>
      buildSortedRangeData<MedicalErrorsPopulation>(
        currentEntity?.medicalErrors?.populationRepartition,
        'number'
      ),
    [currentEntity?.medicalErrors?.populationRepartition]
  );

  return (
    <div className="SectionMedicinalErrors sectionPart mt-4 mb-8" id="sectionMedicinalErrors">
      <SectionTitle
        title="D??clarations d???erreurs m??dicamenteuses"
        subTitle={
          exposition?.maxYear && exposition?.minYear
            ? `Donn??es issues de la p??riode ${exposition.minYear} - ${exposition.maxYear}`
            : 'P??riode des donn??es issues non renseign??e'
        }
      />

      <Accordion
        title="Comment sont calcul??s ces indicateurs ? D???o?? viennent ces donn??es ?"
        className="rounded-lg shadow"
      >
        <p>
          L???erreur m??dicamenteuse est l&lsquo;omission ou la r??alisation non intentionnelle
          d&lsquo;un acte au cours des soins impliquant un m??dicament, qui peut ??tre ?? l???origine
          d???un risque ou d???un ??v??nement ind??sirable pour le patient.
        </p>
        <p>
          Les donn??es sur les erreurs m??dicamenteuses pr??sent??es ici, g??r??es par l???ANSM proviennent
          des d??clarations soit de risque d???erreur soit d???erreurs m??dicamenteuses avec ou sans
          ??v??nements ind??sirables. Elles sont d??clar??es par les patients ou les professionnels de
          sant??, notamment via{' '}
          <a
            rel="external noreferrer"
            target="_blank"
            href="https://signalement.social-sante.gouv.fr/psig_ihm_utilisateurs/index.html#/accueil"
          >
            le portail des signalements
          </a>
        </p>
        <p>
          Les erreurs m??dicamenteuses se classent en fonction de l&lsquo;??tape de survenue (erreur
          de prescription, erreur de d??livrance, erreur d???administration), de la cause de
          l&lsquo;erreur (produit, humaine et technique) et de la nature de l&lsquo;erreur (de
          m??dicament ou de patient).{' '}
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
          <GraphBox title="R??partition de la population concern??e" className="h-full max-w-[100%]">
            <PieChartRepartition theme="primary-full" data={populationRepartition} />
          </GraphBox>
        </div>

        <div className="flex-1 flex-shrink">
          <GraphBox title="Existence d???effets ind??sirables suite aux erreurs m??dicamenteuses d??clar??es">
            {currentEntity?.medicalErrors?.sideEffectsOriginRepartition?.with?.valuePercent &&
            currentEntity?.medicalErrors?.sideEffectsOriginRepartition?.without?.valuePercent ? (
              <div className="flex justify-center text-center gap-2 w-full">
                <div className="w-full flex flex-col justify-center items-center gap-1">
                  <ManFaceYes className="w-32" />
                  <span className="text-3xl text-dark-violet-800 mt-3">
                    {currentEntity.medicalErrors?.sideEffectsOriginRepartition?.with?.valuePercent}%
                  </span>
                  <span className="text-base">Sans effets ind??sirables</span>
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
                  <span className="text-base">Avec effets ind??sirables</span>
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
          title="?? quelle ??tape sont survenues les erreurs m??dicamenteuses d??clar??es ?"
          render={({ selectedUnitOption }) => {
            const apparitionStepRepartition = buildSortedRangeData<MedicalErrorsApparitionStep>(
              currentEntity.medicalErrors?.apparitionStepRepartition,
              selectedUnitOption
            );

            return (
              <GraphFiguresGrid
                data={apparitionStepRepartition}
                renderItem={(apparitionStep) => {
                  const step = apparitionStep.step as MedicalErrorApparitionStep;

                  return (
                    <GraphFigure
                      unit={selectedUnitOption === 'percent' ? ' % ' : ''}
                      value={
                        (selectedUnitOption === 'percent'
                          ? apparitionStep.valuePercent
                          : apparitionStep.value) ?? 0
                      }
                      label={apparitionStep.label}
                      icon={getMedErrorApparitionStepIcon(step)}
                    />
                  );
                }}
              />
            );
          }}
        />
      )}

      {currentEntity.medicalErrors?.natureRepartition && (
        <GraphBoxSelect
          title="Nature des erreurs m??dicamenteuses"
          className="max-w-full my-8"
          render={({ selectedUnitOption }) => {
            const natureRepartition = buildSortedRangeData<MedicalErrorsNature>(
              currentEntity.medicalErrors?.natureRepartition,
              selectedUnitOption
            );

            return (
              <BarChartMedicalErrorsNature
                dataKey={selectedUnitOption}
                className="h-64 w-full flex justify-center items-center"
                natureMedicalErrors={natureRepartition}
              />
            );
          }}
        />
      )}
    </div>
  );
};

const SectionSideEffects = () => {
  const { currentEntity } = useEntityContext<EntityCis>();
  const { exposition } = currentEntity;

  const substances = useMemo(
    () => currentEntity?.substances ?? [],
    [currentEntity?.substances]
  ) as Substance[];

  return (
    <div className="SectionSideEffects" id="sectionSideEffects">
      <SectionTitle
        title="D??clarations d&lsquo;effets ind??sirables suspect??s, par substance active"
        subTitle={
          exposition?.maxYear && exposition?.minYear
            ? `Donn??es issues de la p??riode ${exposition.minYear} - ${exposition.maxYear}`
            : 'P??riode des donn??es issues non renseign??e'
        }
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
  const { exposition, rupturesHistory } = currentEntity;

  const ruptures = useMemo(
    () => (rupturesHistory?.ruptures ?? []) as SpecialityRupture[],
    [rupturesHistory?.ruptures]
  );

  const count = useMemo(() => rupturesHistory?.meta?.count ?? 0, [rupturesHistory?.meta?.count]);

  return (
    <div className="SectionRisksShortageHistory" id="sectionRisksShortageHistory">
      <SectionTitle
        title="Historique des d??clarations de ruptures et de risques de rupture de stock clotur??es"
        subTitle={
          exposition?.maxYear && exposition?.minYear
            ? `Donn??es issues de la p??riode ${exposition.minYear} - ${exposition.maxYear}`
            : 'P??riode des donn??es issues non renseign??e'
        }
      />

      <Accordion
        className="shadow rounded-lg"
        classNameTitle="text-primary"
        theme="primary"
        title="Quelles donn??es sont affich??es ? D???o?? viennent-elles ?"
      >
        <p>
          Cette rubrique recense l&apos;historique des d??clarations de ruptures et de risques de
          rupture concernant les <b>m??dicaments d???int??r??t th??rapeutique majeur (MITM)</b>, pour
          lesquelles les industriels ont une obligation de d??claration aupr??s de l&apos;ANSM depuis
          le 3 Mai 2021.
        </p>

        <p>
          Pour retrouver les derni??res informations destin??es aux professionnels de sant?? et aux
          patients concernant les m??dicaments d???int??r??t th??rapeutique majeur faisant actuellement
          l???objet de difficult??s d???approvisionnement et pour lesquels il n???y a pas d???alternative
          th??rapeutique disponible sur le march?? fran??ais, vous pouvez vous r??f??rer au site:{' '}
          <a
            rel="external noreferrer"
            target="_blank"
            href="https://ansm.sante.fr/disponibilites-des-produits-de-sante/medicaments"
          >
            https://ansm.sante.fr/disponibilites-des-produits-de-sante/medicaments
          </a>
        </p>
      </Accordion>

      <div className="my-8 RupturesHistory">
        {count ? (
          <div className="p-4 border border-grey-200 rounded-lg bg-white">
            <div className="text-primary font-medium">
              <span>{`${count} ${count === 1 ? 'd??claration' : 'd??clarations'}`}</span>
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
        title="Rupture ou risque de rupture des produits de sant??"
        image={<OutOfStockSvg className="h-48 w-32 m-auto" />}
        button={
          <Button
            externalLink
            variant="outlined"
            href="https://ansm.sante.fr/disponibilites-des-produits-de-sante/medicaments"
            className="uppercase"
          >
            disponiblit?? des produits de sant??
          </Button>
        }
      >
        <p>
          Acc??dez ?? l???actualit?? des ruptures et risques de rupture des produits de sant??
          (m??dicaments, dispositifs m??dicaux, vaccins) disponibles sur le site de l???ANSM.
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
      <SectionTitle title="Publications de l???ANSM" />

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
          label: 'Patients trait??s',
          content: <SectionTreatedPatients />,
        },
        {
          id: 'side-effects',
          label: 'Effets ind??sirables',
          content: <SectionSideEffects />,
        },
        {
          id: 'medicinal-errors',
          label: 'Erreurs m??dicamenteuses',
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
