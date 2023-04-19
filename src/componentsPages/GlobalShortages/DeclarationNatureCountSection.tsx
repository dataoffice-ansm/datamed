import { useMemo } from 'react';
import { NotEnoughData } from 'components/NotEnoughData';
import { LineChart } from 'components/Charts/LineChart';
import tailwindPaletteConfig from '../../../tailwind.palette.config';
import { useGlobalShortagesPageContext } from '../../contexts/GlobalShortagesContext';
import { SectionTitle } from '../../components/SectionTitle';
import { GraphBox } from '../../components/GraphBox/GraphBox';

const DeclarationsNatureHistoryLineChart = () => {
  const { shortagesPerYear, shortagesClassesPerYear } = useGlobalShortagesPageContext();
  const years = (shortagesPerYear?.map((e) => e.year) ?? []).reverse();

  const datasets = useMemo(
    () => [
      {
        id: 1,
        label: 'Ruptures',
        backgroundColor: tailwindPaletteConfig.teal[900],
        borderColor: tailwindPaletteConfig.teal[900],
        data: (shortagesClassesPerYear ?? [])
          .filter((element) => element?.classification === 'rupture')
          .map((element) => element?.value),
      },
      {
        id: 2,
        label: 'Risques de rupture de stock',
        backgroundColor: tailwindPaletteConfig.green[900],
        borderColor: tailwindPaletteConfig.green[900],
        data: (shortagesClassesPerYear ?? [])
          .filter((element) => element?.classification === 'risque')
          .map((element) => element?.value),
      },
    ],
    [shortagesClassesPerYear]
  );

  if (shortagesClassesPerYear) {
    return (
      <GraphBox
        title="Historique du nombre de déclarations de ruptures de stock et de risques de rupture de stock"
        className="DeclarationNatureCountContent"
        tooltip={
          <>
            <p className="font-medium text-xl">
              Historique du nombre de déclarations de ruptures de stock et de risques de rupture de
              stock
            </p>
            <p>
              Les titulaires d&apos;autorisation de mise sur le marché et les entreprises
              pharmaceutiques exploitant un médicament d&apos;intérêt thérapeutique majeur (MITM)
              informent dès qu&apos;ils en ont connaissance l&apos;ANSM de tout risque de rupture de
              stock ou de toute rupture de stock relatif à ce médicament (article L. 5121-32 du code
              de la santé publique).
            </p>
          </>
        }
      >
        <LineChart
          labels={years.map((y) => String(y))}
          datasets={datasets}
          leftLegend="Nombre de déclarations"
          bottomLegend="Année"
        />
      </GraphBox>
    );
  }

  return (
    <div className="w-full flex justify-center items-center">
      <NotEnoughData />
    </div>
  );
};

/**
 *
 * @constructor
 */
export const DeclarationNatureCountSection = () => {
  const { period, shortagesPerYear } = useGlobalShortagesPageContext();
  const years = (shortagesPerYear?.map((e) => e.year) ?? []).reverse();
  const minYear = Math.min(...years);
  const maxYear = Math.max(...years);

  const periodString =
    minYear && maxYear
      ? `Données issues de la période ${minYear} - ${maxYear}`
      : 'Aucune période courant disponible';

  return (
    <div className="DeclarationNatureCount mb-12">
      <SectionTitle
        title="Nombre et nature des déclarations de ruptures de stock et risques de rupture de stock"
        subTitle={periodString}
      />

      <DeclarationsNatureHistoryLineChart />
    </div>
  );
};
