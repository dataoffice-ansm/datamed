import classnames from 'classnames';

export const FullWidthRow = ({ className, children }: React.HTMLAttributes<HTMLDivElement>) => {
  const classname = classnames('w-screen absolute h-full left-1/2 m-[0_auto_0_-50vw]', className);

  return (
    <div className="relative">
      <div className={classname}></div>
      <div className="relative">{children}</div>
    </div>
  );
};
