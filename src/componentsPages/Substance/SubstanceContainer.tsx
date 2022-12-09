import type {
  RepartitionPerPathology,
  Substance,
  HltEffect,
  Maybe,
} from '../../graphql/__generated__/generated-documents';
import { BoxInfo } from '../../components/BoxInfo';
import FolderSVG from '../../assets/icons/folder/folder.svg';
import { GraphBox } from '../../components/GraphBox/GraphBox';
import { GraphFigure } from '../../components/GraphFigure';
import WomanFigure from '../../assets/images/woman_illustration.svg';
import ManFigure from '../../assets/images/man_illustration.svg';
import { PieChartRepartitionAge } from '../Speciality/PieChartRepartitionAge';
import { Accordion } from '../../components/Accordion/Accordion';
import type { HTMLAttributes } from 'react';
import { useMemo } from 'react';
import { useState } from 'react';
import { NotEnoughData } from '../../components/NotEnoughData';
import {
  getCisErrorMedNatureIconMapping,
  getFigureBySideEffectPathology,
  getNotifierFigureByJob,
} from '../../utils/mapping';
import { Button } from '../../components/Button/Button';
import { Modal } from '../../components/Modal/Modal';
import { GraphBoxSelect } from '../../components/GraphBoxSelect';
import { GraphFiguresGrid } from '../../components/GraphFiguresGrid';

/**
 *
 * @param pathology
 * @constructor
 */
const PathologyOrgansRepartitionModal = ({ pathology }: { pathology: RepartitionPerPathology }) => {
  const [openModal, setOpenModal] = useState(false);

  const htlEffects: Array<Maybe<HltEffect>> = useMemo(
    () =>
      (pathology.htlEffects ?? [])
        .filter((htfEffect) => (htfEffect?.value ?? 0) >= 10)
        .sort((a, b) => (b?.value ?? 0) - (a?.value ?? 0)),
    [pathology.htlEffects]
  );

  return (
    <div className="PathologyOrgansRepartitionModal">
      {(pathology.htlEffects as HltEffect[]).length > 0 && (
        <Button
          as="button"
          variant="none"
          onClick={() => {
            setOpenModal(true);
          }}
        >
          Voir détails
        </Button>
      )}

      {openModal && pathology && (
        <Modal
          isOpen={openModal}
          closeClassName="absolute top-0 right-0 m-4"
          onClose={() => {
            setOpenModal(false);
          }}
        >
          <div className="flex justify-center items-center py-4">
            <div className="h-24 w-24 md:h-32 md:w-32">
              {getFigureBySideEffectPathology(pathology.id)}
            </div>
          </div>
          <div className="text-xl text-center font-medium">
            Sous-répartition des déclarations d’effets indésirables : {pathology.range}
          </div>
          {htlEffects && (
            <ul className="list-none border-t border-grey-100">
              {htlEffects.map((e) => (
                <li key={e?.id} className="flex justify-between border-b border-grey-100 py-4">
                  <span>{e?.range} </span>
                  <strong>{e?.value}%</strong>
                </li>
              ))}
            </ul>
          )}
        </Modal>
      )}
    </div>
  );
};

/**
 *
 * @param substance
 * @param children
 * @constructor
 */
export const SubstanceContainer = ({
  substance,
}: { substance: Substance } & HTMLAttributes<HTMLElement>) => {
  const {
    repartitionPerAge,
    repartitionPerSex,
    repartitionPerNotifier,
    repartitionPerPathology,
    totalExposition,
  } = substance;

  return (
    <div className="SubstancesContainerContentTitle text-left">
      <BoxInfo
        title={`${totalExposition?.total ?? 'Aucune'} déclaration(s) reçue(s)`}
        icon={<FolderSVG />}
        theme="secondary"
        className="my-8"
        tooltip={
          <div>
            <strong>Nombre de déclarations</strong>
            <div>
              Travail réalisé sur une extraction de 5 ans de la BNPV, avec objectif de mise à jour
              progressive des données.
            </div>
          </div>
        }
      >
        Nombre de déclarations d&lsquo;effets indésirables
        {totalExposition?.minYear &&
          totalExposition?.maxYear &&
          `sur la période ${totalExposition?.minYear} ${totalExposition?.maxYear}`}
      </BoxInfo>

      <div className="flex flex-shrink flex-col md:flex-row gap-8 mb-8 m-auto">
        <div className="flex-1 flex-shrink">
          <GraphBox
            title="Répartition par sexe des patients traités parmi les cas déclarés d'effets indésirables"
            className="h-full max-w-[100%]"
          >
            {repartitionPerSex?.female && repartitionPerSex?.male ? (
              <div className="mt-8 flex gap-8 justify-center items-center">
                {repartitionPerSex?.female && (
                  <GraphFigure
                    value={repartitionPerSex?.female}
                    description="Femmes"
                    valueClassName="mt-2 text-secondary"
                    icon={<WomanFigure className="w-32" />}
                  />
                )}
                {repartitionPerSex?.male && (
                  <GraphFigure
                    value={repartitionPerSex.male}
                    valueClassName="mt-2 text-secondary"
                    description="Hommes"
                    icon={<ManFigure className="w-32" />}
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
            title="Répartition par âge des patiens traités parmi les cas déclarés d'effets indésirables"
            className="h-full max-w-[100%]"
          >
            <div className="mt-8 flex gap-8 justify-center items-center">
              <PieChartRepartitionAge
                theme="secondary"
                className="h-64 w-full flex justify-center items-center"
                ageData={repartitionPerAge}
              />
            </div>
          </GraphBox>
        </div>
      </div>

      <GraphBox title="Répartition par type de déclarants" className="max-w-full my-8">
        {repartitionPerNotifier?.length ? (
          <div className="GraphFigures flex gap-12 justify-center items-start flex-wrap py-4">
            {repartitionPerNotifier.map((notifier) =>
              notifier?.id && notifier?.value && notifier.job ? (
                <GraphFigure
                  key={notifier.id}
                  value={notifier.value}
                  valueClassName="text-secondary my-2"
                  description={notifier.job}
                  icon={getNotifierFigureByJob(notifier.id)}
                  descriptionClassName="text-[16px] md:text-[18px] text-center"
                />
              ) : null
            )}
          </div>
        ) : (
          <div className="w-full flex justify-center items-center">
            <NotEnoughData />
          </div>
        )}
      </GraphBox>

      <Accordion
        defaultOpen
        title="Comment sont calculés ces indicateurs ? D’où viennent ces données ?"
        theme="secondary"
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
          Sont affichés ici tous les SOC, ainsi que le détail du type d’effet si les effectifs sont
          supérieurs ou égaux à 11.
        </p>
      </Accordion>

      <GraphBoxSelect
        initialIndex={1}
        title="Effets indésirables suspectés de la substance active"
        render={(selectedOption) => (
          <div className="GraphBoxSelectContent">
            <div className="font-medium text-lg md:text-xl lg:text-2xl mt-2 mb-6 px-4">
              Parmi les <span className="text-secondary font-medium">{totalExposition?.total}</span>{' '}
              déclarations d’effets indésirables pour:{' '}
              <span className="text-secondary font-medium">{substance.name}</span>
            </div>

            <GraphFiguresGrid
              data={
                repartitionPerPathology?.filter(
                  (pathologyRepartition) =>
                    pathologyRepartition?.id &&
                    pathologyRepartition?.range &&
                    pathologyRepartition?.value &&
                    pathologyRepartition?.valuePercent
                ) ?? []
              }
              renderItem={(pathologyRepartition) =>
                pathologyRepartition?.id &&
                pathologyRepartition?.range &&
                pathologyRepartition?.value &&
                pathologyRepartition?.valuePercent ? (
                  <GraphFigure
                    className="pathologyGraphFigure"
                    unit={selectedOption === 'percent' ? ' % ' : ''}
                    description={pathologyRepartition.range}
                    icon={getCisErrorMedNatureIconMapping(pathologyRepartition.id)}
                    action={<PathologyOrgansRepartitionModal pathology={pathologyRepartition} />}
                    valueClassName="text-secondary-900"
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
