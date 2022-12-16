/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { HTMLAttributes } from 'react';
import { useCallback, useState } from 'react';
import { useMemo } from 'react';
import type { GlobalRupture } from 'graphql/__generated__/generated-documents';
import { ChartBox } from 'components/ChartBox';
import { BaseTooltipContent, ContainerWithTooltip } from '../Tooltip';
import tailwindPaletteConfig from '../../../../tailwind.palette.config';
import type { SelectOption } from 'components/Select/Select';
import { Select } from 'components/Select/Select';
import { BarChart } from '../../../components/Charts/BarChart/BarChart';

export type RepartitionPerClassTherapeutiqueProps = {
  ruptures: GlobalRupture;
} & HTMLAttributes<HTMLDivElement>;

export const RepartitionPerClassTherapeutique = ({
  ruptures,
}: RepartitionPerClassTherapeutiqueProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const options = useMemo(
    () =>
      (ruptures?.ruptureYears ?? []).map((ruptureYear) => ({
        value: ruptureYear?.value,
        label: ruptureYear?.value,
      })),
    [ruptures?.ruptureYears]
  );

  const onSelectedYear = useCallback((index: number) => {
    setSelectedIndex(index);
  }, []);

  const selectedData = useMemo(
    () =>
      (ruptures?.repartitionPerClassTherapeutique ?? []).find(
        (element) => element?.year === options[selectedIndex].value
      ),
    [options, ruptures?.repartitionPerClassTherapeutique, selectedIndex]
  );

  const labels = useMemo(
    () => (selectedData?.repartitions ?? []).map((element) => element?.name),
    [selectedData?.repartitions]
  );

  const datasets = useMemo(
    () => [
      {
        id: 1,
        label: 'Nombre de signalements',
        backgroundColor: tailwindPaletteConfig.darkGreen[300],
        borderColor: tailwindPaletteConfig.darkGreen[300],
        data: (selectedData?.repartitions ?? []).map((element) => element?.value),
      },
    ],
    [selectedData?.repartitions]
  );

  return (
    <ChartBox className="w-full">
      <div className="w-full flex flex-col justify-start items-start">
        <ContainerWithTooltip
          suffix={
            <Select
              options={options as unknown as SelectOption[]}
              theme="secondary-variant"
              onSelectOption={onSelectedYear}
            />
          }
          tooltip={
            <BaseTooltipContent>
              <div className="text-left flex flex-col gap-4">
                <div className="font-medium text-xl">
                  Nombre de déclarations de ruptures ou de risques de rupture de stock par classe
                  thérapeutique
                </div>
                <div>
                  Le Système de classification anatomique, thérapeutique et chimique (en anglais :
                  Anatomical Therapeutic Chemical (ATC) Classification System) est utilisé pour
                  classer les médicaments. C&apos;est le Collaborating Centre for Drug Statistics
                  Methodology de l&apos;Organisation Mondiale de la Santé (OMS) qui le contrôle. Les
                  médicaments sont divisés en groupes selon l&apos;organe ou le système sur lequel
                  ils agissent ou leurs caractéristiques thérapeutiques et chimiques.
                </div>
                <div>
                  Ce graphique représente le nombre de déclarations reçues par classe thérapeutique
                  (classification ATC). La courbe bleue indique le nombre de présentations de
                  médicaments (une présentation correspond à un conditionnement précis d&apos;un
                  médicament, par exemple une boîte de 30 gélules et une boîte de 90 gélules
                  d&apos;un même médicament sont deux présentations différentes) que contient la
                  classe. Dans sa globalité, ce graphique permet d&apos;apprécier le nombre de
                  déclarations reçues par rapport au nombre de médicaments disponibles.
                </div>
              </div>
            </BaseTooltipContent>
          }
        >
          <div className="text-xl text-left">
            Nombre de déclarations de ruptures et risques de rupture de stock par classe
            thérapeutique
          </div>
        </ContainerWithTooltip>

        <div className="min-h-[256px] md:min-h-[512px] lg:min-h-[600px] w-full relative">
          <BarChart
            className="flex justify-center mt-4 w-full h-full absolute"
            labels={labels as unknown as never}
            datasets={datasets}
            leftLegend="Nombre de signalements"
            bottomLegend="Classe thérapeutique"
          />
        </div>
      </div>
    </ChartBox>
  );
};
