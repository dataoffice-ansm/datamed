import React, { type ReactElement, useEffect, useState } from 'react';

import GelOrange from '../assets/loader/Gélule-120-orange.svg';
import GelGreen from '../assets/loader/Gélule-120-green.svg';
import GelRed from '../assets/loader/Gélule-120-red.svg';
import GelViolet from '../assets/loader/Gélule-120-violet.svg';
import GelBlue from '../assets/loader/Gélule-120-blue.svg';

export const Loader = () => {
  const pictos = [GelOrange, GelGreen, GelRed, GelViolet, GelBlue];
  const [selected, setSelected] = useState(Math.floor(Math.random() * pictos.length));

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     console.log('This will run every second!');
  //     const random = Math.floor(Math.random() * pictos.length);
  //     setSelected(random);
  //   }, 500);
  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [pictos.length]);

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex flex-col items-center">
        {React.createElement(pictos[selected], {
          className: 'animate-bounce w-20 h-20',
        })}
        <h1 className="mt-3 opacity-50">Chargement des données en cours...</h1>
      </div>
    </div>
  );
};
