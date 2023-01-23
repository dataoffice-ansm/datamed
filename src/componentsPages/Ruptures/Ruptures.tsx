import { HeadlessHeroHeader } from '../../components/HeroHeader/HeadlessHeroHeader';
import { EntityPageLayout } from '../../components/Layouts/EntityPageLayout/EntityPageLayout';
import { Tooltip } from '../../components/Tooltip/Tooltip';
import RupturesSVG from '../../assets/pictos/ruptures.svg';
import { DeclarationsPerYearSection } from './DeclarationsPerYearSection';
import { DeclarationNatureCountSection } from './DeclarationNatureCountSection';
import { RupturesDeclarationActionByYearSection } from './DeclarationActionByYear';
import { DataOriginSection } from './DataOriginSection';
import { RepartitionPerTherapeuticClassSection } from './RepartitionPerTherapeuticClassSection';
import { useRupturesPageContext } from '../../contexts/RupturesPageContext';

const useGetGlobalRupturesPeriod = () => {
  const { ruptureYears } = useRupturesPageContext();

  if (ruptureYears && ruptureYears.length > 0) {
    const max = ruptureYears[0];
    const min = ruptureYears[ruptureYears.length - 1];
    return min && max
      ? `Données issues de la période courante ${String(min)} - ${String(max)}`
      : '';
  }

  return 'Aucune période courant disponible';
};

const buildRupturesPageSections = (periodString: string) => [
  {
    id: 'declarations',
    label: 'DÉCLARATIONS',
    content: (
      <div className="SectionDeclarations mt-4 mb-8">
        <DeclarationsPerYearSection />
        <DeclarationNatureCountSection periodString={periodString} />
        <RepartitionPerTherapeuticClassSection />
      </div>
    ),
  },
  {
    id: 'gestion',
    label: 'GESTION',
    content: (
      <div className="w-full">
        <RupturesDeclarationActionByYearSection />
      </div>
    ),
  },
  {
    id: 'origine-des-donnees',
    label: 'ORIGINES DES DONNÉES',
    content: <DataOriginSection />,
  },
];

export const Ruptures = () => {
  const rupturesMinMaxPeriod = useGetGlobalRupturesPeriod();
  return (
    <div className="RupturesPage">
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
              <div className="p-2 max-w-md">
                <p className="font-medium mb-4">
                  Qu&apos;est-ce qu&apos;un Médicament d&apos;Intérêt Thérapeutique Majeur ?
                </p>
                <p className="text-base">
                  Les MITM sont des médicaments pour lesquelles une interruption de traitement est
                  susceptible de mettre en jeu le pronostic vital des patients à court ou moyen
                  terme, ou représente une perte de chance importante pour les patients au regard de
                  la gravité ou du potentiel évolutif de la maladie.
                </p>
              </div>
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
        colorMenu="green"
        sections={buildRupturesPageSections(rupturesMinMaxPeriod)}
        render={(content) => content}
      />
    </div>
  );
};
