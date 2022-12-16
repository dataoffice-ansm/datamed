import { Button } from '../../../components/Button/Button';
import { ChartBox } from '../../../components/ChartBox';
import { SectionTitle } from '../../../components/SectionTitle';

export const DataOrigin = () => (
  <div>
    <div>
      <SectionTitle title="Origine des données" />
      <ChartBox>
        <div className="flex flex-col justify-start items-start flex-auto text-left">
          <p>Plateforme de télédéclaration des ruptures et risques de rupture de stock des MITM</p>
          <p className="font-medium">D&apos;où viennent les données ? Quelle est leur nature ?</p>
          <p>
            Les laboratoires pharmaceutiques ont l&apos;obligation de déclarer toute rupture ou
            risque de rupture concernant des Médicaments d&apos;Intérêt Thérapeutique Majeur (MITM)
            à l&apos;ANSM. Les laboratoires déclarent également, pour tous leurs MITM, les niveaux
            de stocks inférieurs au niveau de stock requis.
          </p>
          <p>
            Les MITM sont des médicaments pour lesquelles une interruption de traitement est
            susceptible de mettre en jeu le pronostic vital des patients à court ou moyen terme, ou
            représente une perte de chance importante pour les patients au regard de la gravité ou
            du potentiel évolutif de la maladie.
          </p>
          <p>
            Toute déclaration entraîne l&apos;ouverture d&apos;un dossier par l&apos;ANSM.
            L&apos;action de l&apos;ANSM est centrée sur la gestion des ruptures de stock et risques
            de rupture de stock des médicaments susceptibles de présenter un risque pour la santé
            publique.
          </p>
          <p>
            Retrouvez différentes statistiques sur les déclarations reçues par l&apos;ANSM et les
            actions mises en place pour y remédier.
          </p>
          <p className="mt-8 font-medium">Avertissements</p>
          <p>
            La publication de ces données fait partie de l&apos;objectif de transparence de
            l&apos;ANSM sur ses actions pour sécuriser l&apos;approvisionnement en médicaments
            d&apos;intérêt thérapeutique majeur (MITM).
          </p>
          <p>
            Les ruptures d&apos;approvisionnements peuvent être causées par des ruptures de stock
            (production du médicament) mais également par des ruptures dans le circuit de
            distribution. Ces dernières ne font pas l&apos;objet de déclarations auprès de
            l&apos;ANSM.{' '}
          </p>
          <p>
            Les données antérieures à mai 2021 n&apos;étant pas regroupées dans leur exhaustivité
            sous forme de base de données, elles ne sont pas toutes exploitables sous le format
            présenté.
          </p>
          <p className="mt-8 font-medium">Pour aller plus loin</p>
          <p>
            La sécurisation de l&apos;approvisionnement en médicaments d&apos;intérêt thérapeutique
            majeur.{' '}
            <Button href="https://ansm.sante.fr/qui-sommes-nous/nos-missions/assurer-la-securite-des-produits-de-sante/p/assurer-la-disponibilite#title">
              Voir l&apos;infographie sur le site de l&apos;ANSM
            </Button>
          </p>
          <p>
            La liste des MITM en rupture ou en risque de rupture de stock faisant l&apos;objet de
            mesures palliatives :{' '}
            <Button href="https://ansm.sante.fr/disponibilites-des-produits-de-sante/medicaments">
              Trouvez la liste des MITM sur le site de l&apos;ANSM
            </Button>
          </p>
        </div>
      </ChartBox>
    </div>
  </div>
);
