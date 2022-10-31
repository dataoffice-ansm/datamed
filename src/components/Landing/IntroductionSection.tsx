import LandingIllustration from '../../assets/images/landing_illustration.svg';
import Logo from '../../assets/images/logo_ansm.svg';
import { FullScreenSection } from '../FullScreenSection';

export const IntroductionSection = () => {
  //TODO: offsetHeight en dur en attendant le context HeaderHeight
  return (
    <FullScreenSection className="bg-white" appendixAnchor="/search" offsetHeight={102}>
      <div className="flex justify-center items-center lg:items-start md:flex-row gap-8 flex-col">
        <div className="max-w-3xl">
          <Logo alt="Logo DATAMED ANSM" className="w-48" />
          <h2 className="pt-8 text-2xl md:text-3xl font-medium">
            Accès public aux données de L’ANSM sur les médicaments
          </h2>
          <p className="pt-12 max-w-2xl text-lg md:text-xl">
            Que vous soyez particulier, industriel ou professionnel de santé, vous trouverez sur ce
            site différentes informations relatives à la vie des médicaments compilées par l’ANSM et
            ses partenaires.
          </p>
        </div>
        <div className="max-w-xs">
          <LandingIllustration className="w-full" alt="Illustration de recherches et médicaments" />
        </div>
      </div>
    </FullScreenSection>
  );
};
