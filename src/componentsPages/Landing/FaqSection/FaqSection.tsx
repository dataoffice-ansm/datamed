import FaqSvg from '../../../assets/images/landing_illustration_faq.svg';
import { FullWidthRow } from '../../../components/FullWidthRow/FullWidthRow';
import { CallToAction } from '../../../components/CallToAction/CallToAction';

export const FaqSection = () => (
  <FullWidthRow className="bg-background shadow-inner">
    <div
      id="faq"
      className="flex justify-center items-center lg:items-start md:flex-row gap-8 flex-col w-full py-32 px-4 md:px-0"
    >
      <FaqSvg
        className="md:min-w-[320px] lg:min-w-[512px] max-w-md"
        alt="Illustration de la section faq"
      />
      <div className="h-full">
        <h2 className="lg:pt-8 text-2xl lg:text-3xl font-medium">
          Trouvez les réponses à vos questions
        </h2>
        <p className="max-w-3xl text-lg text-left">
          Pour mieux comprendre les données qui vous sont présentées sur ce site, consultez les
          réponses élaborées par nos spécialistes.
        </p>
        <CallToAction className="w-auto" href="/faq">
          Consulter la faq
        </CallToAction>
      </div>
    </div>
  </FullWidthRow>
);
