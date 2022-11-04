import Link from 'next/link';
import type { ReactNode } from 'react';
import { useNavigationBarHeightContext } from '../../contexts/NavigationBarHeightContext';

const components = ['/', 'graph-box'];

/**
 *
 * @param title
 * @param children
 * @constructor
 */
export const DevPageLayout = ({ title, children }: { title?: string; children?: ReactNode }) => {
  const { height } = useNavigationBarHeightContext();
  return (
    <div className="ComponentDevLayout flex gap-2 relative">
      <div className="ComponentDevNav border-r border-solid border-grey-400 p-2 w-40">
        <div className="sticky" style={{ top: height + 10 }}>
          <p className="font-bold mt-0">Components</p>
          <ul>
            {components.map((componentName) => (
              <li key="componentName" className="my-1">
                <Link href={`/dev/${componentName}`}>
                  <a>{componentName}</a>
                </Link>
              </li>
            ))}
          </ul>
          <p className="font-bold mt-0">Design</p>
          <ul>
            <li>
              <Link href="/dev/ui">
                <a>Palette colors</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="component flex-1 p-2">
        {title && children && (
          <>
            <h2 className="mt-0">{title}</h2>
            <div className="my-4">{children}</div>
          </>
        )}
      </div>
    </div>
  );
};