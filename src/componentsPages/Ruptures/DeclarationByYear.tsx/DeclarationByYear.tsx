import type { HTMLAttributes } from 'react';
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

  const percentRisque =
    (Math.round(selectedData?.nbRisqueClosed ?? 0) / (selectedData?.nbRisque ?? 1)) * 100;
  const percentRupture =
    (Math.round(selectedData?.nbRuptureClosed ?? 0) / (selectedData?.nbRupture ?? 1)) * 100;

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
            title={`${selectedData?.total ?? 0} déclaration(s) reçues(s)`}
            icon={<FolderSVG />}
            theme="dark-green"
            className="my-8"
            tooltip={
              <div>
                <div className="font-medium">Déclarations cumulées</div>
                <div>
                  Travail réalisé sur une extraction de 5 ans de la BNPV, avec objectif de mise à
                  jour progressive des données.
                </div>
              </div>
            }
          >
            Nombre de déclarations de ruptures et risques de rupture de stock et de décret sans
            risque depuis le début de l’année civile en cours
          </BoxInfo>

          <div className="flex gap-8 flex-col md:flex-row">
            <div className="flex-1 shadow rounded-lg bg-white p-4 flex flex-col gap-4">
              <div>
                <div className="text-teal-900 font-medium text-2xl md:text-3xl">
                  {selectedData?.nbRupture}
                </div>
                <div>Déclarations de ruptures depuis le début de l’année civile en cours</div>
              </div>
              <div>
                <div className="text-teal-900 font-medium text-2xl md:text-3xl">
                  {percentRupture.toFixed(2)}%
                </div>
                <div>ont été clôturées à ce jour</div>
              </div>
              <div>
                <div className="h-8 w-full relative bg-teal-300 border">
                  <div
                    className={classNames('absolute top-0 left-0 bottom-0 bg-teal-900', {
                      'border-r': percentRupture < 100,
                    })}
                    style={{
                      width: `${percentRupture}%`,
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="flex-1 shadow rounded-lg bg-white p-4 flex flex-col gap-4">
              <div>
                <div className="text-green-900 font-medium text-2xl md:text-3xl">
                  {selectedData?.nbRisque}
                </div>
                <div>
                  Déclarations de risques de rupture depuis le début de l’année civile en cours
                </div>
              </div>
              <div>
                <div className="text-green-900 font-medium text-2xl md:text-3xl">
                  {percentRisque.toFixed(2)}%
                </div>
                <div>ont été clôturées à ce jour</div>
              </div>
              <div>
                <div className="h-8 w-full relative bg-green-300 border">
                  <div
                    className={classNames('absolute top-0 left-0 bottom-0 bg-green-900', {
                      'border-r': percentRisque < 100,
                    })}
                    style={{
                      width: `${percentRisque}%`,
                    }}
                  />
                </div>
              </div>
            </div>
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
