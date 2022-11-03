import { forwardRef } from 'react';
import type { SVGProps } from 'react';

const SvgrMock = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>((props, ref) => {
  const { alt } = props as HTMLImageElement;
  return <svg ref={ref} {...props} data-testid={alt} />;
});
SvgrMock.displayName = 'svg';

export default SvgrMock;
export const ReactComponent = SvgrMock;
