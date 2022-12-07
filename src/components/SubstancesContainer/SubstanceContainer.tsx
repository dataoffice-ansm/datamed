/* eslint-disable @typescript-eslint/restrict-template-expressions */
import type {
  Maybe,
  RepartitionPerPathology,
  Substance,
  HltEffect,
} from '../../graphql/__generated__/generated-documents';
import { BoxInfoTitle } from '../BoxInfoTitle/BoxInfoTitle';
import FolderSVG from '../../assets/icons/folder/folder.svg';
import { GraphBox } from '../GraphBox/GraphBox';
import { GraphFigure } from '../GraphFigure/GraphFigure';
import WomanFigure from '../../assets/images/woman_illustration.svg';
import ManFigure from '../../assets/images/man_illustration.svg';
import { PieChartRepartitionAge } from '../Charts/PieChartRepartitionAge';
import { Accordion } from '../Accordion/Accordion';
import { GetFigureByPathology } from './componentContainer/GetFigureByPathology';
import type { HTMLAttributes } from 'react';
import { useCallback, useState } from 'react';
import type { SelectOption } from '../Select/Select';
import { Select } from '../Select/Select';
import { NotEnoughData } from '../NotEnoughData';
import { getNotifierFigureByJob } from '../../utils/mapping';
import { Button } from '../Button/Button';
import { Modal } from '../Modal/Modal';

const PathologyDetailModal = ({ pathology }: { pathology: RepartitionPerPathology }) => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div>
      {(pathology.htlEffects as HltEffect[]).length > 0 ? (
        <Button
          as="button"
          variant="none"
          onClick={() => {
            setOpenModal(true);
          }}
        >
          Voir détail
        </Button>
      ) : null}
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
              <GetFigureByPathology id={pathology.id} />
            </div>
          </div>
          <div className="text-xl text-center font-medium">
            Sous-répartition des déclarations d’effets indésirables : {pathology.range}
          </div>
          {pathology?.htlEffects && (
            <ul className="list-none border-t border-grey-100">
              {(pathology?.htlEffects ?? []).map((e) => (
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

export const PathologyContainer = ({
  repartitionPerPathology,
  totalExposition,
  substanceName,
}: {
  repartitionPerPathology?: Array<Maybe<RepartitionPerPathology>>;
  totalExposition?: number;
  substanceName?: string;
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const options: SelectOption[] = [
    {
      label: 'Pourcentage',
      value: 'percent',
    },
    {
      label: 'Nombre',
      value: 'number',
    },
  ];
  const selectedOption = options[selectedIndex].value;

  const onChange = useCallback((index: number) => {
    setSelectedIndex(index);
  }, []);

  return (
    <div className="SubstancesContainerHeader flex gap-4 justify-start items-center p-4 flex-wrap shadow rounded-lg bg-white">
      <span className="SubstancesContainerHeaderTitle text-xl px-4 flex-auto flex justify-start font-medium text-left">
        Effets indésirables suspectés de la substance active
      </span>
      <div className="SubstancesContainerHeaderSelect w-full max-w-xs">
        <Select
          theme="secondary"
          defaultOptionIndex={selectedIndex}
          options={options}
          onSelectOption={onChange}
        />
      </div>

      {(repartitionPerPathology?.length ?? 0) > 0 ? (
        <div>
          <div className="px-4 text-2xl my-6">
            Parmi les <span className="text-secondary font-medium">{totalExposition}</span>{' '}
            déclarations d’effets indésirables pour:{' '}
            <span className="text-secondary font-medium">{substanceName}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 m-auto mt-8 p-4">
            {repartitionPerPathology
              ?.filter((pathology) => pathology)
              .map((pathology) =>
                pathology?.id && pathology?.valuePercent && pathology.value && pathology.range ? (
                  <div key={pathology.id} className="flex justify-center">
                    <GraphFigure
                      className="pathologyGraphFigure"
                      unit={selectedOption === 'percent' ? ' % ' : ''}
                      value={
                        selectedOption === 'percent' ? pathology.valuePercent : pathology.value
                      }
                      valueClassName="text-secondary"
                      description={pathology.range}
                      descriptionClassName="text-[16px] md:text-[18px] text-center"
                      icon={<GetFigureByPathology id={pathology.id} />}
                      action={<PathologyDetailModal pathology={pathology} />}
                    />
                  </div>
                ) : null
              )}
          </div>
        </div>
      ) : (
        <div className="w-full flex justify-center items-center">
          <NotEnoughData />
        </div>
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
  children,
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
      <BoxInfoTitle
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
          totalExposition?.maxYear !== null &&
          `sur la période ${totalExposition?.minYear} ${totalExposition?.maxYear}`}
      </BoxInfoTitle>

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
                    icon={<WomanFigure />}
                  />
                )}
                {repartitionPerSex?.male && (
                  <GraphFigure
                    value={repartitionPerSex.male}
                    valueClassName="mt-2 text-secondary"
                    description="Hommes"
                    icon={<ManFigure />}
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
            <PieChartRepartitionAge
              theme="secondary"
              className="h-64 w-full flex justify-center items-center"
              ageData={repartitionPerAge}
            />
          </GraphBox>
        </div>
      </div>

      <GraphBox title="Répartition par type déclarant" className="max-w-full my-8">
        {repartitionPerNotifier?.length ? (
          <div className="flex gap-12 justify-center flex-wrap py-4">
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

      <PathologyContainer
        repartitionPerPathology={repartitionPerPathology ?? []}
        totalExposition={totalExposition?.total ?? 0}
        substanceName={substance.name}
      />

      {children}
    </div>
  );
};
