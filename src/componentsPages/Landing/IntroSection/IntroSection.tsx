/* eslint-disable react/no-unescaped-entities */
import LandingIllustration from '../../../assets/landing/landing_illustration.svg';
import Logo from '../../../assets/logo_ansm.svg';
import { FullScreenSection } from '../../../components/FullScreenSection/FullScreenSection';
import { useLayoutContext } from '../../../contexts/LayoutContext';
import CheckDoctorSVG from '../../../assets/pictos/check-doctor.svg';

export const IntroSection = () => {
  const { navBarHeight } = useLayoutContext();

  return (
    <FullScreenSection className="bg-white" appendixAnchor="#search" offsetHeight={navBarHeight}>
      <div className="flex justify-center items-center md:flex-row gap-8 flex-col w-full pt-8 pb-32">
        <div className="max-w-3xl">
          <Logo alt="Logo DATAMED ANSM" className="w-48" />
          <h2 className="pt-8 text-2xl md:text-3xl font-medium">
            Accès public aux données de
            <br /> l'Agence du Médicament (ANSM)
          </h2>
          <p className="max-w-2xl text-lg md:text-xl">
            data.ansm est un site d'information et de transparence sur les déclarations relatives à
            la pharmacovigilance et aux ruptures de stock. Il est destiné aux particuliers,
            professionnels de santé ou industriels.
          </p>
          <div className="flex flex-col md:flex-row justify-center align-center gap-4 pt-2 max-w-2xl text-lg md:text-xl">
            <div className="w-20 min-w-[56px] m-auto">
              <CheckDoctorSVG />
            </div>
            <div>
              Ce site n'est pas un site de consultation et d'information médicales, demandez conseil
              à votre médecin ou pharmacien
            </div>
          </div>
        </div>
        <div className="md:min-w-[320px] lg:min-w-[512px]">
          <LandingIllustration className="w-full" alt="Illustration de recherches et médicaments" />
        </div>
      </div>
    </FullScreenSection>
  );
};
