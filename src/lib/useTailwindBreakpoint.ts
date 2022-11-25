import * as React from 'react';
import { isBrowser } from '../utils/web';
import { useEffect } from 'react';

export type CreatorReturnType = {
  useBreakpoint<B>(_breakpoint: B, _defaultValue?: boolean): boolean;
  useBreakpointEffect<B>(_breakpoint: B, _effect: (_match: boolean) => void): void;
  useBreakpointValue<B, T, U>(_breakpoint: B, _valid: T, _invalid: U): T | U;
};

/**
 * Initialize breakpoint hooks from given configuration
 *
 * ---
 *
 * @param screens Breakpoints/screens object (`{ sm: "640px", md: "768px", ... }`)
 *
 * @returns Breakpoint hooks
 *
 * @example
 *
 * ```jsx
 * // hooks/breakpoint.ts
 *
 * import create from "@kodingdotninja/use-tailwind-breakpoint";
 *
 * export const { useBreakpoint, ... } = create({ sm: "640px", ... });
 * ```
 */
export function createBreakpoint(screens: object | undefined) {
  if (!screens) {
    throw new Error('Failed to create breakpoint hooks, given `screens` value is invalid.');
  }

  function useBreakpoint(breakpoint: string, defaultValue = false) {
    const [match, setMatch] = React.useState(() => defaultValue);
    const matchRef = React.useRef(defaultValue);

    useEffect(() => {
      if (!(isBrowser && 'matchMedia' in window)) return undefined;

      function track() {
        // @ts-expect-error accessing index with uncertain `screens` type
        const value = (screens[breakpoint] as string) ?? '999999px';
        const query = window.matchMedia(`(min-width: ${value})`);
        matchRef.current = query.matches;

        if (matchRef.current !== match) {
          setMatch(matchRef.current);
        }
      }

      track();
      window.addEventListener('resize', track);
      return () => {
        window.removeEventListener('resize', track);
      };
    }, [breakpoint, match]);

    return match;
  }

  function useBreakpointEffect<Breakpoint extends string>(
    breakpoint: Breakpoint,
    effect: (_match: boolean) => void
  ) {
    const match = useBreakpoint(breakpoint);
    React.useEffect(() => {
      effect(match);
    });
    return null;
  }

  function useBreakpointValue<Breakpoint extends string, T, U>(
    breakpoint: Breakpoint,
    valid: T,
    invalid: U
  ) {
    const match = useBreakpoint(breakpoint);
    return React.useMemo(() => (match ? valid : invalid), [invalid, match, valid]);
  }

  return {
    useBreakpoint,
    useBreakpointEffect,
    useBreakpointValue,
  };
}

export default createBreakpoint;
