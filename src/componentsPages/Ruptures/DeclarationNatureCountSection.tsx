import type { HTMLAttributes } from 'react';
import { useMemo } from 'react';
import { NotEnoughData } from 'components/NotEnoughData';
import { LineChart } from 'components/Charts/LineChart';
import tailwindPaletteConfig from '../../../tailwind.palette.config';
import { useRupturesPageContext } from '../../contexts/RupturesPageContext';
import { SectionTitle } from '../../components/SectionTitle';
import { DeclarationCauseByYearSection } from './DeclarationCauseByYearSection';
import { GraphBox } from '../../components/GraphBox/GraphBox';

/**
 *
 * @param periodString
 * @constructor
 */
export const DeclarationNatureCountSection = ({
  periodString,
}: { periodString: string } & HTMLAttributes<HTMLDivElement>) => {
  const { ruptureYears, repartitionPerClassification } = useRupturesPageContext();

  const datasets = useMemo(
    () => [
      {
        id: 1,
        label: 'Ruptures',
        backgroundColor: tailwindPaletteConfig.teal[900],
        borderColor: tailwindPaletteConfig.teal[900],
        data: (repartitionPerClassification ?? [])
          .filter((element) => element?.classification === 'rupture')
          .map((element) => element?.value),
      },
      {
        id: 2,
        label: 'Risques de ruptures',
        backgroundColor: tailwindPaletteConfig.green[900],
        borderColor: tailwindPaletteConfig.green[900],
        data: (repartitionPerClassification ?? [])
          .filter((element) => element?.classification === 'risque')
          .map((element) => element?.value),
      },
    ],
    [repartitionPerClassification]
  );

  return (
    <div className="DeclarationNatureCount mb-12">
      <SectionTitle
        title="Nombre et nature des déclarations de ruptures et risques de rupture de stock"
        subTitle={periodString}
      />

      <DeclarationCauseByYearSection />

      {repartitionPerClassification ? (
        <GraphBox
          title="Historique du nombre de déclarations de ruptures et de risques de rupture de stock"
          className="DeclarationNatureCountContent"
          tooltip={
            <>
              <p className="font-medium text-xl">
                Historique du nombre de déclarations de ruptures et de risques de rupture de stock
              </p>
              <p>
                Les industriels qui produisent des Médicaments d’Intérêt Thérapeutique Majeur (MITM)
                sont tenus de signaler à l’ANSM toute rupture de stock ou risque de rupture de stock
                les concernant (CSP Art. R. 5124-49-1).
              </p>
              <p>
                Depuis 2019, dans le cadre de la feuille de route ministérielle et de la loi de
                financement de la sécurité sociale qui renforce ses pouvoirs, l&apos;ANSM demande
                aux industriels de déclarer le plus en amont possible tout risque de rupture. Cette
                politique d&apos;anticipation maximale a pour conséquence une augmentation du nombre
                de déclarations reçues.
              </p>
              <p>Les déclarations de décret stock sans risque ne sont pas représentées ici.</p>
            </>
          }
        >
          <div className="min-h-[256px] md:min-h-[512px] lg:min-h-[600px] w-full relative">
            <LineChart
              className="flex justify-center mt-4 w-full h-full absolute"
              labels={ruptureYears}
              datasets={datasets}
              leftLegend="Nombre de déclarations"
              bottomLegend="Année"
            />
          </div>
        </GraphBox>
      ) : (
        <div className="w-full flex justify-center items-center">
          <NotEnoughData />
        </div>
      )}
    </div>
  );
};
