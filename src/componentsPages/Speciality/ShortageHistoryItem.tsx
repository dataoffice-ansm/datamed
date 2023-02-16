import { formatDate } from '../../utils/format';
import { type SpecialityAssociatedShortage } from '../../graphql/__generated__/generated-documents';

/**
 *
 * @param shortageItem
 * @constructor
 */
export const ShortageHistoryItem = ({
  shortageItem,
}: {
  shortageItem: SpecialityAssociatedShortage;
}) => (
  <div className="flex flex-col gap-1">
    <div className="flex items-center">
      <span className="flex-1 uppercase text-sm">Présentation du médicament:</span>
      <span className="flex-1">{shortageItem.cis?.name}</span>
    </div>
    <div className="flex items-center">
      <span className="flex-1 uppercase text-sm">Classification</span>
      <span className="flex-1">{shortageItem?.classification}</span>
    </div>
    <div className="flex items-center">
      <div className="flex-1">
        <span className="uppercase text-sm">Cause</span>
      </div>
      <div className="flex-1 flex flex-col gap-1">
        <span>{shortageItem?.cause?.type}</span>
        <span className="text-sm">{shortageItem?.cause?.definition}</span>
      </div>
    </div>
    <div className="flex items-center">
      <span className="flex-1 uppercase text-sm">Date de début de la difficulté:</span>
      <span className="flex-1">{formatDate(shortageItem?.date ?? '')}</span>
    </div>
    {/* eslint-disable-next-line no-warning-comments */}
    {/*TODO Récuperer date de fin de difficulté */}
    {/*<div className="flex items-center">*/}
    {/*  <span className="flex-1 uppercase text-sm">Date de fin de la difficulté:</span>*/}
    {/*  <span className="flex-1">{ruptureItem?.date}</span>*/}
    {/*</div>*/}
  </div>
);
