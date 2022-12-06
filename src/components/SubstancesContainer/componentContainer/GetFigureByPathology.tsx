import React from 'react';

import AffectionsCardiaquesFigure from '../../../assets/images/pathology/0.svg';
import AffectionPeauFigure from '../../../assets/images/pathology/1.svg';
import AffectionsReinFigure from '../../../assets/images/pathology/2.svg';
import AffectionsNerveuxFigure from '../../../assets/images/pathology/3.svg';
import AffectionGastroFigure from '../../../assets/images/pathology/4.svg';
import AffectionHematologiqueFigure from '../../../assets/images/pathology/5.svg';
import AffectionHepatobilaireFigure from '../../../assets/images/pathology/6.svg';
import AffectionMusculosquelettiquesFigure from '../../../assets/images/pathology/7.svg';
import AffectionPsychiatriquesFigure from '../../../assets/images/pathology/8.svg';
import AffectionRespiratoiresFigure from '../../../assets/images/pathology/9.svg';
import AffectionVasculaireFigure from '../../../assets/images/pathology/10.svg';
import InvestigationsFigure from '../../../assets/images/pathology/11.svg';
import LesionsFigure from '../../../assets/images/pathology/12.svg';
import TroublesMetabolismeFigure from '../../../assets/images/pathology/13.svg';
import TroublesGenerauxFigure from '../../../assets/images/pathology/14.svg';
import AffectionOreilleFigure from '../../../assets/images/pathology/15.svg';
import AffectionOrganeFigure from '../../../assets/images/pathology/16.svg';
import AffectionSystemeImmuFigure from '../../../assets/images/pathology/17.svg';
import AffectionEndocriFigure from '../../../assets/images/pathology/18.svg';
import AffectionsOculaireFigure from '../../../assets/images/pathology/19.svg';
import InfectionFigure from '../../../assets/images/pathology/20.svg';
import ProblemeFigure from '../../../assets/images/pathology/21.svg';
import AffectionCongenitalesFigure from '../../../assets/images/pathology/22.svg';
import TumeursBenignesFigure from '../../../assets/images/pathology/23.svg';
import ActeMedicauxFigure from '../../../assets/images/pathology/24.svg';
import AffectionGravidiquesFigure from '../../../assets/images/pathology/25.svg';
import CaracteristiqueSocioFigure from '../../../assets/images/pathology/26.svg';
import NotFoundFigure from '../../../assets/images/notfound.svg';
import type { Maybe } from '../../../graphql/__generated__/generated-documents';

export const GetFigureByPathology = ({ name }: { name: Maybe<string> | undefined }) => {
  const width = 150;
  const height = 150;
  switch (name) {
    case 'Affections cardiaques':
      return <AffectionsCardiaquesFigure width={width} height={height} />;
    case 'Affections de la peau et du tissu sous-cutané':
      return <AffectionPeauFigure width={width} height={height} />;
    case 'Affections du rein et des voies urinaires':
      return <AffectionsReinFigure width={width} height={height} />;
    case 'Affections du système nerveux':
      return <AffectionsNerveuxFigure width={width} height={height} />;
    case 'Affections gastro-intestinales':
      return <AffectionGastroFigure width={width} height={height} />;
    case 'Affections hématologiques et du système lymphatique':
      return <AffectionHematologiqueFigure width={width} height={height} />;
    case 'Affections hépatobiliaires':
      return <AffectionHepatobilaireFigure width={width} height={height} />;
    case 'Affections musculosquelettiques et du tissu conjonctif':
      return <AffectionMusculosquelettiquesFigure width={width} height={height} />;
    case 'Affections psychiatriques':
      return <AffectionPsychiatriquesFigure width={width} height={height} />;
    case 'Affections respiratoires, thoraciques et médiastinales':
      return <AffectionRespiratoiresFigure width={width} height={height} />;
    case 'Affections vasculaires':
      return <AffectionVasculaireFigure width={width} height={height} />;
    case 'Investigations':
      return <InvestigationsFigure width={width} height={height} />;
    case "Lésions, intoxications et complications d'interventions":
      return <LesionsFigure width={width} height={height} />;
    case 'Troubles du métabolisme et de la nutrition':
      return <TroublesMetabolismeFigure width={width} height={height} />;
    case "Troubles généraux et anomalies au site d'administration":
      return <TroublesGenerauxFigure width={width} height={height} />;
    case "Affections de l'oreille et du labyrinthe":
      return <AffectionOreilleFigure width={width} height={height} />;
    case 'Affections des organes de reproduction et du sein':
      return <AffectionOrganeFigure width={width} height={height} />;
    case 'Affections du système immunitaire':
      return <AffectionSystemeImmuFigure width={width} height={height} />;
    case 'Affections endocriniennes':
      return <AffectionEndocriFigure width={width} height={height} />;
    case 'Affections oculaires':
      return <AffectionsOculaireFigure width={width} height={height} />;
    case 'Infections et infestations':
      return <InfectionFigure width={width} height={height} />;
    case 'Problèmes de produit':
      return <ProblemeFigure width={width} height={height} />;
    case 'Affections congénitales, familiales et génétiques':
      return <AffectionCongenitalesFigure width={width} height={height} />;
    case 'Tumeurs bénignes, malignes et non précisées (incl kystes et polypes)':
      return <TumeursBenignesFigure width={width} height={height} />;
    case 'Actes médicaux et chirurgicaux':
      return <ActeMedicauxFigure width={width} height={height} />;
    case 'Affections gravidiques, puerpérales et périnatales':
      return <AffectionGravidiquesFigure width={width} height={height} />;
    case 'Caractéristiques socio-environnementales':
      return <CaracteristiqueSocioFigure width={width} height={height} />;
    default:
      return <NotFoundFigure width={width} height={height} />;
  }
};
