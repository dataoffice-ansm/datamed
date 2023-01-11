import { CardWithImage } from '../../../components/CardWithImage';

import OutOfStockSvg from '../../../assets/pictos/out_of_stock_green.svg';
import SickPersonSvg from '../../../assets/pictos/sick_person.svg';
import { Button } from '../../../components/Button/Button';

export const MoreInfoSection = () => (
  <div className="w-full flex justify-center items-center flex-col py-16">
    <h2 className="py-4 text-2xl md:text-3xl font-medium">Statistiques globales</h2>
    <p className="text-lg md:text-xl text-center mb-16">
      Envie d’en savoir plus sur les données qui constituent ce site ? Consultez les données
      statistiques autour des déclarations reçues par l’ANSM pour l’ensemble des médicaments et
      substances actives autorisés sur le territoire national.
    </p>

    <div className="m-auto max-w-xl lg:max-w-3xl">
      <CardWithImage
        className="mb-8 border border-grey-100"
        imageClassName="w-56 lg:w-72"
        title="Déclarations de ruptures et risques de rupture de stock de médicament"
        image={<OutOfStockSvg />}
        button={<Button href="/ruptures">Découvrir les données</Button>}
      >
        <p>
          Consultez les statistiques globales sur l&apos;historique des déclarations de rupture et
          de risque de rupture des médicaments d&apos;intérêt thérapeutique majeur
        </p>

        {/*<span>*/}
        {/*      <span className="font-medium">Source des données :</span>*/}
        {/*    {source}*/}
        {/*</span>*/}
      </CardWithImage>

      <CardWithImage
        className="mb-8 border border-grey-100"
        imageClassName="w-56 lg:w-72"
        title="Déclarations d'effets indésirables suspectés d’être liés aux médicaments"
        image={<SickPersonSvg />}
        button={<Button href="/globaldec">Découvrir les données</Button>}
      >
        <p>
          Consultez les données de déclarations d&apos;effets indésirables qu&apos;on suspecte
          d&apos;être en lien avec l&apos;utilisation d&apos;un ou plusieurs médicaments
        </p>

        {/*<span>*/}
        {/*      <span className="font-medium">Source des données :</span>*/}
        {/*    {source}*/}
        {/*</span>*/}
      </CardWithImage>
    </div>
  </div>
);
