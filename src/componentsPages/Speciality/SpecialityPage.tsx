import type { Speciality } from '../../api/interfaces/models';
import { EntityPageLayout } from '../../components/Layouts/EntityPageLayout/EntityPageLayout';
import { EntityProvider } from '../../contexts/EntityContext';

const SectionOneGlobalInformation = () => (
  <div className="min-h-screen text-center">
    <h1>Section 1</h1>
  </div>
);

const SectionTwo = () => (
  <div className="min-h-screen text-center">
    <h1>Section 2</h1>
  </div>
);

const SectionThree = () => (
  <div className="min-h-screen text-center">
    <h1>Section 3</h1>
  </div>
);

export const SpecialityPage = ({ cis }: { cis: Partial<Speciality> }) => (
  <EntityProvider cis={cis}>
    <EntityPageLayout
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
      render={(content) => (
        <div>
          <div className="py-10 my-2">before content</div>
          {content}
          <div className="py-10 my-2">after content</div>
        </div>
      )}
    />
  </EntityProvider>
);
