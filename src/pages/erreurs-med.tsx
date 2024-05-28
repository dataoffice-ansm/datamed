import React, {useState} from 'react';
import { HeadlessHeroHeader } from '../components/HeroHeader/HeadlessHeroHeader';
import ErrorPreparationSvg from "../assets/pictos/errors/errorPreparation.svg";
import {Tooltip} from "../components/Tooltip";
import {SectionDataOrigin} from "../componentsPages/ErrorsMed/DataOriginSection";
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
import {BarChartRepartition} from "../components/Charts/BarChartRepartition";
import {numberWithThousand} from "../utils/format";
import FolderSVG from "../assets/pictos/folder.svg";
import {BoxInfo} from "../components/BoxInfo";
import MedicineList from "../components/MedicineList";





const SectionDeclarations = () => {

    // A remplacer par les données de la base de données
    const [exposition, setExposition] = useState({
        minYear: 2009,
        maxYear: 2021,
        consumption: 5623,
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

    const globalDecSeriousEffectsRep = [
        { name: 'Erreur technique de préparation', valuePercent: 19.28 },
        { name: 'Médicament périmé ou dérioré ou mal conservé', valuePercent: 19.02 },
        { name: 'erreur de médicament', valuePercent: 8.51 },
        { name: 'erreur de suivi thérapeutique et clinique', valuePercent: 6.38 },
        { name: 'Erreur de voie d\'aministragion', valuePercent: 3.59 },
        { name: 'Erreur de technique d\'administration', valuePercent: 2.53 },
        { name: 'Erreur de posologie ou de concentration', valuePercent: 2.39 },
        { name: 'Erreur de moment d\'administration', valuePercent: 1.99 },
        { name: 'Autre', valuePercent: 1.33 },
    ];

    const transformedData = globalDecSeriousEffectsRep.map(item => ({
        range: item.name,
        valuePercent: item.valuePercent,
        value: item.valuePercent // Vous pouvez remplacer ceci par la valeur réelle si vous l'avez
    }));


    return (
        <div>
            <BoxInfo
                title={`${numberWithThousand(exposition?.consumption ?? 0)} déclarations reçues`}
                icon={<FolderSVG className="h-24 w-24" />}
                theme="dark-green"
                className="my-8"
                // tooltip={
                //   <div>
                //     <strong>Déclarations cumulées</strong>
                //     <div>
                //       Travail réalisé sur une extraction de 5 ans de la BNPV, avec objectif de mise à jour
                //       progressive des données.
                //     </div>
                //   </div>
                // }
            >
                {exposition?.maxYear && exposition?.minYear
                    ? `Nombre cumulé de déclarations d’effets indésirables suspectés sur la période
          ${exposition.minYear} - ${exposition.maxYear}`
                    : 'Période des données issues non renseignée'}
            </BoxInfo>

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

            <div className="mb-8 m-auto mt-8">
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
                                        contentTooltip={MedErrorApparition.name ?? ''} // TODO Créer un nouveau champ pour MedErrorApparition pour le contenu du tooltip (Seul le nom est affiché pour l'instant)
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

            <div className="flex-1">
                <GraphBox
                    title="Répartition par cause de gravité"
                    className="h-full max-w-[100%]"
                    tooltip={
                        <>
                            <p>
                                La définition réglementaire de gravité en pharmacovigilance est très précise : un
                                effet indésirable grave est un effet indésirable létal, ou susceptible de mettre
                                la vie en danger, ou entraînant une invalidité ou une incapacité importantes ou
                                durables, ou provoquant ou prolongeant une hospitalisation, ou se manifestant par
                                une anomalie ou une malformation congénitale.
                            </p>
                            <p>
                                La catégorie &quot;Autre&quot; correspond aux déclarations d&apos;effets
                                indésirables ayant été jugés comme grave par le professionnel de santé, mais ne
                                rentrant pas dans les catégories listées comme étant graves selon la définition
                                réglementaire de gravité en pharmacovigilance.
                            </p>
                        </>
                    }
                >
                    <BarChartRepartition
                        className="h-64 w-full flex justify-center items-center"
                        data={transformedData}
                        dataLabel="Répartition par cause de gravité"
                        theme="green-full"
                    />
                </GraphBox>
            </div>
        </div>
    );
}

const SectionListeSpecialites = () => {
    const medicines = [
        { id: 1, name: 'Medicament 1' },
        { id: 2, name: 'Medicament 2' },
        { id: 3, name: 'Medicament 3' },
        { id: 4, name: 'Medicament 4' },
        { id: 5, name: 'Medicament 5' },
        { id: 6, name: 'Medicament 6' },
        { id: 7, name: 'Medicament 7' },
        { id: 8, name: 'Medicament 8' },
        { id: 9, name: 'Medicament 9' },
        { id: 10, name: 'Medicament 10' },
        { id: 11, name: 'Medicament 11' },
        { id: 12, name: 'Medicament 12' },
        { id: 13, name: 'Medicament 13' },
        { id: 14, name: 'Medicament 14' },
        { id: 15, name: 'Medicament 15' },
        { id: 16, name: 'Medicament 16' },
        { id: 17, name: 'Medicament 17' },
        { id: 18, name: 'Medicament 18' },
        { id: 19, name: 'Medicament 19' },
        { id: 20, name: 'Medicament 20' },
    ];
    return (
        <div>
            <SectionTitle title="Spécialités de médicaments ayant reçu au moins 10 déclarations" />
            <MedicineList medicines={medicines} />
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
                        content: <SectionListeSpecialites />,
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