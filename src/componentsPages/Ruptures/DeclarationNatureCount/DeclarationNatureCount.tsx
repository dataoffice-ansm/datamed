import type { HTMLAttributes } from 'react';
import { useMemo } from 'react';
import type { GlobalRupture } from 'graphql/__generated__/generated-documents';
import { ChartBox } from 'components/ChartBox';
import { SectionTitle } from 'components/SectionTitle';
import { NotEnoughData } from 'components/NotEnoughData';
import { LineChart } from 'components/Charts/LineChart/LineChart';
import tailwindPaletteConfig from '../../../../tailwind.palette.config';

export type DeclarationNatureCountProps = {
  ruptures: GlobalRupture;
} & HTMLAttributes<HTMLDivElement>;

export const DeclarationNatureCount = ({ ruptures }: DeclarationNatureCountProps) => {
  const years = useMemo(
    () =>
      (ruptures?.ruptureYears ?? [])
        .map((ruptureYear) => ruptureYear?.value?.toString() ?? '')
        .reverse(),
    [ruptures?.ruptureYears]
  );

  const datasets = useMemo(
    () => [
      {
        id: 1,
        label: 'de rupture',
        backgroundColor: tailwindPaletteConfig.teal[900],
        borderColor: tailwindPaletteConfig.teal[900],
        data: (ruptures?.repartitionPerClassication ?? [])
          .filter((element) => element?.classification === 'rupture')
          .map((element) => element?.value),
      },
      {
        id: 2,
        label: 'de risque de rupture ',
        backgroundColor: tailwindPaletteConfig.green[900],
        borderColor: tailwindPaletteConfig.green[900],
        data: (ruptures?.repartitionPerClassication ?? [])
          .filter((element) => element?.classification === 'risque')
          .map((element) => element?.value),
      },
    ],
    [ruptures?.repartitionPerClassication]
  );

  return (
    <div>
      <SectionTitle
        title="Nombre et nature des déclarations de ruptures et risques de rupture de stock"
        subTitle="Données issues de la période"
      />
      <div>
        {ruptures?.repartitionPerClassication ? (
          <ChartBox className="mt-8">
            <div className="w-full flex flex-col justify-start items-start gap-4">
              <div className="text-xl">
                Historique du nombre de déclarations de ruptures et de risques de rupture de stock
              </div>
              <LineChart
                className="flex w-full h-80 justify-center"
                labels={years}
                datasets={datasets}
                leftLegend="Nombre de déclarations"
                bottomLegend="Année"
              />
            </div>
          </ChartBox>
        ) : (
          <div className="w-full flex justify-center items-center">
            <NotEnoughData />
          </div>
        )}
      </div>
    </div>
  );
};
