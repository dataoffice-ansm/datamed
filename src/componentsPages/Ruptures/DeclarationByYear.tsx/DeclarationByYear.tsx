import type { HTMLAttributes } from 'react';
import { useCallback, useState } from 'react';
import { useMemo } from 'react';
import { ChartBox } from '../../../components/ChartBox';
import { SectionTitle } from '../../../components/SectionTitle';
import type { GlobalRupture } from 'graphql/__generated__/generated-documents';
import type { SelectOption } from '../../../components/Select/Select';
import { Select } from '../../../components/Select/Select';
import { NotEnoughData } from 'components/NotEnoughData';
import { BoxInfo } from '../../../components/BoxInfo';
import FolderSVG from '../../../assets/icons/folder/folder.svg';

export type DeclarationByYearProps = {
  ruptures: GlobalRupture;
} & HTMLAttributes<HTMLDivElement>;

export const DeclarationByYear = ({ ruptures }: DeclarationByYearProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const options = useMemo(
    () =>
      (ruptures.ruptureYears ?? []).map((ruptureYear) => ({
        value: ruptureYear?.value,
        label: ruptureYear?.value,
      })),
    [ruptures.ruptureYears]
  );

  const onSelectedYear = useCallback((index: number) => {
    setSelectedIndex(index);
  }, []);

  const selectedData = useMemo(
    () =>
      (ruptures.ruptureStocks ?? []).find(
        (element) => element?.year === options[selectedIndex].value
      ),
    [options, ruptures.ruptureStocks, selectedIndex]
  );

  const percentRisque = (
    (Math.round(selectedData?.nbRisqueClosed ?? 0) / (selectedData?.nbRisque ?? 1)) *
    100
  ).toFixed(2);
  const percentRupture = (
    (Math.round(selectedData?.nbRuptureClosed ?? 0) / (selectedData?.nbRupture ?? 1)) *
    100
  ).toFixed(2);

  if ((ruptures.ruptureYears ?? []).length > 0) {
    return (
      <>
        <SectionTitle
          title="Déclarations de ruptures et risques de rupture de stock depuis le début de l'année civile en cours"
          subTitle="Données mises à jour mensuellement, issues de la période 01/01/2022 - 01/06/2022"
        />
        {selectedData?.total}
        <ChartBox>
          <Select
            options={options as unknown as SelectOption[]}
            theme="secondary-variant"
            onSelectOption={onSelectedYear}
          />
        </ChartBox>

        <BoxInfo
          title={`${selectedData?.total ?? 0} déclaration(s) reçues(s)`}
          icon={<FolderSVG />}
          theme="dark-green"
          className="my-8"
          tooltip={
            <div>
              <strong>Déclarations cumulées</strong>
              <div>
                Travail réalisé sur une extraction de 5 ans de la BNPV, avec objectif de mise à jour
                progressive des données.
              </div>
            </div>
          }
        >
          Nombre de déclarations de ruptures et risques de rupture de stock et de décret sans risque
          depuis le début de l’année civile en cours
        </BoxInfo>

        <div>
          <div>
            <div>
              {selectedData?.nbRupture} déclarations de ruptures depuis le début de l’année civile
              en cours
            </div>
            <div>{percentRupture}% ont été clôturées à ce jour</div>
          </div>
          <div>
            <div>
              {selectedData?.nbRisque} déclarations de risques de rupture depuis le début de l’année
              civile en cours
            </div>
            <div>{percentRisque}% ont été clôturées à ce jour</div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="w-full flex justify-center items-center">
      <NotEnoughData />
    </div>
  );
};
