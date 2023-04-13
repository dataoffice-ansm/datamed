import { SectionTitle } from '../../components/SectionTitle';
import { GraphBox } from '../../components/GraphBox/GraphBox';

export const DataOriginSection = () => (
  <div className="DataOriginSection">
    <SectionTitle title="Origine des données" />

    <GraphBox>
      <div className="flex flex-col justify-start items-start flex-auto text-left">
        <div className="mb-8">
          <h4 className="mt-0 mb-2">Bases de données exploitées</h4>
          <p>Plateforme de télédéclaration des ruptures et risques de rupture de stock des MITM</p>
        </div>

        <div className="mb-8">
          <h4 className="mt-0 mb-2">D&apos;où viennent les données ? Quelle est leur nature ?</h4>
          <p>
            Les laboratoires pharmaceutiques ont l&apos;obligation de déclarer toute rupture ou
            risque de rupture de stock concernant des médicaments d&apos;intérêt thérapeutique
            majeur (MITM) à l&apos;ANSM. Les laboratoires déclarent, pour tous leurs MITM, les
            niveaux de stocks inférieurs au niveau de stock requis.
          </p>
          <p>
            Les MITM sont des médicaments pour lesquelles une interruption de traitement est
            susceptible de mettre en jeu le pronostic vital des patients à court ou moyen terme, ou
            représente une perte de chance importante pour les patients au regard de la gravité ou
            du potentiel évolutif de la maladie, selon l&apos;article L. 5111-4 du code de la santé
            publique.
          </p>
          <p>
            Toutes les déclarations reçues font l&apos;objet d&apos;une analyse de risques et
            génèrent l&apos;ouverture d&apos;un dossier qui sera suivi par les équipes de
            l&apos;ANSM jusqu&apos;à remise à disposition normale du médicament. Certaines
            situations, plus critiques nécessitent, la mise en place de mesures permettant de
            limiter au maximum l&apos;impact sur l&apos;accès au traitement.
          </p>
          <p>
            Retrouvez différentes statistiques sur les déclarations reçues par l&apos;ANSM et les
            actions mises en place pour y remédier.
          </p>
        </div>

        <div className="mb-8">
          <h4 className="mt-0 mb-2">Avertissements</h4>
          <p>
            La publication de ces données fait partie de l&apos;objectif de transparence de
            l&apos;ANSM sur ses actions pour sécuriser l&apos;approvisionnement en médicaments
            d&apos;intérêt thérapeutique majeur (MITM).
          </p>
          <p>
            Les ruptures d&apos;approvisionnements se définissent comme l&apos;incapacité pour une
            pharmacie de dispenser un médicament à un patient dans un délai de 72 heures (après
            avoir effectué une demande d&apos;approvisionnement auprès de deux entreprises exerçant
            une activité de distribution de médicaments). Elles peuvent être causées par des
            ruptures de stock (production du médicament) mais également par des ruptures dans le
            circuit de distribution.{' '}
          </p>
          <p>
            Seules les ruptures de stock définies à l&apos;article R. 5124-49-1 du code de la santé
            publique font l&apos;objet d&apos;une déclaration à l&apos;ANSM. Les ruptures dans le
            circuit de distribution ne font pas l&apos;objet de déclarations auprès de l&apos;ANSM.
          </p>
          <p>
            Les données antérieures à mai 2021 n&apos;étant pas regroupées dans leur exhaustivité
            sous forme de base de données, elles ne sont pas toutes exploitables sous le format
            présenté.
          </p>
        </div>

        <div className="mb-12">
          <h4 className="mt-0 mb-2">Pour aller plus loin</h4>
          <p>
            La sécurisation de l&apos;approvisionnement en médicaments d&apos;intérêt thérapeutique
            majeur. <br />
            <a
              rel="external noreferrer"
              target="_blank"
              href="https://ansm.sante.fr/qui-sommes-nous/nos-missions/assurer-la-securite-des-produits-de-sante/p/assurer-la-disponibilite#title"
            >
              Voir l&apos;infographie sur le site de l&apos;ANSM
            </a>
          </p>
          <p>
            La liste des MITM en rupture ou en risque de rupture de stock faisant l&apos;objet de
            mesures palliatives: <br />
            <a
              rel="external noreferrer"
              target="_blank"
              href="https://ansm.sante.fr/disponibilites-des-produits-de-sante/medicaments"
            >
              Trouvez la liste des MITM sur le site de l&apos;ANSM
            </a>
          </p>
        </div>
      </div>
    </GraphBox>
  </div>
);
