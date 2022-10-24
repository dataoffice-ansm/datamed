import { cloneElement, ReactNode, SetStateAction } from 'react';
import { usePopperTooltip } from 'react-popper-tooltip';
import { Placement } from '@popperjs/core';
import classNames from 'classnames';
import 'react-popper-tooltip/dist/styles.css';
type Theme = 'white' | 'turquoise';

interface TooltipProps {
  content: ReactNode;
  title?: string;
  theme?: Theme;
  placement?: Placement;
  children: JSX.Element;
}

export const Tooltip = ({
  placement = 'right',
  children,
  title,
  content,
  theme = 'white',
}: TooltipProps) => {
  const { getArrowProps, getTooltipProps, setTooltipRef, setTriggerRef, visible } =
    usePopperTooltip({
      placement: placement,
      trigger: 'hover',
    });
  const colorTooltip = classNames(
    { 'bg-turquoise text-white': theme === 'turquoise' },
    { 'bg-white text-black': theme === 'white' }
  );

  const classTooltip = classNames(
    `${colorTooltip} p-4 shadow-lg shadow-black-500/40 text-base rounded w-1/2`
  );

  // help to override border right arrow color
  const colorArrow =
    theme === 'white'
      ? "after-[data-popper-placement*='right']:border-r-white"
      : "after-[data-popper-placement*='right']:border-r-turquoise";

  return (
    <>
      {cloneElement(children, {
        ref: (ref: SetStateAction<HTMLElement | null>) => setTriggerRef(ref),
        ...children.props,
      })}

      {visible && (
        <div
          ref={setTooltipRef}
          role={'tooltip'}
          {...getTooltipProps({ className: `tooltip-container ${classTooltip}` })}
        >
          <div
            {...getArrowProps({
              className: `tooltip-arrow ${colorArrow}`,
            })}
          />
          {title && <h2 className="font-bold font-medium">{title}</h2>}
          {content}
        </div>
      )}
    </>
  );
};
