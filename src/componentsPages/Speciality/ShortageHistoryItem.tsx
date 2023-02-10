import { formatDate } from '../../utils/format';
import { type SpecialityAssociatedShortage } from '../../graphql/__generated__/generated-documents';

/**
 *
 * @param cisName
 * @param ruptureItem
 * @constructor
 */
export const ShortageHistoryItem = ({
  cisName,
  ruptureItem,
}: {
  cisName: string;
  ruptureItem: SpecialityAssociatedShortage;
}) => (
  <div className="flex flex-col gap-1">
    <div className="row flex items-center">
      <span className="flex-2 uppercase text-sm">Présentation du médicament:</span>
      <span className="flex-2">{cisName}</span>
    </div>
    <div className="row flex items-center">
      <span className="flex-2 uppercase text-sm">Statut</span>
      <span className="flex-2">{ruptureItem?.classification}</span>
    </div>
    <div className="row flex items-center">
      <span className="flex-2 uppercase text-sm">Cause</span>
      <span className="flex-2">{ruptureItem?.cause?.type}</span>
      <span className="flex-2 text-sm">{ruptureItem?.cause?.definition}</span>
    </div>
    <div className="row flex items-center">
      <span className="flex-2 uppercase text-sm">Date de début de la difficulté:</span>
      <span className="flex-2">{formatDate(ruptureItem?.date ?? '')}</span>
    </div>
    {/* eslint-disable-next-line no-warning-comments */}
    {/*TODO Récuperer date de fin de difficulté */}
    {/*<div className="row flex items-center">*/}
    {/*  <span className="flex-2 uppercase text-sm">Date de fin de la difficulté:</span>*/}
    {/*  <span className="flex-2">{ruptureItem?.date}</span>*/}
    {/*</div>*/}
  </div>
);
