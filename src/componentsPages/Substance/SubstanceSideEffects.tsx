import type {
  RepartitionPerPathology,
  Substance,
  HltEffect,
} from '../../graphql/__generated__/generated-documents';
import { BoxInfo } from '../../components/BoxInfo';
import FolderSVG from '../../assets/pictos/folder.svg';
import { GraphBox } from '../../components/GraphBox/GraphBox';
import { GraphFigure } from '../../components/GraphFigure';
import WomanFigure from '../../assets/pictos/woman_illustration.svg';
import ManFigure from '../../assets/pictos/man_illustration.svg';
import { PieChartRepartition } from '../../components/Charts/PieChartRepartition';
import { Accordion } from '../../components/Accordion';
import type { HTMLAttributes } from 'react';
import { useMemo } from 'react';
import { useState } from 'react';
import { NotEnoughData } from '../../components/NotEnoughData';
import { getSideEffectPathologyIcon, getNotifierIcon } from '../../utils/iconsMapping';
import { Button } from '../../components/Button/Button';
import { Modal } from '../../components/Modal';
import { GraphBoxSelect } from '../../components/GraphBoxSelect';
import { GraphFiguresGrid } from '../../components/GraphFiguresGrid';
import {
  type RepartitionPerAge,
  type RepartitionPerNotifier,
} from '../../graphql/__generated__/generated-documents';
import { CardWithImage } from '../../components/CardWithImage';
import SickPersonSvg from '../../assets/pictos/sick_transparent_person.svg';
import { buildSortedRangeData } from '../../utils/entities';

/**
 *
 * @param pathology
 * @constructor
 */
const PathologyOrgansRepartitionModal = ({ pathology }: { pathology: RepartitionPerPathology }) => {
  const [openModal, setOpenModal] = useState(false);

  const htlEffects = useMemo(
    () => buildSortedRangeData<HltEffect>(pathology.htlEffects, 'number'),
    [pathology.htlEffects]
  );

  return (
    <div className="PathologyOrgansRepartitionModal">
      {htlEffects.length > 0 && (
        <Button
          as="button"
          variant="none"
          onClick={() => {
            setOpenModal(true);
          }}
        >
          Voir d??tails
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
              {getSideEffectPathologyIcon(pathology.id)}
            </div>
          </div>
          <div className="text-xl text-center font-medium">
            Sous-r??partition des d??clarations d???effets ind??sirables : {pathology.range}
          </div>

          <ul className="list-none border-t border-grey-100">
            {htlEffects.map((e, index) => (
              <li
                key={`htlEffects_${index.toString()}`}
                className="flex justify-between border-b border-grey-100 py-4 gap-4"
              >
                <div>{e?.range} </div>
                <div className="flex gap-8 justify-center items-center">
                  <strong>{e?.value}</strong>
                  <strong>{e?.valuePercent}%</strong>
                </div>
              </li>
            ))}
          </ul>
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
export const SubstanceSideEffects = ({
  substance,
}: { substance: Substance } & HTMLAttributes<HTMLElement>) => {
  const repartitionPerAge = useMemo(
    () =>
      buildSortedRangeData<RepartitionPerAge>(substance.sideEffects?.repartitionPerAge, 'number'),
    [substance.sideEffects?.repartitionPerAge]
  );

  return (
    <div className="SubstanceContainerContentTitle text-left">
      <BoxInfo
        title={`${substance.exposition?.consumption ?? 'Aucune'} d??claration(s) re??ue(s)`}
        icon={<FolderSVG />}
        theme="secondary"
        className="my-8"
      >
        Nombre cumul?? de d??clarations d&lsquo;effets ind??sirables suspect??s{' '}
        {substance.exposition?.minYear &&
          substance.exposition?.maxYear &&
          `sur la p??riode ${substance.exposition?.minYear} ${substance.exposition?.maxYear}`}
      </BoxInfo>

      <div className="flex flex-shrink flex-col md:flex-row gap-8 mb-8 m-auto">
        <div className="flex-1 flex-shrink">
          {}
          <GraphBox
            title="R??partition par sexe des patients trait??s parmi les cas d??clar??s d'effets ind??sirables"
            className="h-full max-w-[100%]"
          >
            {substance.sideEffects?.repartitionPerGender?.female?.valuePercent &&
            substance.sideEffects?.repartitionPerGender?.male?.valuePercent ? (
              <div className="mt-8 flex gap-8 justify-center items-center">
                {substance.sideEffects?.repartitionPerGender?.female?.valuePercent && (
                  <GraphFigure
                    value={substance.sideEffects?.repartitionPerGender.female.valuePercent}
                    label="Femmes"
                    valueClassName="mt-2 text-secondary"
                    icon={<WomanFigure className="w-32" />}
                  />
                )}
                {substance.sideEffects?.repartitionPerGender?.male?.valuePercent && (
                  <GraphFigure
                    value={substance.sideEffects?.repartitionPerGender.male.valuePercent}
                    valueClassName="mt-2 text-secondary"
                    label="Hommes"
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
            title="R??partition par ??ge des patiens trait??s parmi les cas d??clar??s d'effets ind??sirables"
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

      {substance.sideEffects?.repartitionPerNotifier && (
        <GraphBoxSelect
          title="R??partition par type de d??clarants"
          theme="secondary"
          className="max-w-full my-8"
          render={({ selectedUnitOption }) => {
            const repartitionPerNotifier = buildSortedRangeData<RepartitionPerNotifier>(
              substance.sideEffects?.repartitionPerNotifier,
              selectedUnitOption
            );

            return (
              <GraphFiguresGrid
                data={repartitionPerNotifier}
                renderItem={(notifier) => (
                  <GraphFigure
                    key={notifier.id}
                    className="NotifierRepartition"
                    unit={selectedUnitOption === 'percent' ? ' % ' : ''}
                    label={notifier.job}
                    valueClassName="text-secondary my-2"
                    icon={getNotifierIcon(notifier.id)}
                    value={
                      (selectedUnitOption === 'percent' ? notifier.valuePercent : notifier.value) ??
                      0
                    }
                  />
                )}
              />
            );
          }}
        />
      )}

      <h3>Effets ind??sirables par syst??me d???organes</h3>

      <Accordion
        title="Comment sont calcul??s ces indicateurs ? D???o?? viennent ces donn??es ?"
        theme="secondary"
        className="my-8 shadow"
      >
        <p>
          Les effets ind??sirables peuvent ??tre regroup??s et class??s selon l&apos;organe concern??. 27
          syst??mes d&apos;organes ont ??t?? d??finis (<strong>Syst??me Organe Classe ou SOC</strong>).
        </p>
        <p>
          Une d??claration peut contenir plusieurs effets ind??sirables d???un m??me patient. Ces effets
          peuvent ??tre cat??goris??s dans plusieurs SOC, ils seront donc comptabilit??s dans chacun de
          ces SOC. ?? l&apos;inverse, si tous ces effets ind??sirables appartiennent au m??me SOC, ils
          ne seront comptabilis??s qu&apos;une fois dans ce SOC.
        </p>
        <p>
          Sont affich??s ici tous les SOC, ainsi que le d??tail du type d???effet si les effectifs sont
          sup??rieurs ou ??gaux ?? 11.
        </p>
      </Accordion>

      {substance.sideEffects?.repartitionPerPathology && (
        <GraphBoxSelect
          title="Effets ind??sirables suspect??s de la substance active"
          render={({ selectedUnitOption }) => {
            const repartitionPerPathology = buildSortedRangeData<RepartitionPerPathology>(
              substance.sideEffects?.repartitionPerPathology,
              selectedUnitOption
            );

            return (
              <div className="GraphBoxSelectContent">
                {repartitionPerPathology.length !== 0 && (
                  <div className="font-medium text-lg md:text-xl lg:text-2xl mt-2 mb-6 px-4">
                    Parmi les{' '}
                    <span className="text-secondary font-medium">
                      {substance.exposition?.consumption}
                    </span>{' '}
                    d??clarations d???effets ind??sirables pour :{' '}
                    <span className="text-secondary font-medium">{substance.name}</span>
                  </div>
                )}

                <GraphFiguresGrid
                  data={repartitionPerPathology}
                  renderItem={(pathologyRepartition) => (
                    <GraphFigure
                      key={pathologyRepartition.id}
                      className={`PathologyRepartition_${pathologyRepartition.id}`}
                      unit={selectedUnitOption === 'percent' ? ' % ' : ''}
                      label={pathologyRepartition.range}
                      icon={getSideEffectPathologyIcon(pathologyRepartition.id)}
                      action={<PathologyOrgansRepartitionModal pathology={pathologyRepartition} />}
                      valueClassName="text-secondary-900"
                      value={
                        selectedUnitOption === 'percent'
                          ? pathologyRepartition.valuePercent
                          : pathologyRepartition.value
                      }
                    />
                  )}
                />
              </div>
            );
          }}
        />
      )}

      <CardWithImage
        className="mb-8"
        imageClassName="w-52"
        title="Comment d??clarer un effet ind??sirable ?"
        image={<SickPersonSvg className="h-48 w-44 m-auto" />}
        button={
          <Button
            externalLink
            variant="outlined"
            href="https://ansm.sante.fr/documents/reference/declarer-un-effet-indesirable"
          >
            VOIR LES RECOMMANDATIONS DE L&apos;ANSM
          </Button>
        }
      >
        <p>
          D??couvrez comment l???ANSM centralise les signalements et alertes, et que faire selon votre
          situation.
        </p>
      </CardWithImage>
    </div>
  );
};
