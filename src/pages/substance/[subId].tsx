import { EntityPageLayout } from '../../components/Layouts/EntityPageLayout/EntityPageLayout';
import { EntityProvider } from '../../contexts/EntityContext';

export const Index = () => (
  <EntityProvider cis={null}>
    <EntityPageLayout
      colorMenu="primary"
      sections={[
        {
          id: 'section1',
          label: 'section1',
          content: <section className="h-96"> section 1 </section>,
        },
        {
          id: 'section2',
          label: 'section2',
          content: <section className="h-96"> section 2 </section>,
        },
        {
          id: 'section3',
          label: 'section3',
          content: <section className="h-96"> section 3 </section>,
        },
      ]}
      render={(content) => content}
    />
  </EntityProvider>
);

export default Index;
