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
import { numberWithThousand } from '../../utils/format';

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
              {getSideEffectPathologyIcon(pathology.id)}
            </div>
          </div>
          <div className="text-xl text-center font-medium">
            Sous-répartition des déclarations d’effets indésirables : {pathology.range}
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
        title={`${
          numberWithThousand(substance.sideEffects?.declarations?.total ?? 0) ?? 'Aucune'
        } déclarations reçues`}
        icon={<FolderSVG className="h-24 w-24" />}
        theme="secondary"
        className="my-8"
      >
        Nombre cumulé de déclarations d&lsquo;effets indésirables suspectés{' '}
        {substance.exposition?.minYear &&
          substance.exposition?.maxYear &&
          `sur la période ${substance.exposition?.minYear} ${substance.exposition?.maxYear}`}
      </BoxInfo>

      <div className="flex flex-shrink flex-col md:flex-row gap-8 mb-8 m-auto">
        <div className="flex-1 flex-shrink">
          {}
          <GraphBox
            title="Répartition par sexe des patients traités parmi les déclarations d'effets indésirables"
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
            title="Répartition par âge des patients traités parmi les déclarations d'effets indésirables"
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
          title="Répartition par type de déclarants"
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

      <h3>Effets indésirables par système d’organes</h3>

      <Accordion
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
          comptabilisée dans chacun de ces SOC.{' '}
          <i>
            Par exemple, un mal de tête et acné seront comptabilisés chacun une fois dans
            “Affections du système nerveux” et “Affections de la peau et du tissu sous-cutané”.
          </i>
        </p>
        <p>
          À l&apos;inverse, si tous ces effets indésirables appartiennent au même SOC, ils ne seront
          comptabilisés qu&apos;une fois dans ce SOC.
          <i>
            Par exemple, de l’acné et de l’eczéma seront comptabilisés une seule fois dans le SOC
            “Affections de la peau et du tissu sous-cutané”.
            <br />
            Ils seront en revanche bien comptabilisés 2 fois dans le détail de ce SOC.
          </i>
        </p>
        <p>
          Sont affichés ici tous les SOC, ainsi que le détail du type d&apos;effet si les effectifs
          sont supérieurs ou égaux à 11, pour le respect de la confidentialité des données.
        </p>
      </Accordion>

      {substance.sideEffects?.repartitionPerPathology && (
        <GraphBoxSelect
          title="Effets indésirables suspectés de la substance active"
          render={({ selectedUnitOption }) => {
            const repartitionPerPathology = buildSortedRangeData<RepartitionPerPathology>(
              substance.sideEffects?.repartitionPerPathology,
              selectedUnitOption
            );

            return (
              <div className="GraphBoxSelectContent">
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
        className="mt-8 mb-4"
        imageClassName="w-52"
        title="Comment déclarer un effet indésirable ?"
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
          Découvrez comment l’ANSM centralise les signalements et alertes, et que faire selon votre
          situation.
        </p>
      </CardWithImage>
    </div>
  );
};
