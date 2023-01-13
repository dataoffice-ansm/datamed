import type { ReactNode } from 'react';
import InfoSVG from '../../assets/pictos/icons/info.svg';
import { Tooltip } from '../../components/Tooltip/Tooltip';

export const TooltipInformation = ({ children }: { children: JSX.Element | ReactNode }) => (
  <Tooltip
    content={children}
    placement="bottom"
    render={(refCb) => (
      <div ref={refCb} className="h-6 w-6">
        <InfoSVG />
      </div>
    )}
  />
);
