import type { HTMLAttributes } from 'react';
import BottomLeftSquareSVG from '../../assets/icons/squares/bottom-left-square.svg';
import TopLeftSquareSVG from '../../assets/icons/squares/top-left-square.svg';
import RightMiddleSquareSVG from '../../assets/icons/squares/right-middle-square.svg';

export const BackgroundSquares = ({
  className,
  offset = 0,
}: { offset?: number } & HTMLAttributes<HTMLDivElement>) => (
  <div className="w-full h-fit relative" style={{ marginTop: offset }}>
    <div className="TopLeftSquare absolute h-40 w-40 top-[100px] left-0">
      <TopLeftSquareSVG className={className} />
    </div>
    <div className="BottomLeftSquare absolute h-32 w-32 top-[600px] left-[100px]">
      <BottomLeftSquareSVG className={className} />
    </div>
    <div className="BottomLeftSquare absolute h-72 w-72 top-[120px] right-[0]">
      <RightMiddleSquareSVG className={className} />
    </div>
  </div>
);
