import Notfound from '../assets/pictos/indice-nodata.svg';

export const NotEnoughData = () => (
  <div className="flex flex-col justify-center items-center gap-3 my-8">
    <Notfound className="w-48 h-48" />
    <p>Aucune donnée à afficher en raison d’un effectif trop faible ou nul.</p>
  </div>
);
