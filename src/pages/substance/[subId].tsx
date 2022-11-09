import { EntityPageLayout } from '../../components/Layouts/EntityPageLayout/EntityPageLayout';

export const Index = () => (
  <EntityPageLayout
    category="sub"
    colorMenu="secondary"
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
    ]}
    render={(content) => content}
  />
);

export default Index;
