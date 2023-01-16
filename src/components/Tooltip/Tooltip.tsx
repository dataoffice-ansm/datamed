import type { Dispatch, ReactNode, SetStateAction } from 'react';
import { usePopperTooltip } from 'react-popper-tooltip';
import type { Placement } from '@popperjs/core';
import 'react-popper-tooltip/dist/styles.css';

type TooltipTheme = 'white' | 'turquoise';

/**
 *
 * @param title
 * @param content
 * @param theme
 * @param placement
 * @param children
 * @constructor
 */
export const Tooltip = ({
  title,
  content,
  theme = 'white',
  placement = 'right',
  delayShow = 200,
  delayHide = 500,
  render,
}: {
  enable?: boolean;
  title?: string;
  content: ReactNode;
  theme?: TooltipTheme;
  placement?: Placement;
  delayShow?: number;
  delayHide?: number;
  render: (_refCb: Dispatch<SetStateAction<HTMLElement | null>>) => ReactNode;
}) => {
  const { getArrowProps, getTooltipProps, setTooltipRef, setTriggerRef, visible } =
    usePopperTooltip({
      placement,
      delayShow,
      delayHide,
      // followCursor: true,
      trigger: ['hover', 'click'],
    });

  return (
    <>
      {render(setTriggerRef)}
      {visible && (
        <div
          ref={setTooltipRef}
          role="tooltip"
          {...getTooltipProps()}
          className="tooltip-container"
          data-theme={theme}
        >
          <div className="tooltip-arrow" {...getArrowProps()} />
          {title && <h2 className="font-medium">{title}</h2>}
          {content}
        </div>
      )}
    </>
  );
};
