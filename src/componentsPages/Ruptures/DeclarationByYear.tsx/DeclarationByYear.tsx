import type { HTMLAttributes, ReactNode } from 'react';
import { useCallback, useState } from 'react';
import { useMemo } from 'react';
import { SectionTitle } from '../../../components/SectionTitle';
import type { GlobalRupture } from 'graphql/__generated__/generated-documents';
import type { SelectOption } from '../../../components/Select/Select';
import { Select } from '../../../components/Select/Select';
import { NotEnoughData } from 'components/NotEnoughData';
import { BoxInfo } from '../../../components/BoxInfo';
import FolderSVG from '../../../assets/icons/folder/folder.svg';
import classNames from 'classnames';
import { BaseTooltipContent, ContainerWithTooltip } from '../Tooltip';

type PercentageBoxProps = {
  percent: number;
  total: number;
  numberColor: string;
  percentBackgroundColor: string;
  percentForegroundColor: string;
  title: string;
  subtitle: string;
  tooltip: JSX.Element | ReactNode;
} & HTMLAttributes<HTMLElement>;

const PercentageBox = ({
  percent,
  numberColor,
  percentBackgroundColor,
  percentForegroundColor,
  subtitle,
  title,
  tooltip,
  total,
}: PercentageBoxProps) => (
  <div className="flex-1 shadow rounded-lg bg-white p-4 flex flex-col gap-4">
    <ContainerWithTooltip tooltip={tooltip}>
      <div className={classNames('font-medium text-2xl md:text-3xl', numberColor)}>
        {total?.toLocaleString()}
      </div>
      <div>{title}</div>
    </ContainerWithTooltip>
    <div>
      <div className={classNames('font-medium text-2xl md:text-3xl', numberColor)}>
        {percent.toLocaleString()} %
      </div>
      <div>{subtitle}</div>
    </div>
    <div>
      <div className={classNames('h-8 w-full relative border', percentBackgroundColor)}>
        <div
          className={classNames('absolute top-0 left-0 bottom-0', percentForegroundColor, {
            'border-r': percent < 100,
          })}
          style={{
            width: `${percent}%`,
          }}
        />
      </div>
    </div>
  </div>
);

export type DeclarationByYearProps = {
  ruptures: GlobalRupture;
} & HTMLAttributes<HTMLDivElement>;

export const DeclarationByYear = ({ ruptures }: DeclarationByYearProps) => {
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
      (ruptures?.ruptureStocks ?? []).find(
        (element) => element?.year === options[selectedIndex].value
      ),
    [options, ruptures?.ruptureStocks, selectedIndex]
  );

  const percentRisque = Math.trunc(
    (Math.round(selectedData?.nbRisqueClosed ?? 0) / (selectedData?.nbRisque ?? 1)) * 100
  );
  const percentRupture = Math.trunc(
    (Math.round(selectedData?.nbRuptureClosed ?? 0) / (selectedData?.nbRupture ?? 1)) * 100
  );

  return (
    <div>
      <SectionTitle
        title="Déclarations de ruptures et risques de rupture de stock depuis le début de l'année civile en cours"
        subTitle={`Données mises à jour mensuellement, issues de la période ${
          selectedData?.year ?? '- année non disponible'
        }`}
      >
        <Select
          options={options as unknown as SelectOption[]}
          theme="secondary-variant"
          onSelectOption={onSelectedYear}
        />
      </SectionTitle>
      {(ruptures?.ruptureYears ?? []).length > 0 ? (
        <>
          <BoxInfo
            title={`${(selectedData?.total ?? 0).toLocaleString()} déclaration(s) reçues(s)`}
            icon={<FolderSVG />}
            theme="dark-green"
            className="my-8"
            tooltip={
              <BaseTooltipContent>
                Les ruptures, les risques de rupture de stock ainsi que les stocks de sécurité
                inférieurs au seuil défini par décret sont déclarés à l’ANSM par les entreprises
                pharmaceutiques.
              </BaseTooltipContent>
            }
          >
            Nombre de déclarations de ruptures et risques de rupture de stock et de décret sans
            risque depuis le début de l’année civile en cours
          </BoxInfo>

          <div className="flex gap-8 flex-col md:flex-row">
            <PercentageBox
              title="Déclarations de ruptures depuis le début de l’année civile en cours"
              subtitle="ont été clôturées à ce jour"
              percent={percentRupture}
              total={selectedData?.nbRupture ?? 0}
              numberColor="text-teal-900"
              percentBackgroundColor="bg-teal-300"
              percentForegroundColor="bg-teal-900"
              tooltip={
                <BaseTooltipContent>
                  Une déclaration de rupture de stock est faite par l&apos;exploitant lorsque le
                  laboratoire ne dispose plus de stock ou d’un stock très limité réservé à une
                  distribution d’urgence.
                </BaseTooltipContent>
              }
            />
            <PercentageBox
              title="Déclarations de risques de rupture depuis le début de l’année civile en cours"
              subtitle="ont été clôturées à ce jour"
              percent={percentRisque}
              total={selectedData?.nbRisque ?? 0}
              numberColor="text-green-900"
              percentBackgroundColor="bg-green-300"
              percentForegroundColor="bg-green-900"
              tooltip={
                <BaseTooltipContent>
                  Une déclaration de risque de rupture de stock est faite par l&apos;exploitant
                  lorsqu&apos;il est anticipé que le niveau de stock ne pourra pas répondre
                  complètement aux besoins.
                </BaseTooltipContent>
              }
            />
          </div>
        </>
      ) : (
        <div className="w-full flex justify-center items-center">
          <NotEnoughData />
        </div>
      )}
    </div>
  );
};
