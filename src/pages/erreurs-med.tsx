import React from 'react';
import { HeadlessHeroHeader } from '../components/HeroHeader/HeadlessHeroHeader';
import ErrorPreparationSvg from "../assets/pictos/errors/errorPreparation.svg";
import {Tooltip} from "../components/Tooltip";

const ErreursMed = () => {
    return (
        <div>
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
            <h1>Bienvenue sur la nouvelle page</h1>
            <p>Cette page concerne les erreurs médicamenteuses.</p>
        </div>
    );
};

export default ErreursMed;