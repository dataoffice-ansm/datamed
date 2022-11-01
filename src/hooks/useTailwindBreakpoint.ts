import resolveConfig from 'tailwindcss/resolveConfig';

import tailwindConfig from '../../tailwind.config';
import { createBreakpoint } from '../lib/useTailwindBreakpoint';

const config = resolveConfig(tailwindConfig);

const { useBreakpoint, useBreakpointEffect, useBreakpointValue } = createBreakpoint(
  config?.theme?.screens
);

export { useBreakpoint, useBreakpointEffect, useBreakpointValue };
