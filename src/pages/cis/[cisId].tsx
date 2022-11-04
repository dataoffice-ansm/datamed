import { NavPageLayout } from '../../components/Layouts/NavPageLayout';

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

const PageSpeciality = () => (
  <NavPageLayout
    category="cis"
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
  />
);

export default PageSpeciality;
