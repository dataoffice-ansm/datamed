import { CardWithImage } from '../../../components/CardWithImage';

import OutOfStockSvg from '../../../assets/pictos/out_of_stock_green.svg';
import SickPersonSvg from '../../../assets/pictos/sick_person.svg';
import { Button } from '../../../components/Button/Button';

export const MoreInfoSection = () => (
  <div className="flex flex-col justify-center items-center m-auto max-w-3xl py-16">
    <div className="flex flex-col justify-center items-center max-w-2xl">
      <h2 className="py-4 text-2xl md:text-3xl font-medium">Statistiques globales</h2>
      <p className="text-lg md:text-xl text-center mb-16">
        Envie d’en savoir plus sur les données qui constituent ce site ? <br /> Consultez les
        statistiques issues des déclarations reçues par l’ANSM pour l’ensemble des médicaments et
        substances actives autorisés sur le territoire national.
      </p>
    </div>

    <CardWithImage
      className="mb-8 border border-grey-100"
      imageClassName="m-auto lg:m-unset w-72 lg:w-80 xl:w-96 py-4 md:py-0 lg:ml-4"
      contentClassName="items-center text-center lg:items-start lg:text-start !py-2"
      title="Déclarations de ruptures de stock et risques de rupture de stock de médicament"
      image={<OutOfStockSvg />}
      button={<Button href="/ruptures">Découvrir les données</Button>}
    >
      <p>
        Consultez les statistiques globales sur l&apos;historique des déclarations de ruptures de
        stock et de risques de rupture de stock des médicaments d&apos;intérêt thérapeutique majeur
      </p>

      {/*<span>*/}
      {/*      <span className="font-medium">Source des données :</span>*/}
      {/*    {source}*/}
      {/*</span>*/}
    </CardWithImage>

    <CardWithImage
      className="mb-8 border border-grey-100"
      imageClassName="m-auto lg:m-unset w-72 lg:w-80 xl:w-96 py-4 md:py-0 lg:ml-4"
      contentClassName="items-center text-center lg:items-start lg:text-start !py-2"
      title="Déclarations d'effets indésirables suspectés d’être dus à un médicament"
      image={<SickPersonSvg />}
      button={<Button href="/globaldec">Découvrir les données</Button>}
    >
      <p>
        Consultez l&apos;historique des données de déclarations d&apos;effets indésirables suspectés
        d&apos;être en lien avec l&apos;utilisation d&apos;un ou plusieurs médicaments
      </p>

      {/*<span>*/}
      {/*      <span className="font-medium">Source des données :</span>*/}
      {/*    {source}*/}
      {/*</span>*/}
    </CardWithImage>
  </div>
);
