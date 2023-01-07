import type { HTMLAttributes } from 'react';
import { useCallback, useMemo, useState } from 'react';
import type { SelectOption } from '../../../components/Select/Select';
import { Select } from '../../../components/Select/Select';
import { NotEnoughData } from 'components/NotEnoughData';
import { SectionTitle } from '../../../components/SectionTitle';
import { GraphFiguresGrid } from '../../../components/GraphFiguresGrid';
import { GraphFigure } from '../../../components/GraphFigure';
import { getRuptureCauseIcon } from '../../../utils/iconsMapping';
import { GraphBox } from '../../../components/GraphBox/GraphBox';
import { useRupturesPageContext } from '../../../contexts/RupturesPageContext';

type DeclarationCauseByYearProps = {
  defaultOption?: OptionsValue;
} & HTMLAttributes<HTMLDivElement>;

const unitOptions = {
  percent: { label: 'Pourcentage' },
  number: { label: 'Nombre' },
} as const;

type OptionsValue = keyof typeof unitOptions;

const selectUnitOptions: Array<SelectOption<OptionsValue>> = Object.entries(unitOptions).map(
  ([k, v]) => ({
    value: k as OptionsValue,
    ...v,
  })
);

const findOptionIndex = (selectedOption: OptionsValue) =>
  (Object.keys(unitOptions) as OptionsValue[]).findIndex((option) => option === selectedOption);

export const DeclarationCauseByYear = ({
  defaultOption = 'number',
}: DeclarationCauseByYearProps) => {
  const { ruptures } = useRupturesPageContext();
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [selectedUnitOption, setSelectedUnitOption] = useState<OptionsValue>(defaultOption);
  const { repartitionPerCause, ruptureYears } = ruptures;

  const onUnitOptionChange = useCallback((optionKey: OptionsValue) => {
    setSelectedUnitOption(optionKey);
  }, []);

  const options = useMemo(
    () =>
      (ruptureYears ?? []).map((ruptureYear) => ({
        value: ruptureYear?.value,
        label: ruptureYear?.value,
      })),
    [ruptureYears]
  );

  const onSelectedYear = useCallback((index: number) => {
    setSelectedIndex(index);
  }, []);

  const selectedCauseData = useMemo(
    () =>
      (repartitionPerCause ?? []).find((action) => action?.year === options[selectedIndex].value),
    [options, repartitionPerCause, selectedIndex]
  );

  return (
    <div>
      {(ruptureYears ?? []).length > 0 ? (
        <>
          <SectionTitle title="Causes des signalements de ruptures et risques de rupture de stock">
            <div className="flex gap-2">
              <Select
                theme="secondary-variant"
                defaultOptionIndex={findOptionIndex(defaultOption)}
                options={selectUnitOptions}
                className=""
                onSelectOption={(index, option) => {
                  onUnitOptionChange(option.value as OptionsValue);
                }}
              />
              <Select
                options={options as unknown as SelectOption[]}
                theme="secondary-variant"
                onSelectOption={onSelectedYear}
              />
            </div>
          </SectionTitle>
          <GraphBox
            title="Répartition des mesures prises pour pallier ou prévenir les ruptures de stock"
            className="max-w-full"
          >
            <div className="GraphBoxSelectContent">
              <GraphFiguresGrid
                data={
                  (selectedCauseData?.causes ?? []).filter(
                    (cause) => cause?.range && cause?.value
                  ) ?? []
                }
                renderItem={(cause) =>
                  cause?.range && cause?.value ? (
                    <GraphFigure
                      className="pathologyGraphFigure"
                      unit={selectedUnitOption === 'number' ? '' : '%'}
                      description={cause.range}
                      icon={getRuptureCauseIcon(cause.range)}
                      valueClassName="text-dark-green-900"
                      value={
                        selectedUnitOption === 'number'
                          ? cause.value
                          : Math.trunc(Math.round(cause.value) * 100) /
                            (selectedCauseData?.total ?? 1)
                      }
                    />
                  ) : null
                }
              />
            </div>
          </GraphBox>
        </>
      ) : (
        <div className="w-full flex justify-center items-center">
          <NotEnoughData />
        </div>
      )}
    </div>
  );
};
