import { Tooltip } from '../../components/Tooltip';

const tooltipContent =
  'La pharmacovigilance est la surveillance, l’évaluation, la prévention et la gestion du risque d’effet indésirable résultant de l’utilisation des médicaments.';
const tooltipTriggerText = 'Qu’est-ce que la pharmacovigilance ?';
export const GlobStatTooltip = () => (
  <Tooltip
    content={<div className="p-4">{tooltipContent}</div>}
    placement="auto-start"
    render={(refCb) => (
      <span ref={refCb} className="underline cursor-pointer">
        {tooltipTriggerText}
      </span>
    )}
  />
);
