import { SmallContainer } from '../components/SmallContainer';
import Video from '../assets/images/video.svg';
import { FullWidthRow } from '../components/FullWidthRow/FullWidthRow';
import type { HTMLAttributes } from 'react';
import classnames from 'classnames';
import { CallToAction } from '../components/CallToAction/CallToAction';

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
    <p>
      data.ansm est un outil à destination du grand public et des professionnels de santé qui permet
      de réunir en un seul endroit plusieurs types de données sur les médicaments, dont des données
      exclusives à l’ANSM comme les effets indésirables et les ruptures de stock. L’accès aux
      informations autour des médicaments se veut rapide, intuitif et accompagné.
    </p>
  </Section>
);

const SectionEIG = () => (
  <Section title="Les Entrepreneurs d’Intérêt Général au service de l’Agence">
    Cet outil est né d’une collaboration entre trois Entrepreneurs d’Intérêt Général et l’ANSM, à
    travers le{' '}
    <CallToAction externalLink href="https://eig.etalab.gouv.fr/defis/datamed/">
      défi DataMed
    </CallToAction>
    . Le programme Entrepreneurs d&apos;Intérêt Général a pour objectif de faire travailler ensemble
    des personnes extérieures à l&apos;administration, aux compétences numériques pointues, et des
    agents publics engagés dans une démarche d&apos;innovation. Les entrepreneurs d&apos;intérêt
    général sont répartis en binômes ou trinômes pluridisciplinaires. Avec leurs mentors, ils ont eu
    10 mois pour relever un défi d&apos;amélioration du service public à l&apos;aide du numérique et
    des données.
  </Section>
);

const SectionOpenDataComplex = () => (
  <Section title="L'ouverture de données complexes et sensibles">
    <p>
      <CallToAction externalLink href="https://ansm.sante.fr/">
        L&apos;Agence Nationale de Sécurité du Médicament et des produits de santé (ANSM)
      </CallToAction>{' '}
      est chargée de faciliter l&apos;accès à l&apos;innovation thérapeutique, de garantir la
      sécurité des produits de santé et d&apos;informer et échanger avec les patients et
      professionnels de santé. Elle détient, pour assurer ses missions, de nombreuses données issues
      de l&apos;ensemble de ses activités. L’ANSM souhaite favoriser la transparence sur l’action
      publique, améliorer l’information sur le médicament - notamment à destination des patients et
      des professionnels de santé - et valoriser les données de santé. C’est pourquoi, depuis 2019,
      l’ANSM a mis en place une stratégie d’ouverture de ses données pour communiquer sur ses
      actions et valoriser son expertise. Cependant, ces données (vigilance sur les médicaments et
      les dispositifs médicaux, données sur les ruptures de stocks de médicament…) sont complexes et
      sensibles.
    </p>
  </Section>
);
const SectionExclusifData = () => (
  <Section title="Des données exclusives à l’ANSM">
    <p>
      L’ANSM ouvre pour la première fois une partie des données exploitéees par ses agents. Dans un
      premier temps, deux services sont concernés : - les données de la Direction de l’Inspection
      (sur les ruptures de stock de médicaments) - les données de la Direction de la Surveillance
      (sur les effets indésirables des médicaments, les erreurs médicamenteuses et le bon usage du
      médicament) Ces dernières ont fait l’objet d’un traitement, d’une analyse et d’une agrégation
      rigoureuse afin d&apos;assurer la confidentialité des données.
    </p>
  </Section>
);

const PageAbout = () => (
  <FullWidthRow className="bg-grey-10" classNameInner="justify-center">
    <div className="flex flex-col items-center justify-center">
      <SmallContainer>
        <div className="IllustrationContainer my-4">
          <Video />
        </div>
        <h3 className="text-center">À propos de data.ansm</h3>
        <div className="flex flex-col justify-center bg-white rounded shadow p-6 mb-4">
          <SectionToolForAll />
          <SectionEIG />
          <SectionOpenDataComplex />
          <SectionExclusifData />
        </div>
      </SmallContainer>
    </div>
  </FullWidthRow>
);

export default PageAbout;
