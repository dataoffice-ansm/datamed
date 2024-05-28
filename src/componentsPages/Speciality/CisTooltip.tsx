import { Tooltip } from '../../components/Tooltip';

const tooltipTriggerText = "Qu'est-ce qu'une spécialité pharmaceutique ?";

export const CisTooltip = () => (
  <Tooltip
    content={
      <div className="p-4 max-w-lg">
        <p className="text-md md:text-lg font-bold">Qu’est-ce qu’une spécialité de médicament ?</p>

        <div className="mb-3">
          Les médicaments peuvent être regroupés selon différents niveaux, allant de la simple
          substance active au niveau le plus précis de la présentation :
        </div>
        <ul>
          <li>La substance active : Paracétamol</li>
          <li>Le produit : Doliprane</li>
          <li>La spécialité : Doliprane 1000 mg, comprimé</li>
          <li>La présentation : Doliprane 1000 mg, comprimé, boîte de 8 comprimés</li>
        </ul>
        <p className="my-2 text-sm font-semibold">
          La spécialité d’un médicament est donc caractérisée par une dénomination spéciale
          (Doliprane) et un conditionnement particulier (1000 mg, comprimé).
        </p>
      </div>
    }
    placement="bottom"
    render={(refCb) => (
      <span ref={refCb} className="underline cursor-pointer">
        {tooltipTriggerText}
      </span>
    )}
  />
);
