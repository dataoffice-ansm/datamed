import type { Substance } from '../../graphql/__generated__/generated-documents';

export const SubstanceContainer = ({ substance }: { substance: Substance }) => (
  <div className="SubstancesContainerContentTitle text-left text-xl">
    Substance active sélectionnée :{' '}
    <span className="text-secondary-900 font-medium">{substance?.name}</span>
  </div>
);
