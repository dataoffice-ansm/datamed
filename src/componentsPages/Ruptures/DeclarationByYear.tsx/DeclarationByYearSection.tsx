import type { HTMLAttributes } from 'react';
import { useCallback, useState } from 'react';
import { useMemo } from 'react';
import { SectionTitle } from '../../../components/SectionTitle';
import type { SelectOption } from '../../../components/Select';
import { Select } from '../../../components/Select';
import { NotEnoughData } from 'components/NotEnoughData';
import { BoxInfo } from '../../../components/BoxInfo';
import FolderSVG from '../../../assets/pictos/folder.svg';
import { BaseTooltipContent } from '../Tooltip';
import { useRupturesPageContext } from '../../../contexts/RupturesPageContext';
import { KPIBoxProgression } from '../../../components/KPIBoxProgression';

export const DeclarationByYearSection = (_props: HTMLAttributes<HTMLDivElement>) => {
  const { ruptures } = useRupturesPageContext();
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const options: SelectOption[] = useMemo(
    () =>
      ruptures?.ruptureYears
        ? ruptures?.ruptureYears.reduce<SelectOption[]>(
            (carry, ruptureYear) =>
              ruptureYear?.value
                ? [
                    ...carry,
                    {
                      value: ruptureYear?.value,
                      label: (ruptureYear?.value ?? '').toString(),
                    },
                  ]
                : carry,
            []
          )
        : [],
    [ruptures?.ruptureYears]
  );

  const onSelectedYear = useCallback((index: number) => {
    setSelectedIndex(index);
  }, []);

  const selectedData = useMemo(
    () =>
      (ruptures?.ruptureStocks ?? []).find(
        (element) => element?.year === options[selectedIndex].value
      ),
    [options, ruptures?.ruptureStocks, selectedIndex]
  );

  const percentRisk = Math.trunc(
    (Math.round(selectedData?.nbRisqueClosed ?? 0) / (selectedData?.nbRisque ?? 1)) * 100
  );

  const percentRupture = Math.trunc(
    (Math.round(selectedData?.nbRuptureClosed ?? 0) / (selectedData?.nbRupture ?? 1)) * 100
  );

  return (
    <div className="DeclarationByYear my-12">
      <SectionTitle
        title="D??clarations de ruptures et risques de rupture de stock depuis le d??but de l'ann??e civile en cours"
        subTitle={`Donn??es mises ?? jour mensuellement, issues de la p??riode ${
          selectedData?.year ?? '- ann??e non disponible'
        }`}
      >
        <Select options={options} theme="secondary-variant" onSelectOption={onSelectedYear} />
      </SectionTitle>

      {(ruptures?.ruptureYears ?? []).length > 0 ? (
        <div className="DeclarationByYearSectionContent flex flex-col gap-4">
          <BoxInfo
            title={`${selectedData?.total ?? 0} d??claration(s) re??ues(s)`}
            icon={<FolderSVG />}
            theme="dark-green"
            tooltip={
              <BaseTooltipContent>
                Les ruptures, les risques de rupture de stock ainsi que les stocks de s??curit??
                inf??rieurs au seuil d??fini par d??cret sont d??clar??s ?? l???ANSM par les entreprises
                pharmaceutiques.
              </BaseTooltipContent>
            }
          >
            Nombre de d??clarations de ruptures et risques de rupture de stock et de d??cret sans
            risque depuis le d??but de l???ann??e civile en cours
          </BoxInfo>

          <div className="flex gap-8 flex-col md:flex-row">
            <KPIBoxProgression
              title="D??clarations de ruptures depuis le d??but de l???ann??e civile en cours"
              total={selectedData?.nbRupture ?? 0}
              percentageTitle="ont ??t?? cl??tur??es ?? ce jour"
              percent={percentRupture}
              numberColor="text-teal-900"
              percentBackgroundColor="bg-teal-300"
              percentForegroundColor="bg-teal-900"
              tooltip={
                <BaseTooltipContent>
                  Une d??claration de rupture de stock est faite par l&apos;exploitant lorsque le
                  laboratoire ne dispose plus de stock ou d???un stock tr??s limit?? r??serv?? ?? une
                  distribution d???urgence.
                </BaseTooltipContent>
              }
            />
            <KPIBoxProgression
              title="D??clarations de risques de rupture depuis le d??but de l???ann??e civile en cours"
              percentageTitle="ont ??t?? cl??tur??es ?? ce jour"
              percent={percentRisk}
              total={selectedData?.nbRisque ?? 0}
              numberColor="text-green-900"
              percentBackgroundColor="bg-green-300"
              percentForegroundColor="bg-green-900"
              tooltip={
                <BaseTooltipContent>
                  Une d??claration de risque de rupture de stock est faite par l&apos;exploitant
                  lorsqu&apos;il est anticip?? que le niveau de stock ne pourra pas r??pondre
                  compl??tement aux besoins.
                </BaseTooltipContent>
              }
            />
          </div>
        </div>
      ) : (
        <div className="w-full flex justify-center items-center">
          <NotEnoughData />
        </div>
      )}
    </div>
  );
};
