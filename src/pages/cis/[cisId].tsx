import SideMenuPageLayout from '../../components/Layouts/SideMenuPageLayout';

const PageSpeciality = () => (
  <SideMenuPageLayout.Wrapper colorMenu="primary">
    <SideMenuPageLayout.Item id="data-ansm-question" label="DATA.ANSM c'est quoi ?">
      <div className="min-h-screen text-center">
        <h1>Section 1</h1>
      </div>
    </SideMenuPageLayout.Item>

    <SideMenuPageLayout.Item
      id="donnees-globales-plateforme"
      label="Données globales de la plateforme"
    >
      <div className="min-h-screen text-center">
        <h1>Section 2</h1>
      </div>
    </SideMenuPageLayout.Item>

    <SideMenuPageLayout.Item id="lecture-des-donnees" label="Lecture des données">
      <div className="min-h-screen text-center">
        <h1>Section 3</h1>
      </div>
    </SideMenuPageLayout.Item>
  </SideMenuPageLayout.Wrapper>
);

export default PageSpeciality;
