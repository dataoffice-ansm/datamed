import { EntityPageLayout } from '../../components/Layouts/EntityPageLayout/EntityPageLayout';
import { HeroHeader } from '../../components/HeroHeader/HeroHeader';
import type { EntitySub } from '../../contexts/EntityContext';
import { EntityContextProvider, useEntityContext } from '../../contexts/EntityContext';
import type { Substance } from '../../api/graphql/__generated__/generated-types';
import Page404 from '../../pages/[404]';
import { useSubstanceQuery } from '../../graphql/__generated__/generated-documents';

const SectionOneGlobalInformation = () => {
  const { currentEntity } = useEntityContext<EntitySub>();
  return (
    <div className="min-h-screen text-center">
      <h2>{currentEntity.name}</h2>
    </div>
  );
};

const SectionTwo = () => (
  <div className="min-h-screen text-center">
    <h2>Section 2</h2>
  </div>
);

const SectionThree = () => {
  const { currentEntity } = useEntityContext<EntitySub>();

  const { data } = useSubstanceQuery({
    variables: {
      subCode: currentEntity.code,
    },
  });

  if (!data) {
    return <p>ergeg</p>;
  }

  return (
    <div className="min-h-screen">
      <h2>Spécialités de médicaments contenant : {currentEntity.name}</h2>
      <div>
        <div>{data?.getSubstance?.retrieveSpecialities?.meta?.count} médicaments identifiés</div>
        <div>
          {data?.getSubstance?.retrieveSpecialities?.specialities?.map((speciality) => (
            <div key={speciality?.id}>
              <p>
                {speciality?.name} - {speciality?.code}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const SubstancePage = ({ sub }: { sub: Substance }) => {
  if (!sub) {
    return <Page404 />;
  }

  return (
    <EntityContextProvider entity={{ type: 'sub', ...sub }}>
      <EntityPageLayout
        colorMenu="primary"
        sections={[
          {
            id: 'population-concernee',
            label: 'POPULATION CONCERNÉÉ',
            content: <SectionOneGlobalInformation />,
          },
          {
            id: 'effets-indesirables',
            label: 'EFFETS INDÉSIRABLES',
            content: <SectionTwo />,
          },
          {
            id: 'liste-des-specialites',
            label: 'LISTE DES SPÉCIALITÉS',
            content: <SectionThree />,
          },
        ]}
        render={(content) => content}
      >
        <HeroHeader />
      </EntityPageLayout>
    </EntityContextProvider>
  );
};
