import { EntityPageLayout } from '../../components/Layouts/EntityPageLayout/EntityPageLayout';
import { HeroHeader } from '../../components/HeroHeader/HeroHeader';
import type { EntityCis } from '../../contexts/EntityContext';
import { EntityContextProvider, useEntityContext } from '../../contexts/EntityContext';
import type { Speciality } from '../../api/graphql/__generated__/generated-types';

import Page404 from '../../pages/[404]';
import { useMemo } from 'react';
import type { Substance } from '../../graphql/__generated__/generated-documents';
import { SubstancesContainer } from '../../components/SubstancesContainer/SubstancesContainer';

const SectionOneGlobalInformation = () => {
  const { currentEntity } = useEntityContext<EntityCis>();

  return (
    <div className="SectionOneGlobalInformation bg-white shadow rounded-lg p-4">
      <div className="substances">
        {currentEntity?.substances && currentEntity.substances.length > 1 ? (
          <h5>Substances actives</h5>
        ) : (
          <h5>Substance active</h5>
        )}
      </div>

      {currentEntity.atc && (
        <div className="atc">
          <h5>Classe ATC</h5>
          <span>{currentEntity.atc?.name}</span> <span>{currentEntity.atc?.code}</span>
        </div>
      )}

      {currentEntity.commercialisationState && (
        <div className="commercialisationState">
          <h5>État de commercialisation</h5>
          <span>{currentEntity.commercialisationState}</span>
        </div>
      )}

      {currentEntity.laboratory && (
        <div className="laboratory">
          <h5>Laboratoire</h5>
          <span>{currentEntity.laboratory.name}</span>
        </div>
      )}

      {currentEntity.description && (
        <div className="Description">
          <p className="text-xl mb-8">{currentEntity.description}</p>
        </div>
      )}
    </div>
  );
};

const SectionTreatedPatients = () => (
  <div className="SectionTreatedPatients">
    <h5>SectionTreatedPatients</h5>
  </div>
);

const SectionMedicinalErrors = () => (
  <div className="SectionMedicinalErrors">
    <h5>SectionMedicinalErrors</h5>
  </div>
);

const SectionSideEffects = () => {
  const { currentEntity } = useEntityContext<EntityCis>();
  const substances = useMemo(
    () => currentEntity?.substances ?? [],
    [currentEntity?.substances]
  ) as Substance[];

  return (
    <div className="SectionSideEffects">
      <SubstancesContainer substances={substances} className="mt-4 mb-32" />
    </div>
  );
};

const SectionRisksShortageHistory = () => (
  <div className="SectionRisksShortageHistory">
    <h5>SectionRisksShortageHistory</h5>
  </div>
);

const SectionPublications = () => (
  <div className="SectionPublications">
    <h5>SectionPublications</h5>
  </div>
);

export const SpecialityPage = ({ cis }: { cis: Speciality }) => {
  if (!cis) {
    return <Page404 />;
  }

  return (
    <EntityContextProvider entity={{ type: 'cis', ...cis }}>
      <EntityPageLayout
        offsetContent={80}
        colorMenu="primary"
        sections={[
          {
            id: 'global-infos',
            label: 'Description',
            content: <SectionOneGlobalInformation />,
          },
          {
            id: 'treated-patients',
            label: 'Patients traités',
            content: <SectionTreatedPatients />,
          },
          {
            id: 'medicinal-errors',
            label: 'Erreurs médicamenteuses',
            content: <SectionMedicinalErrors />,
          },
          {
            id: 'side-effects',
            label: 'Effets indésirables',
            content: <SectionSideEffects />,
          },
          {
            id: 'shortage-risks-history',
            label: 'Historique des risques et des ruptures de stocks',
            content: <SectionRisksShortageHistory />,
          },
          {
            id: 'publications',
            label: 'Publications',
            content: <SectionPublications />,
          },
        ]}
        render={(content) => content}
      >
        <HeroHeader />
      </EntityPageLayout>
    </EntityContextProvider>
  );
};
