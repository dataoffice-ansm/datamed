import type { HTMLAttributes } from 'react';
import { useCallback, useState } from 'react';
import { useMemo } from 'react';
import { SectionTitle } from '../../components/SectionTitle';
import type { SelectOption } from '../../components/Select';
import { Select } from '../../components/Select';
import { NotEnoughData } from 'components/NotEnoughData';
import { BoxInfo } from '../../components/BoxInfo';
import FolderSVG from '../../assets/pictos/folder.svg';
import { useGlobalShortagesPageContext } from '../../contexts/GlobalShortagesContext';
import { KPIBoxProgression } from '../../components/KPIBoxProgression';
import { numberWithThousand } from '../../utils/format';

export const TotalDeclarationsPerYearSection = (_props: HTMLAttributes<HTMLDivElement>) => {
  const { period, shortagesPerYear, shortagesClassesPerYear } = useGlobalShortagesPageContext();
  const years = (shortagesPerYear?.map((e) => e.year) ?? []).reverse();
  const minYear = Math.min(...years);
  const maxYear = Math.max(...years);

  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const globalShortagesYearsOptions: SelectOption[] = useMemo(
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

  const onSelectedYear = useCallback((index: number) => {
    setSelectedIndex(index);
  }, []);

  const totalShortagesForSelectedYear = shortagesPerYear?.find(
    (e) => e.year === globalShortagesYearsOptions[selectedIndex].value
  )?.reportsCount;

  const shortagesClassRepartitionForSelectedYear = useMemo(
    () =>
      (shortagesClassesPerYear ?? []).filter(
        (element) => element?.year === globalShortagesYearsOptions[selectedIndex].value
      ),
    [shortagesClassesPerYear, globalShortagesYearsOptions, selectedIndex]
  );

  const shortagePercent = shortagesClassRepartitionForSelectedYear.find(
    (e) => e.classification === 'rupture'
  );

  const shortageRiskPercent = shortagesClassRepartitionForSelectedYear.find(
    (e) => e.classification === 'risque'
  );

  const sectionSubtitlePeriod =
    minYear && maxYear
      ? `Données mises à jour annuellement, issues de la période  ${minYear} - ${maxYear}`
      : 'Période non disponible';

  return (
    <div className="DeclarationByYear mb-12">
      <SectionTitle
        title="Déclarations de ruptures et risques de rupture de stock de l'année civile :"
        subTitle={sectionSubtitlePeriod}
      >
        <Select
          options={globalShortagesYearsOptions}
          theme="secondary-variant"
          onSelectOption={onSelectedYear}
        />
      </SectionTitle>

      {totalShortagesForSelectedYear ? (
        <div className="DeclarationByYearSectionContent flex flex-col gap-4">
          <BoxInfo
            title={`${numberWithThousand(totalShortagesForSelectedYear)} déclarations reçues`}
            icon={<FolderSVG className="h-24 w-24" />}
            theme="dark-green"
            tooltip={
              <p>
                Les ruptures, les risques de rupture de stock sont déclarés à l’ANSM par les
                entreprises pharmaceutiques.
              </p>
            }
          >
            Nombre de déclarations de ruptures et risques de rupture de stock de l’année civile
          </BoxInfo>

          <div className="flex gap-8 flex-col md:flex-row">
            <KPIBoxProgression
              key="declar-ruptures"
              title="Déclarations de ruptures de l’année civile"
              total={shortagePercent?.value ?? 0}
              percentageTitle="ont été clôturées à ce jour"
              percent={shortagePercent?.valuePercentClosed ?? 0}
              numberColor="text-teal-900"
              percentBackgroundColor="bg-teal-300"
              percentForegroundColor="bg-teal-900"
              tooltip={
                <p>
                  Une déclaration de rupture de stock est faite par l&apos;exploitant lorsque le
                  laboratoire ne dispose plus de stock ou d’un stock très limité réservé à une
                  distribution d’urgence.
                </p>
              }
            />
            <KPIBoxProgression
              key="declar-risques-ruptures"
              title="Déclarations de risques de rupture de l’année civile"
              total={shortageRiskPercent?.value ?? 0}
              percentageTitle="ont été clôturées à ce jour"
              percent={shortageRiskPercent?.valuePercentClosed ?? 0}
              numberColor="text-green-900"
              percentBackgroundColor="bg-green-300"
              percentForegroundColor="bg-green-900"
              tooltip={
                <p>
                  Une déclaration de risque de rupture de stock est faite par l&apos;exploitant
                  lorsqu&apos;il est anticipé que le niveau de stock ne pourra pas répondre
                  complètement aux besoins.
                </p>
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
