import type { HTMLAttributes } from 'react';
import IllustrationMentionLegal from '../assets/images/mention_legal.svg';
import classnames from 'classnames';
import { SmallContainer } from '../components/SmallContainer';
import { FullWidthRow } from '../components/FullWidthRow/FullWidthRow';
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

const SectionEditor = () => (
  <Section title="Éditeur">
    <p>
      <strong>Agence nationale de sécurité du médicament et des produits de santé</strong>
      143-147, Boulevard Anatole France 93285 Saint-Denis Cedex Tél : +33(0)1 55 87 30 00 Fax :
      +33(0)1 55 87 30 12 Directeur de la publication : Direction générale de l’ANSM Pour contacter
      les webmasters : webmaster@ansm.sante.fr
    </p>
  </Section>
);

const SectionServer = () => (
  <Section title="Numéro du standart de l'ANSM">
    <p>
      ITS Integra 42, rue de Bellevue 92100 Boulogne Billancourt Tél : +33(0)1 78 89 35 00
      Hébergement certifié “Hébergeur de Données de Santé” (HDS) conformément à la réglementation
      française en vigueur émanant de L’Agence du Numérique en Santé (ANS).
    </p>
  </Section>
);

const SectionAuthor = () => (
  <Section title="Conception & Développements">
    <p>
      <CallToAction externalLink href="https://eig.etalab.gouv.fr/">
        Entrepreneurs d&apos;Intérêt Général
      </CallToAction>
    </p>
    <p>
      <CallToAction externalLink href="https://www.health-data-hub.fr/">
        Health Data Hub
      </CallToAction>
    </p>
  </Section>
);

const SectionCopyRight = () => (
  <Section title="Utilisation des données et Copyright">
    Les données et les informations présentes sur le site Internet www.data.ansm.sante.fr sont mises
    à disposition du public par l&apos;Agence nationale de sécurité du médicament et des produits de
    santé. Ces informations sont protégées par la Convention de Berne sur la Protection des œuvres
    littéraires et artistiques, par d&apos;autres conventions internationales et par les
    législations nationales sur le droit d&apos;auteur et les droits dérivés. L&apos;information et
    les données contenues sur le site Internet peuvent faire l&apos;objet de revues, ou être
    reproduites ou traduites à des fins de recherche ou d&apos;étude personnelle, mais ne peuvent
    être ni vendues ni utilisées à des fins commerciales.
    <strong>
      Toute utilisation des données ou des informations provenant du site data.ansm doit
      obligatoirement mentionner l&apos;ANSM en tant que source de l&apos;information
    </strong>
    . La reproduction, la traduction, ou toute utilisation de données ou d’informations provenant du
    site Internet de l’ANSM à des fins autres que personnelles, éducatives ou non commerciales, est
    subordonnée à l&apos;obtention préalable d&apos;une autorisation écrite formelle du directeur
    général de l’ANSM.
  </Section>
);

const SectionEtablisment = () => (
  <Section title="Établissement de liens">
    Tout site public ou privé est autorisé à établir, sans autorisation préalable, un lien vers la
    page d’accueil ou directement vers les informations diffusées par le site
    <CallToAction externalLink href="www.data.ansm.sante.fr">
      www.data.ansm.sante.fr
    </CallToAction>
    . Mais en aucun cas les pages du site
    <CallToAction externalLink href="www.data.ansm.sante.fr">
      www.data.ansm.sante.fr
    </CallToAction>
    . ne doivent se retrouver imbriquées à l&apos;intérieur des pages d&apos;un autre site. Tout
    doit être fait pour indiquer clairement à l’internaute qu’il se trouve sur le site
    <CallToAction externalLink href="www.data.ansm.sante.fr">
      www.data.ansm.sante.fr
    </CallToAction>
    . et lui permettre d’y naviguer librement. Pour sa part, l’ANSM établit des liens uniquement sur
    les sites publics et n&apos;est en rien responsable de liens qui sont faits vers son site.
    Cependant si vous créez un lien vers l’ANSM nous apprécierions d’en être informé par un simple
    mail à : webmaster@ansm.sante.fr
  </Section>
);

const SectionAnnoucement = () => (
  <Section title="Avertissement général">
    La mention de firmes ou de produits commerciaux n&apos;implique pas que ces firmes ou produits
    commerciaux sont agréés ou recommandés par l&apos;ANSM.
  </Section>
);

const SectionDataProtect = () => (
  <Section title="Protection des données à caractère personnel">
    Le site data.ansm ne contient aucune donnée à caractère personnel. Les données publiées sont
    issues des bases (à compléter) de l&apos;ANSM et ont fait l&apos;objet d&apos;une anonymisation
    afin de garantir la protection de la vie privée des patients. Pour cela, seules des données
    agrégées sont mises en ligne. Lorsqu&apos;un effet indésirable concerne moins de 10 patients, le
    nombre de personnes concernées n&apos;est pas affiché, afin d&apos;éviter toute réidentification
    possible des patients.
  </Section>
);

const PageLegal = () => (
  <FullWidthRow className="bg-grey-10" classNameInner="justify-center">
    <div className="flex flex-col items-center justify-center">
      <SmallContainer>
        <div className="IllustrationContainer my-4">
          <IllustrationMentionLegal />
        </div>
        <div className="flex flex-col justify-center bg-white rounded shadow p-6 mb-4">
          <SectionEditor />
          <SectionServer />
          <SectionAuthor />
          <SectionCopyRight />
        </div>
      </SmallContainer>
    </div>
  </FullWidthRow>
);

export default PageLegal;
