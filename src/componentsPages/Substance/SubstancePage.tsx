import { EntityPageLayout } from '../../components/Layouts/EntityPageLayout/EntityPageLayout';
import { HeroHeader } from '../../components/HeroHeader/HeroHeader';
import type { EntitySub } from '../../contexts/EntityContext';
import { EntityContextProvider, useEntityContext } from '../../contexts/EntityContext';
import type { Substance } from '../../api/graphql/__generated__/generated-types';
import Page404 from '../../pages/[404]';
import { useSubstanceQuery } from '../../graphql/__generated__/generated-documents';
import { PaginatedList } from 'components/PaginatedList/PaginatedList';
import Link from 'next/link';
import classnames from 'classnames';

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
    return <p>TODO</p>;
  }

  return (
    <div className="SectionThree">
      <h2>Spécialités de médicaments contenant : {currentEntity.name}</h2>
      <div className="p-4 border border-grey-200 rounded-lg bg-white">
        <div className="text-secondary-900 font-medium">
          {data?.getSubstance?.retrieveSpecialities?.meta?.count} médicaments identifiés
        </div>
        <div className="pt-6">
          <PaginatedList
            theme="secondary"
            data={data?.getSubstance?.retrieveSpecialities?.specialities ?? []}
            renderItem={(item) =>
              item?.code ? (
                <Link href={`/specialite/${item.code}`}>
                  <a
                    className={classnames(
                      'w-full no-underline hover:underline p-4 hover:bg-grey-50 focus:bg-grey-50',
                      'hover:font-medium focus:font-medium'
                    )}
                  >
                    {item?.id} - {item?.name}
                  </a>
                </Link>
              ) : null
            }
          />
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
