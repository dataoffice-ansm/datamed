import { FullWidthRow } from '../FullWidthRow';
import Image from 'next/image';
import LandingIllustration from '../../icons/landing_illustration.svg';
import Logo from '../../icons/logo_ansm.svg';
import AppendiceSection from './AppendiceSection';

export const IntroductionSection = () => {
  return (
    <FullWidthRow className="bg-white">
      <div className="pt-32 pb-32 flex justify-center items-center lg:items-start md:flex-row gap-8 flex-col">
        <div className="max-w-3xl">
          <Image src={Logo} alt="Logo DATAMED ANSM" />
          <h2 className="pt-8 text-2xl md:text-3xl font-medium">
            Accès public aux données de L’ANSM sur les médicaments
          </h2>
          <p className="pt-12 max-w-2xl text-lg md:text-xl">
            Que vous soyez particulier, industriel ou professionnel de santé, vous trouverez sur ce
            site différentes informations relatives à la vie des médicaments compilées par l’ANSM et
            ses partenaires.
          </p>
        </div>
        <Image src={LandingIllustration} alt="Illustration de recherches et médicaments" />
      </div>
      <AppendiceSection />
    </FullWidthRow>
  );
};
