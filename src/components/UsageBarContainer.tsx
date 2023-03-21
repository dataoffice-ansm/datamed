import { ExpositionLevel } from '../api/graphql/enums';
import classnames from 'classnames';
import PilIcon from '../assets/pictos/gellule.svg';
import { Tooltip } from './Tooltip';
import { type EntityExpositionPeriod } from '../graphql/__generated__/generated-documents';
import { type EntityType } from '../contexts/EntityContext';
import { getExpositionConsumptionLabels } from '../api/utils/mapping';

export const UsageBarContainer = ({
  exposition,
  entityType,
}: {
  exposition: EntityExpositionPeriod;
  entityType: EntityType;
}) => (
  <div className="UsageBarContainer mt-12 flex justify-center items-end gap-2">
    {(Object.keys(ExpositionLevel) as Array<keyof typeof ExpositionLevel>).map(
      (levelKey, index) => {
        const { expositionLabel, consumptionLabel } = getExpositionConsumptionLabels(
          levelKey,
          entityType
        );

        if (levelKey === 'UKNOWN') {
          return null;
        }

        return (
          <Tooltip
            key={levelKey}
            delayShow={0}
            delayHide={100}
            content={
              <div className="p-1 max-w-lg">
                <p>
                  <b>Utilisation:</b> {expositionLabel}
                </p>
                <p>
                  <b>Nombre de patients: </b>
                  {consumptionLabel}
                </p>
              </div>
            }
            placement="bottom"
            render={(refCb) => (
              <div
                ref={refCb}
                className={classnames(
                  `UsageBarLevel${index}`,
                  'relative w-2 xs:w-4 sm:w-6 bg-white border border-solid border-gray-200'
                )}
                style={{ height: 20 + 10 * index }}
              >
                {exposition.level === levelKey && (
                  <div className="bouncingPil animate-bounce absolute -top-8">
                    <PilIcon className="w-2 xs:w-4 sm:w-6 h-6" />
                  </div>
                )}
              </div>
            )}
          />
        );
      }
    )}
  </div>
);
