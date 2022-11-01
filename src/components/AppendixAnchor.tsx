import Link from 'next/link';
import MouseScrollSvg from '../assets/images/mouse_scroll.svg';
import type { HTMLAttributes } from 'react';

/**
 *
 * @param children
 * @param appendixAnchor
 * @constructor
 */
export const AppendixAnchor = ({
  appendixAnchor,
}: HTMLAttributes<HTMLDivElement> & { appendixAnchor: string }) => (
  <div className="appendixAnchor flex justify-center items-center relative">
    <div className="h-28 w-28 absolute rotate-45 z-[1] bg-white shadow flex justify-center items-center" />
    <div className="h-28 w-28 absolute z-[1] flex justify-center items-center duration-700">
      {/* @TODO: Update scroll strategy when feature will be ready */}
      <Link href={appendixAnchor} scroll={false}>
        <a>
          <div className="animate-bounce">
            <MouseScrollSvg className="h-14 w-14" alt="scroll" />
          </div>
        </a>
      </Link>
    </div>
  </div>
);

export default AppendixAnchor;
