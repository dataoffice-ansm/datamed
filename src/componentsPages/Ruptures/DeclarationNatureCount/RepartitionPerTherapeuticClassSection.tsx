import type { HTMLAttributes } from 'react';
import { useCallback, useState } from 'react';
import { useMemo } from 'react';
import { ChartBox } from 'components/ChartBox';
import { BaseTooltipContent, ContainerWithTooltip } from '../Tooltip';
import tailwindPaletteConfig from '../../../../tailwind.palette.config';
import type { SelectOption } from 'components/Select';
import { Select } from 'components/Select';
import { BarChart } from '../../../components/Charts/BarChart';
import { useRupturesPageContext } from '../../../contexts/RupturesPageContext';
import { buildSortedRangeData } from '../../../utils/entities';
import { type TherapeuticClassRupture } from '../../../graphql/__generated__/generated-documents';

export const RepartitionPerTherapeuticClassSection = (_props: HTMLAttributes<HTMLDivElement>) => {
  const { ruptures } = useRupturesPageContext();
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const options: SelectOption[] = useMemo(
    () =>
      ruptures?.ruptureYears
        ? ruptures.ruptureYears.reduce<SelectOption[]>(
            (carry, ruptureYear) =>
              ruptureYear?.value
                ? [
                    ...carry,
                    {
                      value: ruptureYear.value,
                      label: ruptureYear.value.toString(),
                    },
                  ]
                : carry,
            []
          )
        : [],
    [ruptures?.ruptureYears]
  );

  const therapeuticDataForSelectedYear = useMemo(() => {
    if (ruptures?.repartitionPerTherapeuticClass) {
      return ruptures.repartitionPerTherapeuticClass.find(
        (element) => element?.year === options[selectedIndex].value
      );
    }
  }, [options, ruptures?.repartitionPerTherapeuticClass, selectedIndex]);

  const therapeuticRepartitionForSelectedYear = useMemo(
    () =>
      buildSortedRangeData<TherapeuticClassRupture>(
        therapeuticDataForSelectedYear?.repartition,
        'number'
      ),
    [therapeuticDataForSelectedYear?.repartition]
  );

  const labels = useMemo(
    () => therapeuticRepartitionForSelectedYear.map((e) => e.name),
    [therapeuticRepartitionForSelectedYear]
  );

  const datasets = useMemo(
    () => [
      {
        id: 1,
        label: 'Nombre de signalements',
        backgroundColor: tailwindPaletteConfig.darkGreen[300],
        borderColor: tailwindPaletteConfig.darkGreen[300],
        data: therapeuticRepartitionForSelectedYear?.map((element) => element?.value),
      },
    ],
    [therapeuticRepartitionForSelectedYear]
  );

  const onSelectedYear = useCallback((index: number) => {
    setSelectedIndex(index);
  }, []);

  return (
    <div className="RepartitionPerTherapeuticClass my-12">
      <ChartBox className="w-full">
        <div className="w-full flex flex-col justify-start items-start">
          <ContainerWithTooltip
            suffix={
              <Select options={options} theme="secondary-variant" onSelectOption={onSelectedYear} />
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
                    Methodology de l&apos;Organisation Mondiale de la Santé (OMS) qui le contrôle.
                    Les médicaments sont divisés en groupes selon l&apos;organe ou le système sur
                    lequel ils agissent ou leurs caractéristiques thérapeutiques et chimiques.
                  </div>
                  <div>
                    Ce graphique représente le nombre de déclarations reçues par classe
                    thérapeutique (classification ATC). La courbe bleue indique le nombre de
                    présentations de médicaments (une présentation correspond à un conditionnement
                    précis d&apos;un médicament, par exemple une boîte de 30 gélules et une boîte de
                    90 gélules d&apos;un même médicament sont deux présentations différentes) que
                    contient la classe. Dans sa globalité, ce graphique permet d&apos;apprécier le
                    nombre de déclarations reçues par rapport au nombre de médicaments disponibles.
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
    </div>
  );
};
