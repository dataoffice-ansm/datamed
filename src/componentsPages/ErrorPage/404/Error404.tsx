import { FullScreenSection } from '../../../components/FullScreenSection/FullScreenSection';
import Error404SVG from '../../../assets/icons/404/404.svg';
import Link from 'next/link';
import { Button } from '../../../components/Button/Button';

export const ErrorPage404 = () => {
  const enableReport = false;
  return (
    <FullScreenSection className="bg-background">
      <div className="flex justify-center items-center gap-8 flex-col w-full pb-32">
        <div className="w-full max-w-5xl">
          <Error404SVG className="w-full" />
        </div>
        <h1 className="text-4xl text-center items-center justify-center">
          Il semblerait que la page que vous souhaitez atteindre n’existe pas !
        </h1>

        <div className="flex gap-8">
          {enableReport && (
            <Button href="#" className="flex justify-center items-center">
              Signaler une erreur
            </Button>
          )}

          <Link href="/">
            <a className="text-primary rounded border border-primary py-2 px-4 no-underline">
              Revenir à l&apos;accueil
            </a>
          </Link>
        </div>
      </div>
    </FullScreenSection>
  );
};
