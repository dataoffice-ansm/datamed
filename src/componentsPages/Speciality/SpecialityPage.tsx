import { HeroHeader } from '../../components/HeroHeader/HeroHeader';
import type { SelectOption } from '../../components/Select/Select';
import { Select } from '../../components/Select/Select';
import { useCallback, useMemo, useState } from 'react';
import type { Speciality } from '../../api/interfaces/models';
import { EntityPageLayout } from '../../components/Layouts/EntityPageLayout/EntityPageLayout';
import { EntityProvider, useEntityContext } from '../../contexts/EntityContext';

const SectionOneGlobalInformation = () => (
  <div className="min-h-screen text-center bg-white shadow rounded-lg p-4">
    <h1>Section 1</h1>
  </div>
);

const SectionTwo = () => (
  <div className="min-h-screen text-center bg-white shadow rounded-lg mt-2 p-4">
    <h1>Section 2</h1>
  </div>
);

const SectionThree = () => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const { currentEntity } = useEntityContext();
  const substances = useMemo(() => (currentEntity as Speciality).substances ?? [], [currentEntity]);

  const options: SelectOption[] = useMemo(
    () =>
      substances.map((substance) => ({
        label: substance.name,
        value: substance.id,
      })),
    [substances]
  );

  const substance = substances[selectedIndex];

  const onChange = useCallback((index: number) => {
    setSelectedIndex(index);
  }, []);

  return (
    <div className="min-h-screen text-center bg-white shadow rounded-lg mt-2 p-4">
      <h1>Section 3</h1>
      {substances.length === 0 && <div>Aucune substances disponibles</div>}
      {substances.length > 0 && (
        <>
          <h2>Substance sélectionnée: {substance?.name}</h2>
          <Select defaultOptionIndex={selectedIndex} options={options} onSelectOption={onChange} />
        </>
      )}
    </div>
  );
};

export const SpecialityPage = ({ cis }: { cis: Speciality }) => (
  <EntityProvider entity={cis}>
    <EntityPageLayout
      offsetContent={80}
      colorMenu="primary"
      sections={[
        {
          id: 'data-ansm-question',
          label: "DATA.ANSM c'est quoi ?",
          content: <SectionOneGlobalInformation />,
        },
        {
          id: 'donnees-globales-plateforme',
          label: 'Données globales de la plateforme',
          content: <SectionTwo />,
        },
        {
          id: 'lecture-des-donnees',
          label: 'Lecture des données',
          content: <SectionThree />,
        },
      ]}
      render={(content) => content}
    >
      <HeroHeader />
    </EntityPageLayout>
  </EntityProvider>
);
