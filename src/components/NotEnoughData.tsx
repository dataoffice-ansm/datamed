import Notfound from '../assets/images/notfound.svg';

export const NotEnoughData = () => (
  <div className="flex flex-col justify-center items-center gap-3 my-8">
    <Notfound className="w-40 h-40" />
    <p>Données insuffisantes pour affichage</p>
  </div>
);
