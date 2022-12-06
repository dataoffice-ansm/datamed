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

export const GetFigureByPathology = ({ id }: { id: Maybe<number> | undefined }) => {
  const width = 150;
  const height = 150;
  switch (id) {
    case 0:
      return <AffectionsCardiaquesFigure width={width} height={height} />;
    case 1:
      return <AffectionPeauFigure width={width} height={height} />;
    case 2:
      return <AffectionsReinFigure width={width} height={height} />;
    case 3:
      return <AffectionsNerveuxFigure width={width} height={height} />;
    case 4:
      return <AffectionGastroFigure width={width} height={height} />;
    case 5:
      return <AffectionHematologiqueFigure width={width} height={height} />;
    case 6:
      return <AffectionHepatobilaireFigure width={width} height={height} />;
    case 7:
      return <AffectionMusculosquelettiquesFigure width={width} height={height} />;
    case 8:
      return <AffectionPsychiatriquesFigure width={width} height={height} />;
    case 9:
      return <AffectionRespiratoiresFigure width={width} height={height} />;
    case 10:
      return <AffectionVasculaireFigure width={width} height={height} />;
    case 11:
      return <InvestigationsFigure width={width} height={height} />;
    case 12:
      return <LesionsFigure width={width} height={height} />;
    case 13:
      return <TroublesMetabolismeFigure width={width} height={height} />;
    case 14:
      return <TroublesGenerauxFigure width={width} height={height} />;
    case 15:
      return <AffectionOreilleFigure width={width} height={height} />;
    case 16:
      return <AffectionOrganeFigure width={width} height={height} />;
    case 17:
      return <AffectionSystemeImmuFigure width={width} height={height} />;
    case 18:
      return <AffectionEndocriFigure width={width} height={height} />;
    case 19:
      return <AffectionsOculaireFigure width={width} height={height} />;
    case 20:
      return <InfectionFigure width={width} height={height} />;
    case 21:
      return <ProblemeFigure width={width} height={height} />;
    case 22:
      return <AffectionCongenitalesFigure width={width} height={height} />;
    case 23:
      return <TumeursBenignesFigure width={width} height={height} />;
    case 24:
      return <ActeMedicauxFigure width={width} height={height} />;
    case 25:
      return <AffectionGravidiquesFigure width={width} height={height} />;
    case 26:
      return <CaracteristiqueSocioFigure width={width} height={height} />;
    default:
      return <NotFoundFigure width={width} height={height} />;
  }
};
