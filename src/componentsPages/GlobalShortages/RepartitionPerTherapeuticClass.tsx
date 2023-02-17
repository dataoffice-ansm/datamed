import type { HTMLAttributes } from 'react';
import React, { useMemo } from 'react';
import tailwindPaletteConfig from '../../../tailwind.palette.config';
import type { SelectOption } from 'components/Select';
import { useGlobalShortagesPageContext } from '../../contexts/GlobalShortagesContext';
import { GraphBoxSelect } from '../../components/GraphBoxSelect';
import { BarChart } from '../../components/Charts/BarChart';
import { type ChartDataset } from 'chart.js';

export const RepartitionPerTherapeuticClass = (_props: HTMLAttributes<HTMLDivElement>) => {
  const { shortagesPerYear, shortagesAtcPerYear } = useGlobalShortagesPageContext();

  const rupturesYearsOptions: SelectOption[] = useMemo(
    () =>
      shortagesPerYear
        ? shortagesPerYear.reduce<SelectOption[]>(
            (carry, row) => [
              ...carry,
              {
                value: row.year,
                label: String(row.year),
              },
            ],
            []
          )
        : [],
    [shortagesPerYear]
  );

  return (
    <div className="RepartitionPerTherapeuticClass my-8">
      <GraphBoxSelect
        disableUnitSelect
        className="RepartitionPerTherapeuticClass"
        theme="secondary-variant"
        title="Nombre de déclarations de ruptures et risques de rupture de stock par classe thérapeutique"
        yearsOptions={rupturesYearsOptions}
        tooltip={
          <>
            <p className="font-medium text-xl">
              Nombre de déclarations de ruptures ou de risques de rupture de stock par classe
              thérapeutique
            </p>
            <p>
              Le Système de classification anatomique, thérapeutique et chimique (en anglais :
              Anatomical Therapeutic Chemical (ATC) Classification System) est utilisé pour classer
              les médicaments. C&apos;est le Collaborating Centre for Drug Statistics Methodology de
              l&apos;Organisation Mondiale de la Santé (OMS) qui le contrôle. Les médicaments sont
              divisés en groupes selon l&apos;organe ou le système sur lequel ils agissent ou leurs
              caractéristiques thérapeutiques et chimiques.
            </p>
            <p>
              Ce graphique représente le nombre de déclarations reçues par classe thérapeutique
              (classification ATC). La courbe bleue indique le nombre de présentations de
              médicaments (une présentation correspond à un conditionnement précis d&apos;un
              médicament, par exemple une boîte de 30 gélules et une boîte de 90 gélules d&apos;un
              même médicament sont deux présentations différentes) que contient la classe. Dans sa
              globalité, ce graphique permet d&apos;apprécier le nombre de déclarations reçues par
              rapport au nombre de médicaments disponibles.
            </p>
          </>
        }
        render={({ selectedYearOption }) => {
          const shortagesTypeRepForSelectedYear =
            shortagesAtcPerYear && selectedYearOption
              ? shortagesAtcPerYear.filter((element) => element?.year === selectedYearOption)
              : [];

          const therapeuticRepartitionForSelectedYear = shortagesTypeRepForSelectedYear
            ? shortagesTypeRepForSelectedYear
                .sort((a, b) => (a.label && b.label ? a.label.localeCompare(b.label) : 1))
                .reverse()
            : [];

          const labels = therapeuticRepartitionForSelectedYear
            .map((e) => e?.label ?? null)
            //
            .filter(Boolean) as string[];

          const datasetBar: ChartDataset<'bar'> = {
            label: 'Nombre de signalements',
            backgroundColor: tailwindPaletteConfig.darkGreen[400],
            borderColor: tailwindPaletteConfig.darkGreen[400],
            data: therapeuticRepartitionForSelectedYear?.map((e) => e?.reportsCount ?? 0),
          };

          const datasetBubble: ChartDataset<'bar'> = {
            label: 'Nombre de médicaments',
            backgroundColor: tailwindPaletteConfig.blue[400],
            borderColor: tailwindPaletteConfig.blue[400],
            data: therapeuticRepartitionForSelectedYear?.map((e) => e?.medicsCount ?? 0),
          };

          return (
            <div className="w-full relative w-full">
              <BarChart
                className="my-8"
                labels={labels}
                dataset={datasetBar}
                leftLegend="Nombre de signalements"
                bottomLegend="Classe thérapeutique"
              />

              <BarChart
                className="my-8"
                labels={labels}
                dataset={datasetBubble}
                leftLegend="Nombre de médicaments"
                bottomLegend="Classe thérapeutique"
              />
            </div>
          );
        }}
      />
    </div>
  );
};
