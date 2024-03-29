import type { HTMLAttributes } from 'react';
import IllustrationMentionLegal from '../assets/pictos/mention_legal.svg';
import classnames from 'classnames';
import { SmallContainer } from '../components/SmallContainer';
import { FullWidthRow } from '../components/FullWidthRow';
import { BackgroundSquares } from '../components/BackgroundSquares';
import Link from 'next/link';

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
    <div className="py-4">
      <strong>Agence nationale de sécurité du médicament et des produits de santé</strong>
      <div>
        <p>143-147, Boulevard Anatole France 93285 Saint-Denis Cedex</p>
        <p>Tél : +33(0)1 55 87 30 00</p>
        <p>Fax : +33(0)1 55 87 30 12</p>
        <p>Directeur de la publication : Direction générale de l’ANSM </p>
        <p>Pour contacter les webmasters : webmaster@ansm.sante.fr</p>
      </div>
    </div>
  </Section>
);

const SectionServer = () => (
  <Section title="Hébergeur">
    <div className="py-4">
      <div>ITS Integra</div>
      <div>42, rue de Bellevue</div>
      <div>92100 Boulogne Billancourt</div>
      <div>Tél : +33(0)1 78 89 35 00</div>

      <div className="py-4">
        Hébergement certifié “Hébergeur de Données de Santé” (HDS) conformément à la réglementation
        française en vigueur émanant de L’Agence du Numérique en Santé (ANS).
      </div>
    </div>
  </Section>
);

const SectionAuthor = () => (
  <Section title="Conception & Développements">
    <div className="py-4">
      <a rel="external noreferrer" target="_blank" href="https://ansm.sante.fr/">
        ANSM
      </a>
    </div>
    <div className="pb-4">
      <a rel="external noreferrer" target="_blank" href="https://eig.etalab.gouv.fr/">
        Entrepreneurs d&apos;Intérêt Général
      </a>
    </div>
    <div>
      <a rel="external noreferrer" target="_blank" href="https://www.health-data-hub.fr/">
        Health Data Hub
      </a>
    </div>
  </Section>
);

const SectionCopyRight = () => (
  <Section title="Propriété intellectuelle">
    <div className="py-4">
      <div>
        Les données et les informations présentes sur le site Internet data.ansm.sante.fr sont mises
        à disposition du public par l&apos;Agence nationale de sécurité du médicament et des
        produits de santé. Ces informations sont protégées par la Convention de Berne sur la
        Protection des œuvres littéraires et artistiques, par d&apos;autres conventions
        internationales et par les législations nationales sur le droit d&apos;auteur et les droits
        dérivés.
      </div>
      <div className="pt-4">
        Le régime de la réutilisation d’informations publiques fixé par le titre II du livre III du
        code des relations entre le public et l’administration (CRPA) pose en particulier deux
        règles :
        <ul>
          <li>
            <cite>
              « les informations publiques figurant dans des documents communiqués ou publiés par
              les administrations … peuvent être utilisées par toute personne qui le souhaite à
              d&apos;autres fins que celles de la mission de service public pour les besoins de
              laquelle les documents ont été produits ou reçus. »
            </cite>{' '}
            (Article L321-1 du CRPA)
          </li>
          <li>
            <cite>
              « sauf accord de l&apos;administration, la réutilisation des informations publiques
              est soumise à la condition que ces dernières ne soient pas altérées, que leur sens ne
              soit pas dénaturé et que leurs sources et la date de leur dernière mise à jour soient
              mentionnées. »
            </cite>{' '}
            (Article L322-1 du CRPA)
          </li>
        </ul>
      </div>
      <div className="py-4 font-bold">
        Toute utilisation des données ou des informations provenant du site data.ansm doit
        obligatoirement mentionner l&apos;ANSM en tant que source de l&apos;information.
      </div>
      <div>
        La reproduction, la traduction, ou toute utilisation de données ou d’informations provenant
        du site Internet de l’ANSM à des fins autres que personnelles, éducatives ou non
        commerciales, est subordonnée à l&apos;obtention préalable d&apos;une autorisation écrite
        formelle du directeur général de l&apos;ANSM.
      </div>
    </div>
  </Section>
);

const SectionEtablisment = () => (
  <Section title="Établissement de liens">
    <div className="py-4">
      <div>
        Tout site public ou privé est autorisé à établir, sans autorisation préalable, un lien vers
        la page d’accueil ou directement vers les informations diffusées par le site{' '}
        <Link href="/">
          <a>data.ansm.sante.fr</a>
        </Link>
        . Mais en aucun cas les pages du site{' '}
        <Link href="/">
          <a>data.ansm.sante.fr</a>
        </Link>{' '}
        ne doivent se retrouver imbriquées à l&apos;intérieur des pages d&apos;un autre site. Tout
        doit être fait pour indiquer clairement à l’internaute qu’il se trouve sur le site{' '}
        <Link href="/">
          <a>data.ansm.sante.fr</a>
        </Link>{' '}
        et lui permettre d’y naviguer librement.
      </div>
      <div className="py-4">
        Pour sa part, l’ANSM établit des liens uniquement sur les sites publics et n&apos;est en
        rien responsable de liens qui sont faits vers son site. Cependant si vous créez un lien vers
        l’ANSM nous apprécierions d’en être informé par un simple mail à :{' '}
        <a rel="external noreferrer" target="_blank" href="mailto:webmaster@ansm.sante.fr">
          webmaster@ansm.sante.fr
        </a>
      </div>
    </div>
  </Section>
);

const SectionAnnoucement = () => (
  <Section title="Avertissement général">
    <div className="py-4">
      La mention de firmes ou de produits commerciaux n&apos;implique pas que ces firmes ou produits
      commerciaux sont agréés ou recommandés par l&apos;ANSM.
    </div>
  </Section>
);

const SectionDataProtect = () => (
  <Section title="Protection des données à caractère personnel">
    <div className="py-4">
      Les données publiées sur le site{' '}
      <Link href="/">
        <a>data.ansm.sante.fr</a>
      </Link>{' '}
      sont issues de bases de données de l&apos;ANSM et d&apos;autres institutions françaises (Cnam)
      et ont fait l&apos;objet d&apos;une pseudonymisation afin de garantir la protection de la vie
      privée des patients. Pour cela, seules des données agrégées sont mises en ligne.
      Lorsqu&apos;un effet indésirable concerne moins de 11 patients, le nombre de personnes
      concernées n&apos;est pas affiché, afin d&apos;éviter toute réidentification possible des
      patients
    </div>
  </Section>
);

const PageLegal = () => (
  <FullWidthRow
    className="bg-grey-10"
    classNameInner="justify-center"
    background={<BackgroundSquares className="fill-skin-1" />}
  >
    <div className="flex flex-col items-center justify-center mb-16">
      <h1 className="py-8">Mentions Légales</h1>
      <SmallContainer>
        <div className="IllustrationContainer my-4">
          <IllustrationMentionLegal />
        </div>
        <div className="flex flex-col justify-center bg-white rounded shadow p-6 mb-4">
          <SectionEditor />
          <SectionServer />
          <SectionAuthor />
          <SectionCopyRight />
          <SectionEtablisment />
          <SectionAnnoucement />
          <SectionDataProtect />
        </div>
      </SmallContainer>
    </div>
  </FullWidthRow>
);

export default PageLegal;
