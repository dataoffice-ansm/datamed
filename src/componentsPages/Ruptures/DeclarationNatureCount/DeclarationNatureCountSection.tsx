import type { HTMLAttributes } from 'react';
import { useMemo } from 'react';
import { ChartBox } from 'components/ChartBox';
import { NotEnoughData } from 'components/NotEnoughData';
import { LineChart } from 'components/Charts/LineChart';
import tailwindPaletteConfig from '../../../../tailwind.palette.config';
import { BaseTooltipContent, ContainerWithTooltip } from '../Tooltip';
import { useRupturesPageContext } from '../../../contexts/RupturesPageContext';
import { SectionTitle } from '../../../components/SectionTitle';
import { DeclarationCauseByYearSection } from '../DeclarationCauseByYear/DeclarationCauseByYearSection';

/**
 *
 * @param periodString
 * @constructor
 */
export const DeclarationNatureCountSection = ({
  periodString,
}: { periodString: string } & HTMLAttributes<HTMLDivElement>) => {
  const { ruptures } = useRupturesPageContext();

  const years = useMemo(
    () =>
      (ruptures?.ruptureYears ?? [])
        .map((ruptureYear) => ruptureYear?.value?.toString() ?? '')
        .reverse(),
    [ruptures?.ruptureYears]
  );

  const datasets = useMemo(
    () => [
      {
        id: 1,
        label: 'Ruptures',
        backgroundColor: tailwindPaletteConfig.teal[900],
        borderColor: tailwindPaletteConfig.teal[900],
        data: (ruptures?.repartitionPerClassification ?? [])
          .filter((element) => element?.classification === 'rupture')
          .map((element) => element?.value),
      },
      {
        id: 2,
        label: 'Risques de ruptures',
        backgroundColor: tailwindPaletteConfig.green[900],
        borderColor: tailwindPaletteConfig.green[900],
        data: (ruptures?.repartitionPerClassification ?? [])
          .filter((element) => element?.classification === 'risque')
          .map((element) => element?.value),
      },
    ],
    [ruptures?.repartitionPerClassification]
  );

  return (
    <div className="DeclarationNatureCount my-12">
      <SectionTitle
        title="Nombre et nature des déclarations de ruptures et risques de rupture de stock"
        subTitle={periodString}
      />

      {ruptures?.repartitionPerClassification ? (
        <div className="DeclarationNatureCountContent flex flex-col gap-8">
          <ChartBox className="w-full">
            <div className="w-full flex flex-col justify-start items-start gap-4">
              <ContainerWithTooltip
                tooltip={
                  <BaseTooltipContent>
                    <div className="text-left flex flex-col gap-4">
                      <div className="font-medium text-xl">
                        Historique du nombre de déclarations de ruptures et de risques de rupture de
                        stock
                      </div>
                      <div>
                        Les industriels qui produisent des Médicaments d’Intérêt Thérapeutique
                        Majeur (MITM) sont tenus de signaler à l’ANSM toute rupture de stock ou
                        risque de rupture de stock les concernant (CSP Art. R. 5124-49-1).
                      </div>
                      <div>
                        Depuis 2019, dans le cadre de la feuille de route ministérielle et de la loi
                        de financement de la sécurité sociale qui renforce ses pouvoirs, l&apos;ANSM
                        demande aux industriels de déclarer le plus en amont possible tout risque de
                        rupture. Cette politique d&apos;anticipation maximale a pour conséquence une
                        augmentation du nombre de déclarations reçues.
                      </div>
                      <div>
                        Les déclarations de décret stock sans risque ne sont pas représentées ici.
                      </div>
                    </div>
                  </BaseTooltipContent>
                }
              >
                <div className="text-xl">
                  Historique du nombre de déclarations de ruptures et de risques de rupture de stock
                </div>
              </ContainerWithTooltip>
              <div className="min-h-[256px] md:min-h-[512px] lg:min-h-[600px] w-full relative">
                <LineChart
                  className="flex justify-center mt-4 w-full h-full absolute"
                  labels={years}
                  datasets={datasets}
                  leftLegend="Nombre de déclarations"
                  bottomLegend="Année"
                />
              </div>
            </div>
          </ChartBox>
        </div>
      ) : (
        <div className="w-full flex justify-center items-center">
          <NotEnoughData />
        </div>
      )}

      <DeclarationCauseByYearSection />
    </div>
  );
};
