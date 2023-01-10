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
import { PieChartRepartitionAge } from '../../components/Charts/PieChartRepartitionAge';
import { Accordion } from '../../components/Accordion/Accordion';
import type { HTMLAttributes } from 'react';
import { useMemo } from 'react';
import { useState } from 'react';
import { NotEnoughData } from '../../components/NotEnoughData';
import { getSideEffectPathologyIcon, getNotifierIcon } from '../../utils/iconsMapping';
import { Button } from '../../components/Button/Button';
import { Modal } from '../../components/Modal/Modal';
import { GraphBoxSelect } from '../../components/GraphBoxSelect';
import { GraphFiguresGrid } from '../../components/GraphFiguresGrid';
import { type RepartitionPerNotifier } from '../../graphql/__generated__/generated-documents';
import { CardWithImage } from '../../components/CardWithImage/CardWithImage';
import SickPersonSvg from '../../assets/pictos/sick_transparent_person.svg';
import { buildSortedData } from '../../utils/entities';

/**
 *
 * @param pathology
 * @constructor
 */
const PathologyOrgansRepartitionModal = ({ pathology }: { pathology: RepartitionPerPathology }) => {
  const [openModal, setOpenModal] = useState(false);

  const htlEffects = useMemo(
    () => buildSortedData<HltEffect>(pathology.htlEffects, 'number'),
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
}: { substance: Substance } & HTMLAttributes<HTMLElement>) => (
  <div className="SubstanceContainerContentTitle text-left">
    <BoxInfo
      title={`${substance.totalExposition?.total ?? 'Aucune'} déclaration(s) reçue(s)`}
      icon={<FolderSVG />}
      theme="secondary"
      className="my-8"
    >
      Nombre cumulé de déclarations d&lsquo;effets indésirables suspectés{' '}
      {substance.totalExposition?.minYear &&
        substance.totalExposition?.maxYear &&
        `sur la période ${substance.totalExposition?.minYear} ${substance.totalExposition?.maxYear}`}
    </BoxInfo>

    <div className="flex flex-shrink flex-col md:flex-row gap-8 mb-8 m-auto">
      <div className="flex-1 flex-shrink">
        {}
        <GraphBox
          title="Répartition par sexe des patients traités parmi les cas déclarés d'effets indésirables"
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
          title="Répartition par âge des patiens traités parmi les cas déclarés d'effets indésirables"
          className="h-full max-w-[100%]"
        >
          <PieChartRepartitionAge
            theme="secondary"
            className="h-64 w-full flex justify-center items-center"
            ageData={substance.sideEffects?.repartitionPerAge}
          />
        </GraphBox>
      </div>
    </div>

    {substance.sideEffects?.repartitionPerNotifier && (
      <GraphBoxSelect
        title="Répartition par type de déclarants"
        theme="secondary"
        className="max-w-full my-8"
        render={(selectedOption) => {
          const repartitionPerNotifier = buildSortedData<RepartitionPerNotifier>(
            substance.sideEffects?.repartitionPerNotifier,
            selectedOption
          );
          return (
            <GraphFiguresGrid
              data={repartitionPerNotifier}
              renderItem={(notifier) =>
                notifier?.id && notifier.job ? (
                  <GraphFigure
                    key={notifier.id}
                    className="NotifierRepartition"
                    unit={selectedOption === 'percent' ? ' % ' : ''}
                    label={notifier.job}
                    valueClassName="text-secondary my-2"
                    icon={getNotifierIcon(notifier.id)}
                    value={
                      (selectedOption === 'percent' ? notifier.valuePercent : notifier.value) ?? 0
                    }
                  />
                ) : null
              }
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
        Une déclaration peut contenir plusieurs effets indésirables d’un même patient. Ces effets
        peuvent être catégorisés dans plusieurs SOC, ils seront donc comptabilités dans chacun de
        ces SOC. À l&apos;inverse, si tous ces effets indésirables appartiennent au même SOC, ils ne
        seront comptabilisés qu&apos;une fois dans ce SOC.
      </p>
      <p>
        Sont affichés ici tous les SOC, ainsi que le détail du type d’effet si les effectifs sont
        supérieurs ou égaux à 11.
      </p>
    </Accordion>

    {substance.sideEffects?.repartitionPerPathology && (
      <GraphBoxSelect
        title="Effets indésirables suspectés de la substance active"
        render={(selectedOption) => {
          const repartitionPerPathology = buildSortedData<RepartitionPerPathology>(
            substance.sideEffects?.repartitionPerPathology,
            selectedOption
          );
          return (
            <div className="GraphBoxSelectContent">
              {repartitionPerPathology.length !== 0 && (
                <div className="font-medium text-lg md:text-xl lg:text-2xl mt-2 mb-6 px-4">
                  Parmi les{' '}
                  <span className="text-secondary font-medium">
                    {substance.totalExposition?.total}
                  </span>{' '}
                  déclarations d’effets indésirables pour :{' '}
                  <span className="text-secondary font-medium">{substance.name}</span>
                </div>
              )}

              <GraphFiguresGrid
                data={repartitionPerPathology}
                renderItem={(pathologyRepartition) => (
                  <GraphFigure
                    className="PathologyRepartition"
                    unit={selectedOption === 'percent' ? ' % ' : ''}
                    label={pathologyRepartition.range}
                    icon={getSideEffectPathologyIcon(pathologyRepartition.id)}
                    action={<PathologyOrgansRepartitionModal pathology={pathologyRepartition} />}
                    valueClassName="text-secondary-900"
                    value={
                      selectedOption === 'percent'
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
