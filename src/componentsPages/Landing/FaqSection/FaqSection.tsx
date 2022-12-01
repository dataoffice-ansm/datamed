import FaqSvg from '../../../assets/images/landing_illustration_faq.svg';
import { FullWidthRow } from '../../../components/FullWidthRow/FullWidthRow';
import { CallToAction } from '../../../components/CallToAction/CallToAction';
import { useRouter } from 'next/router';

export const FaqSection = () => {
  const router = useRouter();
  return (
    <FullWidthRow className="bg-[#E5E5E5] shadow-inner">
      <div
        id="faq"
        className="py-12 flex justify-center items-center lg:items-start lg:flex-row w-full"
      >
        <FaqSvg width={450} heigth={320} alt="Illustration de la section faq" />
        <div className="lg:flex-col flex max-w-3xl">
          <h2 className="lg:pt-8 text-xl lg:text-3xl font-medium">
            Trouvez les réponses à vos questions
          </h2>
          <p className="text-lg md:text-xl text-left mb-16">
            Pour mieux comprendre les données qui vous sont présentées sur ce site, consultez les
            réponses élaborées par nos spécialistes.
            <br />
            <CallToAction className="w-auto" href="/faq">
              Consulter la faq
            </CallToAction>
          </p>
        </div>
      </div>
    </FullWidthRow>
  );
};
