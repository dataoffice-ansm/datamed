import { EntityPageLayout } from '../../components/Layouts/EntityPageLayout/EntityPageLayout';
import { HeroHeader } from '../../components/HeroHeader/HeroHeader';
import type { EntitySub } from '../../contexts/EntityContext';
import { EntityContextProvider, useEntityContext } from '../../contexts/EntityContext';
import type { Substance } from '../../api/graphql/__generated__/generated-types';
import Page404 from '../../pages/[404]';
import { useSubstanceQuery } from '../../graphql/__generated__/generated-documents';
import { PaginatedList } from '../../components/PaginatedList/PaginatedList';
import Link from 'next/link';
import classnames from 'classnames';
import { SubstanceContainer } from '../../components/SubstancesContainer/SubstanceContainer';
import { NotEnoughData } from 'components/NotEnoughData';

const SectionTitle = ({ title }: { title: string }) => (
  <h2 className="text-2xl lg:text-3xl text-left">{title}</h2>
);

const SectionOneGlobalInformation = () => {
  const { currentEntity } = useEntityContext<EntitySub>();
  return (
    <div className="min-h-screen text-center">
      <SectionTitle title={currentEntity.name} />
    </div>
  );
};

const SectionTwo = ({ substance }: { substance: Substance }) => (
  <div className="min-h-screen text-center">
    <SectionTitle title="Déclarations d’effets indésirables suspectés de la substance active" />
    <SubstanceContainer substance={substance} />
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
    return (
      <div className="w-full flex justify-center items-center">
        <NotEnoughData />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <SectionTitle title={`Spécialités de médicaments contenant: ${currentEntity.name}`} />
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
                      'w-full no-underline hover:underline p-4 focus:bg-grey-50',
                      'hover:font-medium focus:font-medium'
                    )}
                  >
                    {item?.name}
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
            content: <SectionTwo substance={sub} />,
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
