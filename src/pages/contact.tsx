import type { HTMLAttributes } from 'react';
import Contact from '../assets/landing/contact.svg';
import classnames from 'classnames';
import Link from 'next/link';
import { SmallContainer } from '../components/SmallContainer';
import { FullWidthRow } from '../components/FullWidthRow/FullWidthRow';

import { BackgroundSquares } from '../components/BackgroundSquares/BackgroundSquares';

const SectionContact = ({
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

const SectionAskFrequentlyQuestion = () => (
  <SectionContact title="Questions fréquemment posées">
    <p className="mb-8">
      Une question autour des données ? Autour du site ? data.ansm dispose d’une FAQ où les
      questions fréquemment posées y sont répertoriées.
    </p>
    <Link href="/faq">
      <a className="text-primary rounded border border-primary py-2 px-4 no-underline">
        ACCÉDER À LA FAQ
      </a>
    </Link>
  </SectionContact>
);

const SectionNumStandartAnsm = () => (
  <SectionContact title="Numéro du standart de l'ANSM">
    <p>01 55 87 30 00</p>
  </SectionContact>
);

const SectionGuichetUsager = () => (
  <SectionContact title="Guichet usager">
    <p>
      L’ANSM met en place un nouveau service destiné à faciliter la relation avec les usagers. Ce
      dispositif s’appuie sur une équipe spécialement recrutée pour prendre en charge les demandes
      des patients, professionnels de santé, industriels, et plus largement du grand public…
    </p>
    <p>
      Si votre question concerne les effets indésirables, les ruptures de stocks ou tout autre
      demande concernant data.ansm, nous vous invitons à remplir un formulaire de contact. Il sera
      directement adressé à notre cellule Accueil des usagers qui le traitera dans les meilleurs
      délais.
    </p>
    <p>
      Il est important de ne pas transmettre des données médicales non nécessaires au traitement de
      votre demande.
    </p>
    <p className="mb-8">
      Pour les autres demandes, merci de contacter directement les services concernés.
    </p>
    <Link href="#">
      <a className="text-primary rounded border border-primary py-2 px-4 no-underline">
        ACCÉDER AU FORMULAIRE DE CONTACT
      </a>
    </Link>
  </SectionContact>
);

const PageContact = () => (
  <FullWidthRow
    className="bg-grey-10"
    classNameInner="justify-center"
    background={<BackgroundSquares />}
  >
    <div className="flex flex-col items-center justify-center mb-16">
      <h1 className="py-8">Contact</h1>
      <SmallContainer>
        <div className="IllustrationContainer my-4">
          <Contact />
        </div>
        <div className="flex flex-col justify-center bg-white rounded shadow p-6 mb-4">
          <SectionAskFrequentlyQuestion />
          <SectionNumStandartAnsm />
          <SectionGuichetUsager />
        </div>
      </SmallContainer>
    </div>
  </FullWidthRow>
);

export default PageContact;
