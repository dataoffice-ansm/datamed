import type { Substance } from '../../graphql/__generated__/generated-documents';
import { BoxInfoTitle } from '../BoxInfoTitle/BoxInfoTitle';
import FolderSVG from '../../assets/icons/folder/folder.svg';

export const SubstanceContainer = ({ substance }: { substance: Substance }) => (
  <div className="SubstancesContainerContentTitle text-left text-xl">
    Substance active sélectionnée :{' '}
    <span className="text-secondary-900 font-medium">{substance?.name}</span>
    <BoxInfoTitle
      title="17 538 déclarations reçues"
      icon={<FolderSVG />}
      theme="secondary"
      className="my-8"
    >
      Nombre de déclarations d&lsquo;effets indésirables sur la période 2014-2018
    </BoxInfoTitle>
  </div>
);
