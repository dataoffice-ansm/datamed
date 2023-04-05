import { EntityPageLayout } from '../../components/Layouts/EntityPageLayout/EntityPageLayout';
import { HeroHeader } from '../../components/HeroHeader/HeroHeader';
import type { EntityCis } from '../../contexts/EntityContext';
import { EntityContextProvider, useEntityContext } from '../../contexts/EntityContext';
import TargetBlankIcon from '../../assets/pictos/targetBlank.svg';
import Link from 'next/link';
import { useMemo, useRef } from 'react';
import type {
  MedicalErrorsApparitionStep,
  MedicalErrorApparitionStep,
  Substance,
  Speciality,
  MedicalErrorsNature,
} from '../../graphql/__generated__/generated-documents';
import { SpecialitySubstancesContainer } from './SpecialitySubstancesContainer';
import { Accordion } from '../../components/Accordion';
import WomanIllustration from '../../assets/pictos/woman_illustration.svg';
import ManIllustration from '../../assets/pictos/man_illustration.svg';
import ManFaceNo from '../../assets/pictos/manFaceNo.svg';
import ManFaceYes from '../../assets/pictos/manFaceYes.svg';
import OutOfStockSvg from '../../assets/pictos/out_of_stock.svg';
import CommuniqueSvg from '../../assets/pictos/communique.svg';

import { numberWithThousand } from '../../utils/format';
import { NotEnoughData } from '../../components/NotEnoughData';
import { GraphFigure } from '../../components/GraphFigure';
import { PublicationItem } from './PublicationItem';
import { ShortageHistoryItem } from './ShortageHistoryItem';
import { PaginatedList } from '../../components/PaginatedList';
import { PieChartRepartition } from '../../components/Charts/PieChartRepartition';
import { GraphBox } from '../../components/GraphBox/GraphBox';
import { SectionTitle } from '../../components/SectionTitle';
import { GraphBoxSelect } from '../../components/GraphBoxSelect';
import { GraphFiguresGrid } from '../../components/GraphFiguresGrid';
import { BarChartMedicalErrorsNature } from '../../components/Charts/BarChartMedicalErrorsNature';
import { CardWithImage } from '../../components/CardWithImage';
import { Button } from '../../components/Button/Button';
import { getMedErrorApparitionStepIcon } from '../../utils/iconsMapping';
import { buildSortedRangeData } from '../../utils/entities';
import {
  type MedicalErrorsPopulation,
  type SpecialityUsagePerAge,
} from '../../graphql/__generated__/generated-documents';
import { UsageBarContainer } from '../../components/UsageBarContainer';
import classNames from 'classnames';

const SectionOneGlobalInformation = () => {
  const { currentEntity } = useEntityContext<EntityCis>();

  const substances = useMemo(
    () => currentEntity?.substances ?? [],
    [currentEntity?.substances]
  ) as Substance[];

  return (
    <div className="SectionOneGlobalInformation bg-white shadow rounded-lg p-4">
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
          <span
            className={classNames(
              'py-2 px-3 rounded-lg',
              currentEntity.commercialisationState === 'Commercialisée'
                ? 'bg-dark-green-100'
                : 'bg-red-100'
            )}
          >
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
      <div className="sectionPart mt-4 mb-8">
        <h5>Informations de la Base de Données Publique des Médicaments (BDPM)</h5>
        <p>
          Retrouvez des informations de référence sur ce médicament, notamment ses indications
          thérapeutiques, les données de remboursement, la notice pour le patient, le RCP pour les
          professionnels, les avis rendus par la Commission de la Transparence et bien d’autres
          informations.
        </p>
        <p>
          <a
            rel="external noreferrer"
            target="_blank"
            href={`https://base-donnees-publique.medicaments.gouv.fr/extrait.php?specid=${currentEntity.code}`}
            className="text-sm text-primary flex items-center gap-1"
          >
            <TargetBlankIcon className="w-3 h-3" />
            <span>Fiche info de la BDPM</span>
          </a>
        </p>
      </div>

      {/*{currentEntity.description && (*/}
      {/*  <div className="sectionPart mt-4 mb-8">*/}
      {/*    <h5>Description</h5>*/}
      {/*    <p>{currentEntity.description}</p>*/}
      {/*  </div>*/}
      {/*)}*/}

      {/*<div className="flex justify-center items-center gap-3">*/}
      {/*  <h5>Infos pour les patients</h5>*/}
      {/*  <a*/}
      {/*    rel="external noreferrer"*/}
      {/*    target="_blank"*/}
      {/*    href={`https://base-donnees-publique.medicaments.gouv.fr/affichageDoc.php?specid=${currentEntity.code}&typedoc=N`}*/}
      {/*    className="text-sm text-primary"*/}
      {/*  >*/}
      {/*    Afficher la notice*/}
      {/*  </a>*/}

      {/*<div className="flex-1">*/}
      {/*  <h5>Infos pour les professionnels de santé</h5>*/}
      {/*  <a*/}
      {/*    rel="external noreferrer"*/}
      {/*    target="_blank"*/}
      {/*    href={`https://base-donnees-publique.medicaments.gouv.fr/affichageDoc.php?specid=${currentEntity.code}&typedoc=R`}*/}
      {/*    className="text-sm text-primary"*/}
      {/*  >*/}
      {/*    Afficher le RCP*/}
      {/*  </a>*/}
      {/*</div>*/}

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
      {/*</div>*/}
    </div>
  );
};

const SectionTreatedPatients = () => {
  const { currentEntity } = useEntityContext<EntityCis>();
  const { exposition } = currentEntity;

  const repartitionPerAge = useMemo(
    () =>
      buildSortedRangeData<SpecialityUsagePerAge>(currentEntity?.repartitionPerAge ?? [], 'number'),
    [currentEntity?.repartitionPerAge]
  );

  return (
    <div className="sectionPart mt-4 mb-8" id="sectionTreatedPatients">
      <SectionTitle
        title="Patients traités en ville"
        subTitle={
          exposition?.openMedicPeriod?.maxYear && exposition?.openMedicPeriod?.minYear
            ? `Données issues de la période ${exposition?.openMedicPeriod?.minYear} - ${exposition?.openMedicPeriod?.maxYear}`
            : 'Période des données issues non renseignée'
        }
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
          médicament.
        </p>
        <p>
          La donnée statistique présentée ci-dessous est une moyenne annuelle et arrondie, du nombre
          de remboursements de médicament par patient et par conditionnement de médicament par année
          civile.
        </p>
      </Accordion>

      <div className="expositionChart my-4 flex rounded-lg shadow bg-white overflow-hidden">
        <div className="expositionChartLeft flex flex-col items-center justify-between p-4 min:h-20 flex-1 bg-primary py-6">
          <span className="text-white">{exposition?.description}</span>
          {exposition && <UsageBarContainer exposition={exposition} entityType="cis" />}
        </div>

        <div className="expositionChartRight flex flex-col flex-3 px-4 py-2">
          <h3 className="text-2xl text-primary">
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
            {currentEntity.repartitionPerGender?.female?.valuePercent !== 0 &&
            currentEntity.repartitionPerGender?.male?.valuePercent !== 0 ? (
              <div className="mt-8 flex gap-8 justify-center items-center">
                {currentEntity.repartitionPerGender?.female?.valuePercent && (
                  <GraphFigure
                    value={currentEntity.repartitionPerGender?.female?.valuePercent}
                    label="Femmes"
                    valueClassName="mt-2 text-primary"
                    icon={<WomanIllustration className="w-24 sm:w-32" />}
                  />
                )}
                {currentEntity.repartitionPerGender?.male?.valuePercent && (
                  <GraphFigure
                    value={currentEntity.repartitionPerGender.male?.valuePercent}
                    valueClassName="mt-2 text-primary"
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
        currentEntity?.medicalErrors?.populationRepartition ?? [],
        'number'
      ),
    [currentEntity?.medicalErrors?.populationRepartition]
  );

  return (
    <div className="SectionMedicinalErrors sectionPart mt-4 mb-8" id="sectionMedicinalErrors">
      <SectionTitle
        title="Déclarations d’erreurs médicamenteuses"
        subTitle={
          currentEntity?.medicalErrors?.errMedPeriod?.maxYear &&
          currentEntity?.medicalErrors?.errMedPeriod?.minYear
            ? `Données issues de la période ${currentEntity?.medicalErrors?.errMedPeriod?.minYear} - ${currentEntity?.medicalErrors?.errMedPeriod?.maxYear}`
            : 'Période des données issues non renseignée'
        }
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
            <PieChartRepartition
              theme="primary"
              data={populationRepartition}
              className="h-64 w-full flex justify-center items-center"
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
                  <span className="text-2xl lg:text-3xl text-dark-violet-800 mt-3">
                    {currentEntity.medicalErrors?.sideEffectsOriginRepartition?.with?.valuePercent}%
                  </span>
                  <span className="text-base">Sans effets indésirables</span>
                </div>

                <div className="w-full flex flex-col justify-center items-center gap-1">
                  <ManFaceNo className="w-32" />
                  <span className="text-2xl lg:text-3xl text-dark-violet-800 mt-3">
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
          render={({ selectedUnitOption }) => {
            const apparitionStepRepartition = buildSortedRangeData<MedicalErrorsApparitionStep>(
              currentEntity.medicalErrors?.apparitionStepRepartition ?? [],
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
                      contentTooltip={apparitionStep.description ?? ''}
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
          title="Nature des erreurs médicamenteuses"
          className="max-w-full my-8"
          render={({ selectedUnitOption }) => {
            const natureRepartition = buildSortedRangeData<MedicalErrorsNature>(
              currentEntity.medicalErrors?.natureRepartition ?? [],
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
  const { bnpvPeriod } = currentEntity;

  const substances = useMemo(
    () => currentEntity?.substances ?? [],
    [currentEntity?.substances]
  ) as Substance[];

  return (
    <div className="SectionSideEffects" id="sectionSideEffects">
      <SectionTitle
        title="Déclarations d&lsquo;effets indésirables suspectés, par substance active"
        subTitle={
          bnpvPeriod?.maxYear && bnpvPeriod?.minYear
            ? `Données issues de la période ${bnpvPeriod?.minYear} - ${bnpvPeriod?.maxYear}`
            : 'Période des données issues non renseignée'
        }
      />

      <Accordion
        className="shadow rounded-lg"
        classNameTitle="text-primary"
        theme="primary"
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
          niveau de détail.
        </p>

        <p>
          Ces données sont issues de la Base Nationale de Pharmacovigilance (BNPV), qui est la base
          de données de l&apos;ANSM alimentée par les Centres Régionaux de Pharmacovigilance (CRPV).
          Elle inclut l&apos;ensemble des déclarations suspectées comme étant en lien avec
          l&apos;usage d&apos;un ou plusieurs médicaments. Ces dernières sont notifiées par les
          professionnels de santé ou par les patients et association agréées via un portail dédié:{' '}
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
            Pour plus d’information, consultez:{' '}
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

      <SpecialitySubstancesContainer
        substances={substances}
        className="mt-4 mb-32 shadow rounded-lg"
      />
    </div>
  );
};

const SectionRisksShortageHistory = () => {
  const refList = useRef<HTMLDivElement | null>(null);
  const { currentEntity } = useEntityContext<EntityCis>();
  const { exposition, shortagesHistory } = currentEntity;
  const shortages = useMemo(() => shortagesHistory?.shortages ?? [], [shortagesHistory?.shortages]);
  const count = useMemo(() => shortagesHistory?.meta?.count ?? 0, [shortagesHistory?.meta?.count]);

  return (
    <div className="SectionRisksShortageHistory" id="sectionRisksShortageHistory">
      <SectionTitle
        title="Historique des déclarations de ruptures et de risques de rupture de stock cloturées"
        subTitle={
          currentEntity?.shortagesHistory?.trustMedPeriod?.maxYear &&
          currentEntity?.shortagesHistory?.trustMedPeriod?.minYear
            ? `Données issues de la période ${currentEntity?.shortagesHistory?.trustMedPeriod?.minYear} - ${currentEntity?.shortagesHistory?.trustMedPeriod?.maxYear}`
            : 'Période des données issues non renseignée'
        }
      />

      <Accordion
        className="shadow rounded-lg"
        classNameTitle="text-primary"
        theme="primary"
        title="Quelles données sont affichées ? D’où viennent-elles ?"
      >
        <p>
          Cette rubrique recense l&apos;historique des déclarations de ruptures et de risques de
          rupture concernant les <b>médicaments d’intérêt thérapeutique majeur (MITM)</b>, pour
          lesquelles les industriels ont une obligation de déclaration auprès de l&apos;ANSM depuis
          le 3 Mai 2021.
        </p>

        <p>
          Pour retrouver les dernières informations destinées aux professionnels de santé et aux
          patients concernant les médicaments d’intérêt thérapeutique majeur faisant actuellement
          l’objet de difficultés d’approvisionnement et pour lesquels il n’y a pas d’alternative
          thérapeutique disponible sur le marché français, vous pouvez vous référer au site:{' '}
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
          <div className="p-4 border border-grey-100 rounded-lg bg-white">
            <div className="text-primary font-medium">
              <span>{`${numberWithThousand(count)} ${
                count === 1 ? 'déclaration' : 'déclarations'
              }`}</span>
            </div>
            <div className="pt-6">
              <PaginatedList
                listRef={refList}
                theme="primary"
                data={shortages}
                renderItem={(shortageItem) => <ShortageHistoryItem shortageItem={shortageItem} />}
              />
            </div>
          </div>
        ) : (
          <div className="w-full flex justify-center items-center">
            <NotEnoughData />
          </div>
        )}
      </div>

      <CardWithImage
        className="border border-grey-100 rounded-lg"
        imageClassName="w-48 px-2"
        title="Rupture ou risque de rupture des produits de santé"
        image={<OutOfStockSvg />}
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
        <div className="w-full flex justify-center items-center">
          <NotEnoughData />
        </div>
      )}
    </div>
  );
};

export const SpecialityPage = ({ cis }: { cis: Speciality }) => (
  <EntityContextProvider entity={{ type: 'cis', ...cis }}>
    <EntityPageLayout
      offsetContent={40}
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
        // {
        //   id: 'publications',
        //   label: 'Publications',
        //   content: <SectionPublications />,
        // },
      ]}
      render={(content) => content}
    >
      <HeroHeader />
    </EntityPageLayout>
  </EntityContextProvider>
);
