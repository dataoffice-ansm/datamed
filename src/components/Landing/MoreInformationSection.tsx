import { CardWithImage } from './CardWithImage';

import OutOfStockSvg from '../../assets/images/out_of_stock.svg';
import SickPersonSvg from '../../assets/images/sick_person.svg';

export const MoreInformationSection = () => (
  <div className="w-full flex justify-center items-center flex-col py-16">
    <h2 className="py-4 text-2xl md:text-3xl font-medium">Données d’ensemble</h2>
    <p className="max-w-2xl text-lg md:text-xl text-center mb-16">
      Envie d’en savoir plus sur les données qui constituent ce site ?<br />
      Consultez les déclarations reçues par l’ANSM pour l’ensemble des médicaments et substances
      actives autorisés sur le territoire national.
    </p>

    <CardWithImage
      className="mb-8"
      title="Ruptures de stock de médicaments"
      description="Renseignez-vous sur l'historique des ruptures de stock des médicaments d'intérêt thérapeutique majeur, ainsi que les chiffres autour de la gestion des ruptures."
      source="Trustmed Base de déclaration des rutpures de stock"
      href="/ruptures"
      image={<OutOfStockSvg />}
    />

    <CardWithImage
      className="mb-8"
      title="Déclarations de cas d’effets indésirables"
      description="Consultez les données de déclaration d’effets indésirables reçues, utilisées par les agents de l’ANSM dans le cadre de la surveillance des effets indésirables tout au long de la vie du médicament."
      source="Base de données publiques du médicament, Système National des Données de Santé (CNAM)"
      href="/globaldec"
      image={<SickPersonSvg className="h-full" />}
    />
  </div>
);
