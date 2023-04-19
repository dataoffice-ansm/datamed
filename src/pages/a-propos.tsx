/* eslint-disable react/iframe-missing-sandbox */
import { SmallContainer } from '../components/SmallContainer';
import { FullWidthRow } from '../components/FullWidthRow';
import type { HTMLAttributes } from 'react';
import classnames from 'classnames';
import { BackgroundSquares } from '../components/BackgroundSquares';

/**
 *
 * @param title
 * @param className
 * @param id
 * @param children
 * @constructor
 */
const Section = ({
  title,
  className,
  id,
  children,
}: HTMLAttributes<HTMLDivElement> & { title: string }) => (
  <section id={id} className={classnames('mb-14', className)}>
    <div className="font-medium text-xl text-left">{title}</div>
    {children}
  </section>
);

const SectionToolForAll = () => (
  <Section title="Un outil accessible pour tous">
    <div className="py-4">
      <div>
        data.ansm est un outil à destination du grand public et des professionnels de santé qui
        permet de réunir en un seul endroit plusieurs types de données sur les médicaments, en
        particulier, des données exclusives à l&apos;Agence nationale de sécurité des médicaments et
        des produits de santé (ANSM) comme les déclarations d&apos;effets indésirables et de
        ruptures de stock.
      </div>
      <div className="py-4">
        L’accès aux statistiques autour des médicaments se veut rapide, intuitif et accompagné.
      </div>
    </div>
  </Section>
);

const SectionEIG = () => (
  <Section title="Plusieurs partenaires de l'ANSM">
    <div>
      <div className="py-4">
        Cet outil est le fruit de l&apos;
        <a
          rel="external noreferrer"
          target="_blank"
          href="https://ansm.sante.fr/actualites/succes-du-premier-hackathon-e-med-consacre-aux-erreurs-medicamenteuses-communique"
        >
          Hackthon eMed de l&apos;ANSM
        </a>
        , du{' '}
        <a
          rel="external noreferrer"
          target="_blank"
          href="https://www.health-data-hub.fr/partenariats/ordei"
        >
          projet ORDEI avec le Health Data Hub
        </a>{' '}
        et la collaboration avec trois Entrepreneurs d’Intérêt Général et l’ANSM, à travers{' '}
        <a
          rel="external noreferrer"
          target="_blank"
          href="https://eig.etalab.gouv.fr/defis/datamed/"
        >
          le défi DataMed
        </a>
        .
      </div>
      <div className="py-4">
        Porté par Etalab et la Direction Interministérielle du Numérique (DINUM), le programme
        Entrepreneurs d&apos;Intérêt Général a pour objectif de faire travailler ensemble des
        personnes extérieures à l&apos;administration, aux compétences numériques pointues, et des
        agents publics engagés dans une démarche d&apos;innovation. Les entrepreneurs d&apos;intérêt
        général sont répartis en binômes ou trinômes pluridisciplinaires. Avec leurs mentors, ils
        ont eu 10 mois pour relever un défi d&apos;amélioration du service public à l&apos;aide du
        numérique et des données.
      </div>
      <div className="py-4">
        Le Health Data Hub est un groupement d&apos;intérêt public qui garantit l&apos;accès aisé et
        unifié, transparent et sécurisé, aux données de santé pour améliorer la qualité des soins et
        l&apos;accompagnement des patients.
      </div>
      <div className="pt-4">
        L&apos;ANSM et le Health Data Hub ont signé une convention-cadre pour favoriser le partage
        des données dont dispose l&apos;ANSM et l&apos;open source tout en garantissant la
        protection des données personnelles. L&apos;objectif est double : faciliter pour tous
        l&apos;accès aux données sur les médicaments et assurer une plus grande transparence.
      </div>
      <div className="pb-4">
        <a
          rel="external noreferrer"
          target="_blank"
          href="https://ansm.sante.fr/actualites/lansm-et-le-health-data-hub-partenaires-pour-faciliter-lacces-aux-donnees-sur-les-produits-de-sante"
        >
          Lire l&apos;article complet
        </a>
      </div>
    </div>
  </Section>
);

const SectionOpenDataComplex = () => (
  <Section title="Partage de données complexes et sensibles">
    <div className="py-4">
      <div>
        <a rel="external noreferrer" target="_blank" href="https://ansm.sante.fr/">
          L&apos;Agence Nationale de Sécurité du Médicament et des produits de santé (ANSM)
        </a>{' '}
        est chargée de faciliter l&apos;accès à l&apos;innovation thérapeutique, de garantir la
        sécurité des produits de santé et d&apos;informer et échanger avec les patients et
        professionnels de santé. Elle détient, pour assurer ses missions, de nombreuses données
        issues de l&apos;ensemble de ses activités.
      </div>
      <div className="py-4">
        L’ANSM souhaite favoriser la transparence sur l’action publique, améliorer l’information sur
        le médicament - notamment à destination des patients et des professionnels de santé - et
        valoriser les données de santé.
      </div>
      <div className="py-4">
        C’est pourquoi, depuis 2019, l’ANSM a mis en place une stratégie d’ouverture de ses données
        pour communiquer sur ses actions et valoriser son expertise. Cependant, ces données issues
        de déclarations (effets indésirables suspectés d’être dus à un médicament, erreurs
        médicamenteuses, ruptures de stock de médicament…) sont complexes et sensibles.
      </div>
    </div>
  </Section>
);

const SectionExclusiveData = () => (
  <Section title="Des données exclusives à l’ANSM">
    <div className="py-4">
      <div>
        L’ANSM partage des statistiques sur l&apos;historique des déclarations qui lui sont
        adressées, dans les domaines suivants :
      </div>
      <div className="py-4">
        - les ruptures de stock et risques de rupture de stock de médicaments
      </div>
      <div>- les effets indésirables des médicaments et les erreurs médicamenteuses</div>
      <div className="py-4">
        Le site data.asnm.sante.fr ne contient aucune données à caractère individuel. Les données
        publiées sont issues des bases de données de l&apos;ANSM qui ont fait l&apos;objet
        d&apos;une pseudonymisation afin de garantir la protection de la vie privée des patients.
        Pour renforcer la protection des données, seules des données agrégées sont mises en ligne.
        Lorsqu&apos;un effet indésirable concerne moins de 11 patients, le nombre de personnes
        concernées n&apos;est pas affiché, afin d&apos;éviter toute réidentification possible des
        patients.
      </div>
    </div>
  </Section>
);

const PageAbout = () => (
  <FullWidthRow
    className="bg-grey-10"
    classNameInner="justify-center"
    background={<BackgroundSquares offset={400} className="fill-secondary-200" />}
  >
    <div className="flex flex-col items-center justify-center mb-16">
      <SmallContainer>
        <FullWidthRow
          className="bg-black"
          background={
            <div className="relative overflow-hidden w-full h-full min-h-[50vh]">
              <iframe
                allowFullScreen
                className="h-full w-full overflow-hidden"
                sandbox="allow-scripts allow-same-origin allow-presentation"
                allow="autoplay"
                src="https://www.dailymotion.com/embed/video/x82dxy0"
                title="Datamed EIG4"
              />
            </div>
          }
        />
        <h1 className="text-center mt-[60vh]">À propos de data.ansm</h1>
        <div className="flex flex-col justify-center bg-white rounded shadow p-6 mb-4">
          <SectionToolForAll />
          <SectionEIG />
          <SectionOpenDataComplex />
          <SectionExclusiveData />
        </div>
      </SmallContainer>
    </div>
  </FullWidthRow>
);

export default PageAbout;
