import type { ReactNode } from 'react';
import InfoSVG from '../assets/pictos/icons/info.svg';
import { Tooltip } from './Tooltip';

export const TooltipInformation = ({ children }: { children: JSX.Element | ReactNode }) => (
  <Tooltip
    content={children}
    placement="bottom"
    render={(refCb) => (
      <i ref={refCb} className="h-6 w-6">
        <InfoSVG className="h-6 w-6" />
      </i>
    )}
  />
);
