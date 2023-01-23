import type { HTMLAttributes } from 'react';
import { useCallback, useState } from 'react';
import { useMemo } from 'react';
import { SectionTitle } from '../../components/SectionTitle';
import type { SelectOption } from '../../components/Select';
import { Select } from '../../components/Select';
import { NotEnoughData } from 'components/NotEnoughData';
import { BoxInfo } from '../../components/BoxInfo';
import FolderSVG from '../../assets/pictos/folder.svg';
import { useRupturesPageContext } from '../../contexts/RupturesPageContext';
import { KPIBoxProgression } from '../../components/KPIBoxProgression';
import { formatDate, numberWithThousand } from '../../utils/format';

export const DeclarationsPerYearSection = (_props: HTMLAttributes<HTMLDivElement>) => {
  const { ruptures } = useRupturesPageContext();
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const rupturesYearsOptions: SelectOption[] = useMemo(
    () =>
      ruptures?.ruptureYears
        ? ruptures.ruptureYears.reduce<SelectOption[]>(
            (carry, year) => [
              ...carry,
              {
                value: year,
                label: year,
              },
            ],
            []
          )
        : [],
    [ruptures?.ruptureYears]
  );

  const onSelectedYear = useCallback((index: number) => {
    setSelectedIndex(index);
  }, []);

  const rupturesDeclarationsForSelectedYear = useMemo(
    () =>
      (ruptures?.ruptureStocks ?? []).find(
        (element) => element?.year === rupturesYearsOptions[selectedIndex].value
      ),
    [rupturesYearsOptions, ruptures?.ruptureStocks, selectedIndex]
  );

  const percentRisk = Math.trunc(
    (Math.round(rupturesDeclarationsForSelectedYear?.nbRisqueClosed ?? 0) /
      (rupturesDeclarationsForSelectedYear?.nbRisque ?? 1)) *
      100
  );

  const percentRuptureRisk = Math.trunc(
    (Math.round(rupturesDeclarationsForSelectedYear?.nbRuptureClosed ?? 0) /
      (rupturesDeclarationsForSelectedYear?.nbRupture ?? 1)) *
      100
  );

  const sectionSubtitlePeriod =
    ruptures.config?.minYear && ruptures.config.maxYear
      ? `${formatDate(ruptures.config?.minYear)} - ${formatDate(ruptures.config.maxYear)}`
      : 'Année non disponible';

  return (
    <div className="DeclarationByYear mb-12">
      <SectionTitle
        title="Déclarations de ruptures et risques de rupture de stock depuis le début de l'année civile en cours"
        subTitle={`Données mises à jour mensuellement, issues de la période ${sectionSubtitlePeriod}`}
      >
        <Select
          options={rupturesYearsOptions}
          theme="secondary-variant"
          onSelectOption={onSelectedYear}
        />
      </SectionTitle>

      {(ruptures?.ruptureYears ?? []).length > 0 ? (
        <div className="DeclarationByYearSectionContent flex flex-col gap-4">
          <BoxInfo
            title={`${numberWithThousand(
              rupturesDeclarationsForSelectedYear?.nbDeclarations ?? 0
            )} déclarations reçues`}
            icon={<FolderSVG className="h-24 w-24" />}
            theme="dark-green"
            tooltip={
              <>
                <p className="font-medium mb-4 text-lg">
                  Historique du nombre de déclarations de ruptures et de risques de rupture de stock
                </p>
                <p>
                  Les industriels qui produisent des Médicaments d’Intérêt Thérapeutique Majeur
                  (MITM) sont tenus de signaler à l’ANSM toute rupture de stock ou risque de rupture
                  de stock. les concernant (CSP Art. R. 5124-49-1).{' '}
                </p>
                <p>
                  Depuis 2019, dans le cadre de la feuille de route ministérielle et de la loi de
                  financement de la sécurité sociale qui renforce ses pouvoirs, l&apos;ANSM demande
                  aux industriels de déclarer le plus en amont possible tout risque de rupture.
                  Cette politique d&apos;anticipation maximale a pour conséquence une augmentation
                  du nombre de déclarations reçues.
                </p>
                <p>Les déclarations de décret stock sans risque ne sont pas représentées ici.</p>
              </>
            }
          >
            Nombre de déclarations de ruptures et risques de rupture de stock depuis le début de
            l’année civile en cours
          </BoxInfo>

          <div className="flex gap-8 flex-col md:flex-row">
            <KPIBoxProgression
              key="declar-ruptures"
              title="Déclarations de ruptures depuis le début de l’année civile en cours"
              total={rupturesDeclarationsForSelectedYear?.nbRupture ?? 0}
              percentageTitle="ont été clôturées à ce jour"
              percent={percentRuptureRisk}
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
              title="Déclarations de risques de rupture depuis le début de l’année civile en cours"
              percentageTitle="ont été clôturées à ce jour"
              percent={percentRisk}
              total={rupturesDeclarationsForSelectedYear?.nbRisque ?? 0}
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
