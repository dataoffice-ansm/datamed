import React, {useState} from 'react';
import { HeadlessHeroHeader } from '../components/HeroHeader/HeadlessHeroHeader';
import ErrorPreparationSvg from "../assets/pictos/errors/errorPreparation.svg";
import {Tooltip} from "../components/Tooltip";
import {SectionDataOrigin} from "../componentsPages/GlobalStatistic/DataOriginSection";
import {EntityPageLayout} from "../components/Layouts/EntityPageLayout/EntityPageLayout";
import {SectionTitle} from "../components/SectionTitle";
import {GraphBox} from "../components/GraphBox/GraphBox";
import {GraphFigure} from "../components/GraphFigure";
import ManFaceYes from "../assets/pictos/manFaceYes.svg";
import ManFaceNo from "../assets/pictos/manFaceNo.svg";
import {NotEnoughData} from "../components/NotEnoughData";
import {PieChartRepartition} from "../components/Charts/PieChartRepartition";
import {buildRangeData, buildSortedRangeData} from "../utils/entities";
import {GlobalStatsUsagePerNotifier, MedicalErrorApparitionStep} from "../graphql/__generated__/generated-documents";
import {GraphFiguresGrid} from "../components/GraphFiguresGrid";
import {getMedErrorApparitionStepIcon, getNotifierIcon} from "../utils/iconsMapping";
import {GraphBoxSelect} from "../components/GraphBoxSelect";





const SectionDeclarations = () => {

    // A remplacer par les données de la base de données
    const [exposition, setExposition] = useState({
        maxYear: 2009,
        minYear: 2021,
    });

    const [sideEffectsRepartition, setSideEffectsRepartition] = useState({
        sideEffects: { valuePercent: 47 },
        noSideEffects: { valuePercent: 53 },
    });

    const [globalDecAgeRep, setGlobalDecAgeRep] = useState<Array<{description?: string, id?: number, range: string, value: number, valuePercent: number}>>([
        { description: 'Enfants', id: 1, range: 'Enfants', value: 33, valuePercent: 33 },
        { description: 'Adultes', id: 2, range: 'Adultes', value: 33, valuePercent: 33 },
        { description: 'Personnes âgées', id: 3, range: 'Personnes âgées', value: 33, valuePercent: 33 },
    ]);

    const [repartitionPerStep, setRepartitionPerNotifier] = useState<Array<{name: string, step: MedicalErrorApparitionStep, value: number, valuePercent: number}>>([
        { name: 'Prescription', step: MedicalErrorApparitionStep.PreparationStep, value: 3, valuePercent: 3 },
        { name: 'Délivrance', step: MedicalErrorApparitionStep.DeliveranceStep, value: 5, valuePercent: 5 },
        { name: 'Préparation', step: MedicalErrorApparitionStep.PrescriptionStep, value: 10, valuePercent: 10 },
        { name: 'Administration', step: MedicalErrorApparitionStep.AdministrationStep, value: 80, valuePercent: 80 },
        { name: 'Suivi thérapeutique', step: MedicalErrorApparitionStep.SurveillanceStep, value: 1, valuePercent: 1 },
        { name: 'Autre étape', step: MedicalErrorApparitionStep.OtherStep, value: 1, valuePercent: 1 },
    ]);


    return (
        <div>
            <SectionTitle
                title="Déclarations d'erreurs médicamenteuses"
                subTitle={
                    exposition?.maxYear && exposition?.minYear
                        ? `Données issues de la période ${exposition.minYear} - ${exposition.maxYear}`
                        : 'Période des données issues non renseignée'
                }
            />

            <div className="flex flex-shrink flex-col md:flex-row gap-8 mb-8 m-auto mt-8">


                <div className="flex-1 flex-shrink">
                    <GraphBox
                        title="Répartition de la population concernée"
                        className="h-full max-w-[100%]"
                    >
                        <PieChartRepartition
                            theme="green"
                            className="h-64 w-full flex justify-center items-center"
                            data={globalDecAgeRep}
                        />
                    </GraphBox>
                </div>

                <div className="flex-1 flex-shrink">
                    <GraphBox
                        title="Existence d’effets indésirables suite aux erreurs médicamenteuses déclarées"
                        className="h-full max-w-[100%]"
                    >
                        {sideEffectsRepartition?.sideEffects?.valuePercent !== 0 &&
                        sideEffectsRepartition?.noSideEffects?.valuePercent !== 0 ? (
                            <div className="mt-8 flex gap-8 justify-center items-center">
                                {sideEffectsRepartition?.noSideEffects?.valuePercent && (
                                    <GraphFigure
                                        value={sideEffectsRepartition.noSideEffects?.valuePercent}
                                        valueClassName="mt-2 text-dark-green"
                                        label="Sans effets indésirables"
                                        icon={<ManFaceYes className="w-24 sm:w-32" />}
                                    />
                                )}
                                {sideEffectsRepartition?.sideEffects?.valuePercent && (
                                    <GraphFigure
                                        value={sideEffectsRepartition?.sideEffects?.valuePercent}
                                        label="Avec effets indésirables"
                                        valueClassName="mt-2 text-dark-green"
                                        icon={<ManFaceNo className="w-24 sm:w-32" />}
                                    />
                                )}
                            </div>
                        ) : (
                            <div className="w-full flex justify-center items-center">
                                <NotEnoughData />
                            </div>
                        )}
                    </GraphBox>
                </div>


            </div>

            <GraphBoxSelect
                title="À quelle étape sont survenues les erreurs médicamenteuses déclarées ?"
                theme="secondary-variant"
                render={({ selectedUnitOption }) => {
                    const globalDecNotifiersRep = buildRangeData<GlobalStatsUsagePerNotifier>(
                        repartitionPerStep ?? [],
                        selectedUnitOption
                    );

                    return (
                        <GraphFiguresGrid
                            data={repartitionPerStep}
                            renderItem={(MedErrorApparition) => (
                                <GraphFigure
                                    key={MedErrorApparition.step}
                                    className="NotifierRepartitionFigure"
                                    unit={selectedUnitOption === 'percent' ? ' % ' : ''}
                                    label={MedErrorApparition.name}
                                    icon={getMedErrorApparitionStepIcon(MedErrorApparition.step)}
                                    valueClassName="text-dark-green-900"
                                    value={
                                        (selectedUnitOption === 'percent' ? MedErrorApparition.valuePercent : MedErrorApparition.value) ?? 0
                                    }
                                />
                            )}
                        />
                    );
                }}
            />
        </div>
    );
}

const ErreursMed = () => {
    return (
        <div>





            <EntityPageLayout
                colorMenu="green"
                sections={[
                    {
                        id: 'declarations',
                        label: 'Déclarations',
                        content: <SectionDeclarations />,
                    },
                    {
                        id: 'liste-des-specialites',
                        label: 'Liste des spécialités',
                        content: <SectionDeclarations />,
                    },
                    {
                        id: 'originine-des-donnees',
                        label: 'ORIGINE DES DONNÉES',
                        content: <SectionDataOrigin />,
                    },
                ]}
                render={(content) => content}
            >
                <HeadlessHeroHeader
                    theme="bg-secondary-variant"
                    icon={<ErrorPreparationSvg className="h-full" />}
                    backNavigationLabel="Données globales"
                    title="Déclarations d'erreurs médicamenteuses"
                    description="Statistiques globales"
                    textColor="text-black"
                    backNavigationIconColor="fill-black"
                    tooltip={
                        <Tooltip
                            placement="bottom"
                            content={
                                <div className="max-w-md">
                                    <p className="font-medium mb-4 text-lg">Qu’est-ce qu'une erreur médicamenteuse ?</p>
                                    <p>
                                        L'erreur médicamenteuse est une erreur non intentionnelle d'un professionnel de santé, d'un patient ou d'un tiers, selon le cas, survenue au cours du processus de soin impliquant un médicament, notamment lors de la prescription, de la dispensation ou de l'administration. L'erreur médicamenteuse peut être à l'origine d’un risque ou d'un événement indésirable pour le patient.
                                    </p>
                                </div>
                            }
                            render={(refCb) => (
                                <span ref={refCb} className="underline cursor-help">
              Qu’est-ce qu'une erreur médicamenteuse ?
            </span>
                            )}
                        />
                    }
                />
            </EntityPageLayout>


        </div>
    );
};

export default ErreursMed;