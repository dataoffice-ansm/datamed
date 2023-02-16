import React from 'react';

import GelOrange from '../assets/loader/Gélule-120-orange.svg';
import GelGreen from '../assets/loader/Gélule-120-green.svg';
import GelViolet from '../assets/loader/Gélule-120-violet.svg';
import GelBlue from '../assets/loader/Gélule-120-blue.svg';
import { useLayoutContext } from '../contexts/LayoutContext';

export const Loader = () => {
  const { navBarHeight } = useLayoutContext();
  const pictos = [GelOrange, GelGreen, GelViolet, GelBlue];
  const selected = Math.floor(Math.random() * pictos.length);

  return (
    <div className="flex justify-center items-center h-screen" style={{ marginTop: -navBarHeight }}>
      <div className="flex flex-col items-center">
        {React.createElement(pictos[selected], {
          className: 'animate-bounce w-20 h-20',
        })}
        <p className="mt-3 text-lg md:text-2xl opacity-75 text-center">
          Chargement des données en cours...
        </p>
      </div>
    </div>
  );
};
