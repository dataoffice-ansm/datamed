import { HeadlessHeroHeader } from '../../components/HeroHeader/HeadlessHeroHeader';
import { EntityPageLayout } from '../../components/Layouts/EntityPageLayout/EntityPageLayout';
import { Tooltip } from '../../components/Tooltip/Tooltip';
import RupturesSVG from '../../assets/pictos/ruptures.svg';
import { DeclarationByYear } from './DeclarationByYear.tsx/DeclarationByYear';
import { DeclarationNatureCount } from './DeclarationNatureCount/DeclarationNatureCount';
import { BaseTooltipContent } from './Tooltip';
import { RupturesDeclarationActionByYear } from './DeclarationActionByYear/DeclarationActionByYear';
import { DataOrigin } from './DataOrigin/DataOrigin';
import { RepartitionPerTherapeuticClass } from './DeclarationNatureCount/RepartitionPerTherapeuticClass';
import { SectionTitle } from 'components/SectionTitle';
import { DeclarationCauseByYear } from './DeclarationCauseByYear/DeclarationCauseByYear';
import { useRupturesPageContext } from '../../contexts/RupturesPageContext';

const useGetGlobalRupturesPeriod = () => {
  const { ruptures } = useRupturesPageContext();
  const { ruptureYears } = ruptures;
  if (ruptureYears && ruptureYears.length > 0) {
    const max = ruptureYears[0];
    const min = ruptureYears[ruptureYears.length - 1];
    return `Données issues de la période courante ${String(min?.value)} - ${String(max?.value)}`;
  }

  return 'Aucune période courant disponible';
};

const buildRupturesPageSections = (periodString: string) => [
  {
    id: 'declarations',
    label: 'DÉCLARATIONS',
    content: (
      <div className="w-full flex flex-col gap-4">
        <DeclarationByYear />
        <SectionTitle
          title="Nombre et nature des déclarations de ruptures et risques de rupture de stock"
          subTitle={periodString}
        />
        <DeclarationNatureCount />
        <RepartitionPerTherapeuticClass />
        <DeclarationCauseByYear />
      </div>
    ),
  },
  {
    id: 'gestion',
    label: 'GESTION',
    content: (
      <div className="w-full">
        <RupturesDeclarationActionByYear />
      </div>
    ),
  },
  {
    id: 'origine-des-donnees',
    label: 'ORIGINES DES DONNÉES',
    content: <DataOrigin />,
  },
];

export const Ruptures = () => {
  const rupturesMinMaxPeriod = useGetGlobalRupturesPeriod();
  return (
    <div>
      <HeadlessHeroHeader
        theme="bg-secondary-variant"
        icon={<RupturesSVG className="h-full" />}
        backNavigationLabel="Ruptures"
        title="Risques et ruptures de stock des médicaments d'intérêt thérapeutique majeur"
        description="Statistiques globales"
        textColor="text-black"
        backNavigationIconColor="fill-black"
        tooltip={
          <Tooltip
            placement="bottom"
            content={
              <BaseTooltipContent>
                <div className="font-medium mb-4">
                  Qu&apos;est-ce qu&apos;un Médicament d&apos;Intérêt Thérapeutique Majeur ?
                </div>
                <div className="text-base">
                  Les MITM sont des médicaments pour lesquelles une interruption de traitement est
                  susceptible de mettre en jeu le pronostic vital des patients à court ou moyen
                  terme, ou représente une perte de chance importante pour les patients au regard de
                  la gravité ou du potentiel évolutif de la maladie.
                </div>
              </BaseTooltipContent>
            }
            render={(refCb) => (
              <span ref={refCb} className="underline cursor-help">
                Qu&apos;est-ce qu&apos;un Médicament d&apos;Intérêt Thérapeutique Majeur ?
              </span>
            )}
          />
        }
      />
      <EntityPageLayout
        className="pb-64"
        colorMenu="primary"
        sections={buildRupturesPageSections(rupturesMinMaxPeriod)}
        render={(content) => content}
      />
    </div>
  );
};
