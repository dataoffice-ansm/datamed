import { NavPageLayout } from '../../components/Layouts/NavPageLayout';

export const Index = () => (
  <NavPageLayout
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
    ]}
    render={(content) => (
      <>
        <div>beforeContent</div>
        {content}
        <div>afterContent</div>
      </>
    )}
  />
);

export default Index;
