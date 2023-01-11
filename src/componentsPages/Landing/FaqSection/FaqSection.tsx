import FaqSvg from '../../../assets/landing/faq-hp.svg';
import { FullWidthRow } from '../../../components/FullWidthRow';
import { Button } from '../../../components/Button/Button';

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
        <p className="max-w-3xl text-lg text-left mb-8">
          Pour mieux comprendre les données qui vous sont présentées sur ce site, consultez les
          réponses élaborées par nos spécialistes.
        </p>
        <Button
          className="w-auto text-primary rounded border border-primary py-2 px-4 no-underline"
          href="/faq"
        >
          CONSULTER LA FAQ
        </Button>
      </div>
    </div>
  </FullWidthRow>
);
