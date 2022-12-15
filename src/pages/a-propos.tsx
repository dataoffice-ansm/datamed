/* eslint-disable react/iframe-missing-sandbox */
import { SmallContainer } from '../components/SmallContainer';
import { FullWidthRow } from '../components/FullWidthRow/FullWidthRow';
import type { HTMLAttributes } from 'react';
import classnames from 'classnames';
import { Button } from '../components/Button/Button';
import { BackgroundSquares } from '../components/BackgroundSquares/BackgroundSquares';

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
        permet de réunir en un seul endroit plusieurs types de données sur les médicaments, dont des
        données exclusives à l’ANSM comme les effets indésirables et les ruptures de stock.
      </div>
      <div className="py-4">
        L’accès aux informations autour des médicaments se veut rapide, intuitif et accompagné.
      </div>
    </div>
  </Section>
);

const SectionEIG = () => (
  <Section title="Les Entrepreneurs d’Intérêt Général au service de l’Agence">
    <div className="py-4">
      <div>
        Cet outil est né d’une collaboration entre trois Entrepreneurs d’Intérêt Général et l’ANSM,
        à travers le{' '}
        <Button externalLink href="https://eig.etalab.gouv.fr/defis/datamed/">
          défi DataMed
        </Button>
        .
      </div>
      <div className="py-4">
        Le programme Entrepreneurs d&apos;Intérêt Général a pour objectif de faire travailler
        ensemble des personnes extérieures à l&apos;administration, aux compétences numériques
        pointues, et des agents publics engagés dans une démarche d&apos;innovation. Les
        entrepreneurs d&apos;intérêt général sont répartis en binômes ou trinômes
        pluridisciplinaires. Avec leurs mentors, ils ont eu 10 mois pour relever un défi
        d&apos;amélioration du service public à l&apos;aide du numérique et des données.
      </div>
    </div>
  </Section>
);

const SectionOpenDataComplex = () => (
  <Section title="L'ouverture de données complexes et sensibles">
    <div className="py-4">
      <div>
        <Button externalLink href="https://ansm.sante.fr/">
          L&apos;Agence Nationale de Sécurité du Médicament et des produits de santé (ANSM)
        </Button>{' '}
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
      <div>
        C’est pourquoi, depuis 2019, l’ANSM a mis en place une stratégie d’ouverture de ses données
        pour communiquer sur ses actions et valoriser son expertise. Cependant, ces données
        (vigilance sur les médicaments et les dispositifs médicaux, données sur les ruptures de
        stocks de médicament…) sont complexes et sensibles.
      </div>
    </div>
  </Section>
);

const SectionExclusiveData = () => (
  <Section title="Des données exclusives à l’ANSM">
    <div className="py-4">
      <div>
        L’ANSM ouvre pour la première fois une partie des données exploitéees par ses agents. Dans
        un premier temps, deux services sont concernés :
      </div>
      <div className="py-4">
        - les données de la Direction de l’Inspection (sur les ruptures de stock de médicaments)
      </div>
      <div>
        - les données de la Direction de la Surveillance (sur les effets indésirables des
        médicaments, les erreurs médicamenteuses et le bon usage du médicament)
      </div>
      <div className="py-4">
        Ces dernières ont fait l’objet d’un traitement, d’une analyse et d’une agrégation rigoureuse
        afin d&apos;assurer la confidentialité des données.
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
                src="https://www.dailymotion.com/embed/video/x82dxy0?autoplay=1"
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
