import type { Substance } from '../../graphql/__generated__/generated-documents';
import { BoxInfoTitle } from '../BoxInfoTitle/BoxInfoTitle';
import FolderSVG from '../../assets/icons/folder/folder.svg';
import { GraphBox } from '../GraphBox/GraphBox';
import { GraphFigure } from '../GraphFigure/GraphFigure';
import WomanFigure from '../../assets/images/woman_illustration.svg';
import ManFigure from '../../assets/images/man_illustration.svg';
import { PieChartRepartitionAge } from '../Charts/PieChartRepartitionAge';
import { Accordion } from '../Accordion/Accordion';
import { GetFigureByJob } from './componentContainer/GetFigureByJob';
import { GetFigureByPathology } from './componentContainer/GetFigureByPathology';

export const SubstanceContainer = ({ substance }: { substance: Substance }) => {
  const {
    repartitionPerAge,
    repartitionPerSex,
    repartitionPerNotifier,
    repartitionPerPathology,
    totalExposition,
  } = substance;
  const defaultNb = 'percent';

  return (
    <div className="SubstancesContainerContentTitle text-left text-xl">
      Substance active sélectionnée :{' '}
      <span className="text-secondary-900 font-medium">{substance?.name}</span>
      {totalExposition && (
        <BoxInfoTitle
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          title={`${totalExposition?.total} déclarations reçues`}
          icon={<FolderSVG />}
          theme="secondary"
          className="my-8"
        >
          Nombre de déclarations d&lsquo;effets indésirables sur la période
          {/* eslint-disable-next-line @typescript-eslint/restrict-template-expressions */}
          {` ${totalExposition?.minYear}`}-{totalExposition.maxYear}
        </BoxInfoTitle>
      )}
      <div className="flex flex-row my-8">
        <GraphBox title="Répartition par sexe des patients traités parmi les cas déclarés d'effets indésirables">
          <div className="flex justify-center items-center">
            {repartitionPerSex?.female && (
              <GraphFigure
                value={repartitionPerSex?.female}
                description="Femmes"
                valueClassName="text-secondary"
                icon={<WomanFigure width={150} height={150} />}
              />
            )}
            {repartitionPerSex?.male && (
              <GraphFigure
                value={repartitionPerSex.male}
                valueClassName="text-secondary"
                description="Hommes"
                icon={<ManFigure width={150} height={150} />}
              />
            )}
          </div>
        </GraphBox>
        <GraphBox title="Répartition par âge des patiens traités parmi les cas déclarés d'effets indésirables">
          <PieChartRepartitionAge ageData={repartitionPerAge} />
        </GraphBox>
      </div>
      <GraphBox title="Répartition par type déclarant" className="flex my-8">
        {repartitionPerNotifier
          ?.filter((notifier) => notifier)
          .map(
            (notifier) =>
              notifier && (
                <GraphFigure
                  key={notifier.id}
                  value={notifier.value}
                  description={notifier.job}
                  icon={<GetFigureByJob job={notifier.job} />}
                />
              )
          )}
      </GraphBox>
      <Accordion
        defaultOpen
        title="Comment sont calculés ces indicateurs ? D’où viennent ces données ?"
        theme="secondary"
        className="my-8"
      >
        Les effets indésirables peuvent être regroupés et classés selon l&apos;organe concerné. 27
        systèmes d&apos;organes ont été définis (Système Organe Classe ou SOC).Si une déclaration
        concerne des effets indésirables appartenant à plusieurs SOC, elle sera comptabilisée dans
        chacun de ces SOC. À l&apos;inverse, si tous ces effets indésirables appartiennent au même
        SOC, ils ne seront comptabilisés qu&apos;une fois. Sont affichés ici tous les SOC, ainsi que
        le détail du type d’effet si les effectifs sont supérieurs ou égaux à 11.
      </Accordion>
      <GraphBox
        title="Répartition des déclarations d’effets indésirables suspectés"
        className="my-8"
      >
        <div className="justify-center items-center mb-4">
          {repartitionPerPathology
            ?.filter((pathology) => pathology)
            .map(
              (pathology) =>
                pathology && (
                  <GraphFigure
                    key={pathology.id}
                    valueClassName="text-secondary"
                    value={defaultNb === 'percent' ? pathology.nbPercent : pathology.nbCases}
                    description={pathology.name}
                    icon={<GetFigureByPathology name={pathology.name} />}
                  />
                )
            )}
        </div>
      </GraphBox>
    </div>
  );
};
