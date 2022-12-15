import { Tooltip } from '../../components/Tooltip/Tooltip';

const tooltipContent =
  "La substance active d'un médicament est une substance chimique entrant dans la composition du médicament et ayant un effet thérapeutique ou préventif.";
const tooltipTriggerText = "Qu'est-ce qu'une substance active ?";

export const SubTooltip = () => (
  <Tooltip
    content={<div className="p-4 max-w-lg">{tooltipContent}</div>}
    placement="bottom"
    render={(refCb) => (
      <span ref={refCb} className="underline cursor-help">
        {tooltipTriggerText}
      </span>
    )}
  />
);
