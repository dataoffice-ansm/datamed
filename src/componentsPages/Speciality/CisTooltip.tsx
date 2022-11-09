import { Tooltip } from '../../components/Tooltip/Tooltip';

const tooltipTriggerText = "Qu'est-ce qu'une spécialité de médicament ?";

export const CisTooltip = () => (
  <Tooltip
    content={
      <div className="p-4">
        <div className="mb-3">
          Les médicaments peuvent être regroupés selon différents niveaux, allant de la simple
          substance active au niveau le plus précis de la présentation :
        </div>
        <div>- La substance active : Paracétamol</div>
        <div>- Le produit : Doliprane</div>
        <div>- La spécialité : Doliprane 1000 mg, comprimé</div>
        <div className="mb-3">
          - La présentation : Doliprane 1000 mg, comprimé, boîte de 8 comprimés
        </div>
        <b>
          La spécialité d’un médicament est donc caractérisée par une dénomination spéciale
          (Doliprane) et un conditionnement particulier (1000 mg, comprimé).
        </b>
      </div>
    }
    placement="auto-start"
    render={(refCb) => (
      <span ref={refCb} className="underline cursor-help">
        {tooltipTriggerText}
      </span>
    )}
  />
);
