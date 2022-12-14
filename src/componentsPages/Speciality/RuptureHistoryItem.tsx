import type { SpecialityRupture } from '../../graphql/__generated__/generated-documents';

export const RuptureHistoryItem = ({
  cisName,
  ruptureItem,
}: {
  cisName: string;
  ruptureItem: SpecialityRupture;
}) => (
  <div className="flex flex-col gap-1">
    <div className="row flex items-center">
      <span className="flex-2 uppercase text-sm">Présentation du médicament:</span>
      <span className="flex-2">{cisName}</span>
    </div>
    <div className="row flex items-center">
      <span className="flex-2 uppercase text-sm">Statut</span>
      <span className="flex-2">{ruptureItem?.classification?.label}</span>
    </div>
    <div className="row flex items-center">
      <span className="flex-2 uppercase text-sm">Cause</span>
      <span className="flex-2">{ruptureItem?.cause?.type}</span>
    </div>
    <div className="row flex items-center">
      <span className="flex-2 uppercase text-sm">Date de début de la difficulté:</span>
      <span className="flex-2">{ruptureItem?.date}</span>
    </div>
    <div className="row flex items-center">
      <span className="flex-2 uppercase text-sm">Date de fin de la difficulté:</span>
      <span className="flex-2">{ruptureItem?.date}</span>
    </div>
  </div>
);
