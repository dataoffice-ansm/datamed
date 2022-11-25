import {EntityPageLayout} from '../../components/Layouts/EntityPageLayout/EntityPageLayout';
import {HeroHeader} from '../../components/HeroHeader/HeroHeader';
import type {Substance} from '../../api/interfaces/models';
import type {EntitySub} from '../../contexts/EntityContext';
import {EntityContextProvider, useEntityContext} from '../../contexts/EntityContext';
import type {Substance} from '../../api/graphql/__generated__/generated-types';

const SectionOneGlobalInformation = () => {
    const {currentEntity} = useEntityContext<EntitySub>();
    return (
        <div className="min-h-screen text-center">
            <h1>Section 1</h1>
            <h2>{currentEntity.name}</h2>
        </div>
    );
};

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

export const SubstancePage = ({sub}: { sub: Substance }) => (
    <EntityContextProvider entity={{type: 'sub', ...sub}}>
        <EntityPageLayout
            colorMenu="primary"
            sections={[
                {
                    id: 'data-ansm-question',
                    label: "DATA.ANSM c'est quoi ?",
                    content: <SectionOneGlobalInformation/>,
                },
                {
                    id: 'donnees-globales-plateforme',
                    label: 'Données globales de la plateforme',
                    content: <SectionTwo/>,
                },
                {
                    id: 'lecture-des-donnees',
                    label: 'Lecture des données',
                    content: <SectionThree/>,
                },
            ]}
            render={(content) => (
                <div>
                    <div className="py-10 my-2">before content</div>
                    {content}
                    <div className="py-10 my-2">after content</div>
                </div>
            )}
        >
            <HeroHeader/>
        </EntityPageLayout>
    </EntityProvider>
);
