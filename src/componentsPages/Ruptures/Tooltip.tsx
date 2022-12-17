import type { ReactNode } from 'react';
import InfoSVG from '../../assets/icons/info/info.svg';
import { Tooltip } from '../../components/Tooltip/Tooltip';

export const BaseTooltipContent = ({ children }: { children: JSX.Element | ReactNode }) => (
  <div className="p-4 max-w-md">{children}</div>
);

export const TooltipInformation = ({ children }: { children: JSX.Element | ReactNode }) => (
  <Tooltip
    content={children}
    placement="bottom"
    render={(refCb) => (
      <div ref={refCb} className="h-5 w-5">
        <InfoSVG />
      </div>
    )}
  />
);

export const ContainerWithTooltip = ({
  children,
  tooltip,
  suffix,
}: {
  children: JSX.Element | ReactNode;
  tooltip: JSX.Element | ReactNode;
  suffix?: JSX.Element | ReactNode;
}) => (
  <div className="flex items-center gap-4 w-full">
    {children}
    <div className="flex gap-4 items-center">
      <TooltipInformation>{tooltip}</TooltipInformation>
      {suffix}
    </div>
  </div>
);
